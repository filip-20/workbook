import { ErrorExpected, FormulaFactories } from "@fmfi-uk-1-ain-412/js-fol-parser";
import { CellContext } from "../../features/sheet/slice/logicContext";

export const texFactory = (context: CellContext) => {
  const testArity = (symbol: string, args: any[], ee: ErrorExpected) => {
    const a = context.symbolArity(symbol)
    a !== args.length && ee.expected(`${a} arguments for ${symbol}`);
  }
  const factory: FormulaFactories<string, string> = {
    variable: (symbol: string, ee: ErrorExpected) => symbol.replace('_', '\\_'),
    constant: (symbol: string, ee: ErrorExpected) => `\\text{\\textsf{${symbol.replace('_', '\\_')}}}`,
    equalityAtom: (lhs: string, rhs: string, ee: ErrorExpected) => `${lhs} \\doteq ${rhs}`,
    negation: (subf: string, ee: ErrorExpected) => `\\neg ${subf}`,
    conjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\land ${rhs})`,
    disjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\lor ${rhs})`,
    implication: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\rarr ${rhs})`,
    equivalence: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\lrarr ${rhs})`,
    existentialQuant: (variable: string, subf: string, ee: ErrorExpected) => `\\exists ${variable} \\text{ } ${subf}`,
    universalQuant: (variable: string, subf: string, ee: ErrorExpected) => `\\forall ${variable} \\text{ } ${subf}`,
    functionApplication: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `\\text{\\textsf{${symbol}}}(${args.map(a => `${a}`).join(', ')})`
    },
    predicateAtom: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `\\text{\\textsf{${symbol}}}(${args.join(', ')})`
    },
  };
  return factory;
}

export const unicodeFactory = (context: CellContext) => {
  const testArity = (symbol: string, args: any[], ee: ErrorExpected) => {
    const a = context.symbolArity(symbol)
    a !== args.length && ee.expected(`${a} arguments for ${symbol}`);
  }
  const factory: FormulaFactories<string, string> = {
    variable: (symbol: string, ee: ErrorExpected) => symbol,
    constant: (symbol: string, ee: ErrorExpected) => symbol,
    equalityAtom: (lhs: string, rhs: string, ee: ErrorExpected) => `${lhs} ≐ ${rhs}`,
    negation: (subf: string, ee: ErrorExpected) => `¬${subf}`,
    conjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ∧ ${rhs})`,
    disjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ∨ ${rhs})`,
    implication: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} → ${rhs})`,
    equivalence: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ↔ ${rhs})`,
    existentialQuant: (variable: string, subf: string, ee: ErrorExpected) => `∃ ${variable} ${subf}`,
    universalQuant: (variable: string, subf: string, ee: ErrorExpected) => `∀ ${variable} ${subf}`,
    functionApplication: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `${symbol}(${args.join(', ')})`
    },
    predicateAtom: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `${symbol}(${args.join(', ')})`
    },
  };
  return factory;
}

export const asciiFactory = (context: CellContext) => {
  const testArity = (symbol: string, args: any[], ee: ErrorExpected) => {
    const a = context.symbolArity(symbol)
    a !== args.length && ee.expected(`${a} arguments for ${symbol}`);
  }
  const factory: FormulaFactories<string, string> = {
    variable: (symbol: string, ee: ErrorExpected) => symbol,
    constant: (symbol: string, ee: ErrorExpected) => symbol,
    equalityAtom: (lhs: string, rhs: string, ee: ErrorExpected) => `${lhs} = ${rhs}`,
    negation: (subf: string, ee: ErrorExpected) => `¬${subf}`,
    conjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} & ${rhs})`,
    disjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} | ${rhs})`,
    implication: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} -> ${rhs})`,
    equivalence: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} <-> ${rhs})`,
    existentialQuant: (variable: string, subf: string, ee: ErrorExpected) => `\\e ${variable} ${subf}`,
    universalQuant: (variable: string, subf: string, ee: ErrorExpected) => `\\a ${variable} ${subf}`,
    functionApplication: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `${symbol}(${args.join(', ')})`
    },
    predicateAtom: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `${symbol}(${args.join(', ')})`
    },
  };
  return factory;
}