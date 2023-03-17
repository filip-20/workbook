import { SymbolWithArity } from "@fmfi-uk-1-ain-412/js-fol-parser";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { CellLocator } from "./sheetSlice";

export interface Formula {
  name: string,
  formula: string,
}

export interface LogicContext {
  constants: Array<string>,
  predicates: Array<SymbolWithArity>,
  functions: Array<SymbolWithArity>,

  formulas: Array<Formula>,
  axioms: Array<Formula>,
  theorems: Array<Formula>,
}

export const emptyContext: LogicContext = {
  constants: [], predicates: [], functions: [], formulas: [], axioms: [], theorems: []
}

function mergeContexts(l1: LogicContext, l2: LogicContext): LogicContext {
  return {
    constants: l1.constants.concat(l2.constants),
    predicates: l1.predicates.concat(l2.predicates),
    functions: l1.functions.concat(l2.functions),
    formulas: l1.formulas.concat(l2.formulas),
    axioms: l1.axioms.concat(l2.axioms),
    theorems: l1.theorems.concat(l2.theorems),
  }
}
function prevCell(cell: CellLocator | undefined) {
  return (state: RootState) => {
    if (cell) {
      return cell.index - 1 < 0 ? undefined : { index: cell.index - 1, id: state.sheet.present.sheetFile.cellsOrder[cell.index - 1] }
    } else {
      return undefined;
    }
  }
}

const cellContextExtension = (cell: CellLocator) => (state: RootState) => state.sheet.present.sheetFile.cells[cell.id].contextExtension;

export class CellContext implements LogicContext {
  private context: LogicContext
  private symbolsLUT: Map<string, { arity: number, index: number, type: 'constant' | 'function' | 'predicate' | 'axiom' | 'formula' | 'theorem' }>

  public get constants() { return this.context.constants }
  public get predicates() { return this.context.predicates }
  public get functions() { return this.context.functions }
  public get formulas() { return this.context.formulas }
  public get axioms() { return this.context.axioms }
  public get theorems() { return this.context.theorems }

  constructor(context: LogicContext) {
    this.context = context;
    this.symbolsLUT = new Map();
    context.constants.forEach((s, index) => this.symbolsLUT.set(s, { arity: 0, type: 'constant', index }))
    context.predicates.forEach((s, index) => this.symbolsLUT.set(s.name, { arity: s.arity, type: 'predicate', index }))
    context.functions.forEach((s, index) => this.symbolsLUT.set(s.name, { arity: s.arity, type: 'function', index }))
    context.axioms.forEach((s, index) => this.symbolsLUT.set(s.name, { arity: 0, type: 'axiom', index }))
    context.formulas.forEach((s, index) => this.symbolsLUT.set(s.name, { arity: 0, type: 'formula', index }))
    context.theorems.forEach((s, index) => this.symbolsLUT.set(s.name, { arity: 0, type: 'theorem', index }))
    console.log('SymbolsLut', this.symbolsLUT)
  }
  isConstant(symbol: string) {
    return this.symbolsLUT.get(symbol)?.type === 'constant'
  }
  isPredicate(symbol: string) {
    return this.symbolsLUT.get(symbol)?.type === 'predicate'
  }
  isFunction(symbol: string) {
    return this.symbolsLUT.get(symbol)?.type === 'function'
  }
  isVariable(symbol: string) {
    return true;
  }
  symbolExits(symbol: string) {
    return this.symbolsLUT.has(symbol);
  }
  symbolArity(symbol: string) {
    return this.symbolsLUT.get(symbol)?.arity
  }
  getFormula(name: string) {
    const s = this.symbolsLUT.get(name);
    switch (s?.type) {
      case 'axiom':
        return {
          type: 'axiom',
          name,
          formula: this.axioms[s.index].formula
        }
      case 'theorem':
        return {
          type: 'theorem',
          name,
          formula: this.theorems[s.index].formula
        }
      case 'formula':
        return {
          type: 'formula',
          name,
          formula: this.formulas[s.index].formula
        }
      default:
        return undefined;
    }
  }
}

const contextSelectorMemo: { [key: string]: (state: RootState) => CellContext } = {}
export function cellContext(cell: CellLocator): (state: RootState) => CellContext {
  const key = JSON.stringify(cell);
  if (contextSelectorMemo[key] === undefined) {
    contextSelectorMemo[key] = createSelector(
      [
        (state: RootState) => { const prev = prevCell(cell)(state); return prev === undefined ? undefined : cellContext(prev)(state) },
        (state: RootState) => { const prev = prevCell(cell)(state); return prev === undefined ? undefined : cellContextExtension(prev)(state) },
      ], (prevContext, prevExtension) => {
        console.log('Computing cell context of ', cell);
        /*
        if (prevContext === undefined && prevExtension === undefined) {
          return emptyContext;
        } else if (prevExtension === undefined) {
          return prevContext || emptyContext;
        } else if (prevContext === undefined) {
          return prevExtension;
        }*/
        return new CellContext(mergeContexts(prevContext || emptyContext, prevExtension || emptyContext))
      }
    )
  }
  return contextSelectorMemo[key];
}