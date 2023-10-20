import { Language, SymbolWithArity } from "@fmfi-uk-1-ain-412/js-fol-parser";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { CellLocator, sheetSelectors } from "./sheetSlice";

export interface NamedFormula {
  name: string,
  formula: string,
}

export interface Theorem extends NamedFormula {
  prooved: boolean,
}

export interface LogicContext {
  constants: Array<string>,
  predicates: Array<SymbolWithArity>,
  functions: Array<SymbolWithArity>,

  formulas: Array<NamedFormula>,
  axioms: Array<NamedFormula>,
  theorems: Array<Theorem>,
}
export type ContextExtension = Partial<LogicContext>

export const emptyContext: LogicContext = {
  constants: [], predicates: [], functions: [], formulas: [], axioms: [], theorems: []
}

export function isEmptyFormula(f: NamedFormula) {
  return f.name.trim() === '' && f.formula.trim() === '';
}

function mergeContexts(l1: ContextExtension, l2: ContextExtension): LogicContext {
  return {
    constants: (l1.constants || []).concat(l2.constants || []),
    predicates: (l1.predicates || []).concat(l2.predicates || []),
    functions: (l1.functions || []).concat(l2.functions || []),
    formulas: (l1.formulas || []).concat(l2.formulas || []),
    axioms: (l1.axioms || []).concat(l2.axioms || []),
    theorems: (l1.theorems || []).concat(l2.theorems || []),
  }
}

function prevCell(cell: CellLocator | undefined): (state: RootState) => CellLocator | undefined {
  return (state: RootState) => {
    if (cell) {
      const cellsOrder = sheetSelectors.contextCellsList(cell)(state)
      return cell.index - 1 < 0 ? undefined : { index: cell.index - 1, id: cellsOrder[cell.index - 1], contextId: cell.contextId }
    } else {
      return undefined;
    }
  }
}

const cellContextExtension = (cellLoc: CellLocator) => (state: RootState) => state.sheet.present.sheetFile.cells[cellLoc.id].contextExtension;

const contextSelectorMemo: { [key: string]: (state: RootState) => CellContext } = {}
export function cellContext(cell: CellLocator): (state: RootState) => CellContext {
  const key = JSON.stringify({id: cell.id, index: cell.index});
  if (contextSelectorMemo[key] === undefined) {
    contextSelectorMemo[key] = createSelector(
      [
        (state: RootState) => { const prev = prevCell(cell)(state); return prev === undefined ? undefined : cellContext(prev)(state) },
        (state: RootState) => { const prev = prevCell(cell)(state); return prev === undefined ? undefined : cellContextExtension(prev)(state) },
      ], (prevContext, prevExtension) => {
        console.log('Computing cell context of ', cell);
        return new CellContext(mergeContexts(prevContext || emptyContext, prevExtension || emptyContext))
      }
    )
  }
  return contextSelectorMemo[key];
}

export class CellContext implements LogicContext, Language {
  private context: LogicContext
  private symbolsLUT: Map<string, { arity: number, index: number, type: 'constant' | 'function' | 'predicate' | 'axiom' | 'formula' | 'theorem' }>

  public get constants() { return this.context.constants }
  public get predicates() { return this.context.predicates }
  public get functions() { return this.context.functions }
  public get formulas() { return this.context.formulas }
  public get axioms() { return this.context.axioms }
  public get theorems() { return this.context.theorems }

  public get constantsExpr() { return this.context.constants.join(', ') }
  public get predicatesExpr() { return this.context.predicates.map(s => `${s.name}/${s.arity}`).join(', ') }
  public get functionsExpr() { return this.context.functions.map(s => `${s.name}/${s.arity}`).join(', ') }

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
  logicContext() {
    return this.context;
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
  isVariable(_: string) {
    return true;
  }
  symbolExits(symbol: string) {
    console.log('symbols exists ? ', symbol, this.symbolsLUT.has(symbol));
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