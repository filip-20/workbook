import { ErrorExpected, FormulaFactories, parseFormulaWithPrecedence } from "@fmfi-uk-1-ain-412/js-fol-parser";
import { CellContext } from "../features/sheet/slice/logicContext";

class StringFactory implements FormulaFactories<string, string> {
  private context: CellContext
  constructor(context: CellContext) {
    this.context = context;
  }
  private testArity(symbol: string, args: any[], ee: ErrorExpected) {
    const a = this.context.symbolArity(symbol)
    a !== args.length && ee.expected(`${a} arguments for ${symbol}`);
  }
  public variable(symbol: string, ee: ErrorExpected) { return symbol }
  public constant(symbol: string, ee: ErrorExpected) { return symbol }
  public equalityAtom(lhs: string, rhs: string, ee: ErrorExpected) { return `${lhs} ≐ ${rhs}` }
  public negation(subf: string, ee: ErrorExpected) { return `¬${subf}` }
  public conjunction(lhs: string, rhs: string, ee: ErrorExpected) { return `(${lhs} ∧ ${rhs})` }
  public disjunction(lhs: string, rhs: string, ee: ErrorExpected) { return `(${lhs} ∨ ${rhs})` }
  public implication(lhs: string, rhs: string, ee: ErrorExpected) { return `(${lhs} ⇒ ${rhs})` }
  public equivalence(lhs: string, rhs: string, ee: ErrorExpected) { return `(${lhs} ⇔ ${rhs})` }
  public existentialQuant(variable: string, subf: string, ee: ErrorExpected) { return `∃ ${variable}: ${subf}` }
  public universalQuant(variable: string, subf: string, ee: ErrorExpected) { return `∀ ${variable}: ${subf}` }
  public functionApplication(symbol: string, args: string[], ee: ErrorExpected) {
    this.testArity(symbol, args, ee);
    return `${symbol}(${args.join(', ')})`
  }
  public predicateAtom(symbol: string, args: string[], ee: ErrorExpected) {
    this.testArity(symbol, args, ee);
    return `${symbol}(${args.join(', ')})`
  }
}
class UniqueVarsModFactory extends StringFactory {
  private usageCounter = new Map<string, number>()
  private renameVar(name: string) {
    const usage = this.usageCounter.get(name);
    if (usage === undefined) {
      this.usageCounter.set(name, 1);
      return name;
    } else {
      this.usageCounter.set(name, usage + 1);
      return `${name}${usage}`;
    }
  }
  public universalQuant(variable: string, subf: string, ee: ErrorExpected) {
    return super.universalQuant(this.renameVar(variable), subf, ee);
  }
  public existentialQuant(variable: string, subf: string, ee: ErrorExpected) {
    return super.existentialQuant(this.renameVar(variable), subf, ee);
  }
}

type Common<T> = { t: T, id: number, parent: () => number, s: () => string }
type Atom<T> = Common<T>
interface UnOp<T> extends Common<T> {
  subf: TIPSFormula,
}
interface ParamUnOp<T> extends UnOp<T> {
  v: string
}
interface BinOp<T> extends Common<T> {
  lhs: TIPSFormula,
  rhs: TIPSFormula,
}
type TIPSFormula = Atom<'predicateAtom'> | Atom<'equalityAtom'>
  | UnOp<'negation'> | ParamUnOp<'existentialQuant'> | ParamUnOp<'universalQuant'>
  | BinOp<'conjunction'> | BinOp<'disjunction'> | BinOp<'implication'> | BinOp<'equivalence'>

class TISFactory implements FormulaFactories<string, TIPSFormula> {
  private context: CellContext;
  private _sf: StringFactory; private get sf() { return this._sf }
  private id = 0;
  private parentMap = new Map();
  constructor(context: CellContext) {
    this.context = context;
    this._sf = new StringFactory(context);
  }
  public variable = this.sf.variable;
  public constant = this.sf.constant;
  public functionApplication = this.sf.functionApplication;
  public predicateAtom(symbol: string, args: string[], ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'predicateAtom', id: this.id++, parent, s: () => this.sf.predicateAtom(symbol, args, ee) }
  }
  public equalityAtom(lhs: string, rhs: string, ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'equalityAtom', id: this.id++, parent, s: () => this.sf.equalityAtom(lhs, rhs, ee) }
  }
  public negation(subf: TIPSFormula, ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'negation', id: this.id++, parent, s: () => this.sf.negation(subf.s(), ee), subf }
  }
  public conjunction(lhs: TIPSFormula, rhs: TIPSFormula, ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'conjunction', id: this.id++, parent, s: () => this.sf.conjunction(lhs.s(), rhs.s(), ee), lhs, rhs }
  }
  public disjunction(lhs: TIPSFormula, rhs: TIPSFormula, ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'disjunction', id: this.id++, parent, s: () => this.sf.disjunction(lhs.s(), rhs.s(), ee), lhs, rhs }
  }
  public implication(lhs: TIPSFormula, rhs: TIPSFormula, ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'implication', id: this.id++, parent, s: () => this.sf.implication(lhs.s(), rhs.s(), ee), lhs, rhs }
  }
  public equivalence(lhs: TIPSFormula, rhs: TIPSFormula, ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'equivalence', id: this.id++, parent, s: () => this.sf.equivalence(lhs.s(), rhs.s(), ee), lhs, rhs }
  }
  public existentialQuant(v: string, subf: TIPSFormula, ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'existentialQuant', id: this.id++, parent, s: () => this.sf.existentialQuant(v, subf.s(), ee), v, subf }
  }
  public universalQuant(v: string, subf: TIPSFormula, ee: ErrorExpected): TIPSFormula {
    const parent = () => this.parentMap.get(this.id) || -1;
    return { t: 'universalQuant', id: this.id++, parent, s: () => this.sf.universalQuant(v, subf.s(), ee), v, subf }
  }
}

class SkolemModFactory extends TISFactory {
  private parentMap = new Map<string, string>();
  private varScopes = new Map<string, string[]>();

  public variable(symbol: string, ee: ErrorExpected) { return symbol }
  public constant(symbol: string, ee: ErrorExpected) { return symbol }
  public equalityAtom(lhs: string, rhs: string, ee: ErrorExpected) { return `${lhs} ≐ ${rhs}` }
  public negation(subf: string, ee: ErrorExpected) { return `¬${subf}` }
  public conjunction(lhs: string, rhs: string, ee: ErrorExpected) { return `(${lhs} ∧ ${rhs})` }
  public disjunction(lhs: string, rhs: string, ee: ErrorExpected) { return `(${lhs} ∨ ${rhs})` }
  public implication(lhs: string, rhs: string, ee: ErrorExpected) { return `(${lhs} ⇒ ${rhs})` }
  public equivalence(lhs: string, rhs: string, ee: ErrorExpected) { return `(${lhs} ⇔ ${rhs})` }
  public existentialQuant(variable: string, subf: string, ee: ErrorExpected) { return `∃ ${variable}: ${subf}` }
  public universalQuant(variable: string, subf: string, ee: ErrorExpected) { return super.universalQuant(variable, subf, ee) }
  public predicateAtom(symbol: string, args: string[], ee: ErrorExpected) { return super.predicateAtom(symbol, args, ee) }
}

const stringFactory = (context: CellContext) => {
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
    implication: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ⇒ ${rhs})`,
    equivalence: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} ⇔ ${rhs})`,
    existentialQuant: (variable: string, subf: string, ee: ErrorExpected) => `∃ ${variable}: ${subf}`,
    universalQuant: (variable: string, subf: string, ee: ErrorExpected) => `∀ ${variable}: ${subf}`,
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

const texFactory = (context: CellContext) => {
  const testArity = (symbol: string, args: any[], ee: ErrorExpected) => {
    const a = context.symbolArity(symbol)
    a !== args.length && ee.expected(`${a} arguments for ${symbol}`);
  }
  const factory: FormulaFactories<string, string> = {
    variable: (symbol: string, ee: ErrorExpected) => `\\text{\\textsf{${symbol}}}`,
    constant: (symbol: string, ee: ErrorExpected) => `\\text{\\textsf{${symbol}}}`,
    equalityAtom: (lhs: string, rhs: string, ee: ErrorExpected) => `${lhs} \\doteq ${rhs}`,
    negation: (subf: string, ee: ErrorExpected) => `\\neg ${subf}`,
    conjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\land ${rhs})`,
    disjunction: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\lor ${rhs})`,
    implication: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\rarr ${rhs})`,
    equivalence: (lhs: string, rhs: string, ee: ErrorExpected) => `(${lhs} \\lrarr ${rhs})`,
    existentialQuant: (variable: string, subf: string, ee: ErrorExpected) => `\\exists ${variable} ${subf}`,
    universalQuant: (variable: string, subf: string, ee: ErrorExpected) => `\\forall ${variable}: ${subf}`,
    functionApplication: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `\\text{\\textsf{${symbol}}}(${args.map(a => `\\text{\\textsf{${a}}}`).join(', ')})`
    },
    predicateAtom: (symbol: string, args: string[], ee: ErrorExpected) => {
      testArity(symbol, args, ee);
      return `\\text{\\textsf{${symbol}}}(${args.map(a => `\\text{\\textsf{${a}}}`).join(', ')})`
    },
  };
  return factory;
}

/*

function typedFormulaFactory(formula: string, context: CellContext): FormulaFactories<string, TypedFormula> {
  const sf = stringFactory(context);
  return {
    variable: sf.variable,
    constant: sf.constant,
    equalityAtom: (lhs: string, rhs: string, ee: ErrorExpected) => ({ f: sf.equalityAtom(lhs, rhs, ee), t: 'equalityAtom' }),
    negation: (subf: TypedFormula, ee: ErrorExpected) => ({ f: sf.negation(subf.f, ee), t: 'negation' }),
    conjunction: (lhs: TypedFormula, rhs: TypedFormula, ee: ErrorExpected) => ({ f: sf.conjunction(lhs.f, rhs.f, ee), t: 'conjunction' }),
    disjunction: (lhs: TypedFormula, rhs: TypedFormula, ee: ErrorExpected) => ({ f: sf.disjunction(lhs.f, rhs.f, ee), t: 'disjunction' }),
    implication: (lhs: TypedFormula, rhs: TypedFormula, ee: ErrorExpected) => ({ f: sf.implication(lhs.f, rhs.f, ee), t: 'implication' }),
    equivalence: (lhs: TypedFormula, rhs: TypedFormula, ee: ErrorExpected) => ({ f: sf.equivalence(lhs.f, rhs.f, ee), t: 'equivalence' }),
    existentialQuant: (variable: string, subf: TypedFormula, ee: ErrorExpected) => ({ f: sf.existentialQuant(variable, subf.f, ee), t: 'existentialQuant' }),
    universalQuant: (variable: string, subf: TypedFormula, ee: ErrorExpected) => ({ f: sf.universalQuant(variable, subf.f, ee), t: 'universalQuant' }),
    functionApplication: sf.functionApplication,
    predicateAtom: (symbol: string, args: string[], ee: ErrorExpected) => ({ f: sf.predicateAtom(symbol, args, ee), t: 'universalQuant' })
  };
}
*/

export function formula2NNF(formula: string, context: CellContext) {
  type Common<T> = { s: () => string, t: T }
  type Atom<T> = Common<T>
  interface UnOp<T> extends Common<T> {
    subf: TypedFormula,
  }
  interface ParamUnOp<T> extends UnOp<T> {
    v: string
  }
  interface BinOp<T> extends Common<T> {
    lhs: TypedFormula,
    rhs: TypedFormula,
  }
  type TypedFormula = Atom<'predicateAtom'> | Atom<'equalityAtom'>
    | UnOp<'negation'> | ParamUnOp<'existentialQuant'> | ParamUnOp<'universalQuant'>
    | BinOp<'conjunction'> | BinOp<'disjunction'> | BinOp<'implication'> | BinOp<'equivalence'>

  const sf = stringFactory(context);
  const nnfFactory: FormulaFactories<string, TypedFormula> = {
    variable: sf.variable,
    constant: sf.constant,
    equalityAtom: (lhs: string, rhs: string, ee: ErrorExpected) => ({ t: 'equalityAtom', s: () => sf.equalityAtom(lhs, rhs, ee) }),
    /* transform */
    negation(subf: TypedFormula, ee: ErrorExpected) {
      if (subf.t === 'negation') {
        // double negation
        return subf.subf;
      } else if (subf.t === 'conjunction') {
        return {
          t: 'disjunction',
          s() { return sf.disjunction(this.lhs.s(), this.rhs.s(), ee) },
          lhs: this.negation(subf.lhs, ee),
          rhs: this.negation(subf.rhs, ee),
        }
      } else if (subf.t === 'disjunction') {
        return {
          t: 'conjunction',
          s() { return sf.conjunction(this.lhs.s(), this.rhs.s(), ee) },
          lhs: this.negation(subf.lhs, ee),
          rhs: this.negation(subf.rhs, ee),
        }
      } else if (subf.t === 'existentialQuant') {
        return {
          t: 'universalQuant',
          s() { return sf.universalQuant(subf.v, this.subf.s(), ee) },
          v: subf.v,
          subf: this.negation(subf.subf, ee),
        }
      } else if (subf.t === 'universalQuant') {
        return {
          t: 'existentialQuant',
          s() { return sf.universalQuant(subf.v, this.subf.s(), ee) },
          v: subf.v,
          subf: this.negation(subf.subf, ee),
        }
      } else {
        return { t: 'negation', s: () => sf.negation(subf.s(), ee), subf }
      }
    },
    conjunction: (lhs: TypedFormula, rhs: TypedFormula, ee: ErrorExpected) => ({ t: 'conjunction', s: () => sf.conjunction(lhs.s(), rhs.s(), ee), lhs, rhs, }),
    disjunction: (lhs: TypedFormula, rhs: TypedFormula, ee: ErrorExpected) => ({ t: 'disjunction', s: () => sf.disjunction(lhs.s(), rhs.s(), ee), lhs, rhs, }),
    /* transform A => B to ~A || B */
    implication(lhs: TypedFormula, rhs: TypedFormula, ee: ErrorExpected) {
      return {
        t: 'disjunction',
        s() { return sf.disjunction(this.lhs.s(), rhs.s(), ee) },
        lhs: this.negation(lhs, ee),
        rhs,
      }
    },
    /* transform A <=> B to ((~A || B) && (~B || A)) */
    equivalence(lhs: TypedFormula, rhs: TypedFormula, ee: ErrorExpected) {
      return {
        t: 'conjunction',
        s() { return sf.conjunction(this.lhs.s(), this.rhs.s(), ee) },
        lhs: this.implication(lhs, rhs, ee),
        rhs: this.implication(rhs, lhs, ee),
      }
    },
    existentialQuant: (v: string, subf: TypedFormula, ee: ErrorExpected) => ({ v, subf, s: () => sf.existentialQuant(v, subf.s(), ee), t: 'existentialQuant' }),
    universalQuant: (v: string, subf: TypedFormula, ee: ErrorExpected) => ({ v, subf, s: () => sf.universalQuant(v, subf.s(), ee), t: 'universalQuant' }),
    functionApplication: sf.functionApplication,
    predicateAtom: (symbol: string, args: string[], ee: ErrorExpected) => ({ s: () => sf.predicateAtom(symbol, args, ee), t: 'predicateAtom' })
  };

}
/*
interface NodeCommon<T> {
  t: T,
  parent: () => TreeNode | undefined
  children: TreeNode[]
  s: () => string
  apply: (f: (n: TreeNode) => TreeNode) => void
}
interface UnOpNode<T> extends NodeCommon<T> {
  subf: TreeNode
}
interface BinOpNode<T> extends NodeCommon<T> {
  lhs: TreeNode,
  rhs: TreeNode,
}
interface VarUnOpNode<T> extends NodeCommon<T> {
  variable: string
  subf: TreeNode,
}
interface AtomNode<T> extends NodeCommon<T> {
  children: []
}

class Conjunction implements BinOpNode<'conjunction'> {
  lhs: TreeNode;
  rhs: TreeNode;
  t: "conjunction";
  parent: () => TreeNode | undefined;
  children: TreeNode[];
  s: () => string;
  apply: (f: (n: TreeNode) => TreeNode) => void;
  
}

type TreeNode = AtomNode<'predicateAtom'> | AtomNode<'equalityAtom'>
  | UnOpNode<'negation'> | VarUnOpNode<'existentialQuant'> | VarUnOpNode<'universalQuant'>
  | BinOpNode<'conjunction'> | BinOpNode<'disjunction'> | BinOpNode<'implication'> | BinOpNode<'equivalence'>
function ConsTreeFactory(context: CellContext): FormulaFactories<string, TreeNode> {
  const sf = new StringFactory(context);
  const parentMap = new Map<TreeNode, TreeNode>();
  return {
    variable: sf.variable,
    constant: sf.constant,
    functionApplication: sf.functionApplication,
    equalityAtom(lhs: string, rhs: string, ee: ErrorExpected) {
      return { 
        t: 'equalityAtom', 
        parent() { return parentMap.get(this) }, 
        s: () => sf.equalityAtom(lhs, rhs, ee),
        children: [],
       }
    },
    negation(subf: TreeNode, ee: ErrorExpected) {
      return { 
        t: 'negation', 
        parent() { return parentMap.get(this) }, 
        s: () => sf.negation(subf.s(), ee),
        children: [subf], 
       }
    },
    conjunction(lhs: TreeNode, rhs: TreeNode, ee: ErrorExpected) {
      return { 
        t: 'conjunction', 
        parent() { return parentMap.get(this) }, 
        s: () => sf.conjunction(lhs.s(), rhs.s(), ee),
        children: [lhs, rhs], 
       }
    },
    disjunction(lhs: TreeNode, rhs: TreeNode, ee: ErrorExpected) {
      return { 
        t: 'disjunction', 
        parent() { return parentMap.get(this) }, 
        s: () => sf.disjunction(lhs.s(), rhs.s(), ee),
        children: [lhs, rhs], 
      }
    },
    implication(lhs: TreeNode, rhs: TreeNode, ee: ErrorExpected) {
      return { 
        t: 'implication', 
        parent() { return parentMap.get(this) }, 
        s: () => sf.implication(lhs.s(), rhs.s(), ee),
        children: [lhs, rhs], 
      }
    },
    equivalence(lhs: TreeNode, rhs: TreeNode, ee: ErrorExpected) {
      return {
        t: 'equivalence',
        parent() { return parentMap.get(this) },
        s: () => sf.equivalence(lhs.s(), rhs.s(), ee),
        children: [lhs, rhs]
      }
    },
    existentialQuant(variable: string, subf: TreeNode, ee: ErrorExpected) {
      return {
        t: 'existentialQuant',
        parent() { return parentMap.get(this) }, 
        s: () => sf.existentialQuant(variable, subf.s(), ee),
        variable, 
        children: [subf]
      }
    },
    universalQuant(variable: string, subf: TreeNode, ee: ErrorExpected) {
      return {
        t: 'universalQuant',
        parent() { return parentMap.get(this) }, 
        s: () => sf.universalQuant(variable, subf.s(), ee),
        variable, 
        children: [subf]
      }
    },
    predicateAtom(symbol: string, args: string[], ee: ErrorExpected) {
      return {
        t: 'predicateAtom',
        parent() { return parentMap.get(this) }, 
        s: () => sf.predicateAtom(symbol, args, ee),
        children: []
      }
    }
  };
}



function formulaToClause(formula: string, context: CellContext) {
  const tree = parseFormulaWithPrecedence(formula, context, ConsTreeFactory(context));
  
  const apply = (n: TreeNode, f: (n: TreeNode) => TreeNode) => {
    const newN = f(n);
    if (newN.children.length === 1) {
      newN.children = [f(newN.children[0])]
    } else if (newN.children.length === 2) {
      newN.children = [f(newN.children[0]), f(newN.children[1])]
    }
    return newN;
  }

  const doubleNegation = (n: TreeNode) => {
    if (n.t === 'negation' && n.children[0].t === 'negation') {
      return n.children[0].children[0];
    }
    return n;
  }
  const transformImp = (n: TreeNode) => {
    if (n.t === 'implication') {
      return { 
        t: 'disjunction', 
        parent: n.parent, 
        s: () => sf.disjunction(lhs.s(), rhs.s(), ee),
        children: [n.children[0], n.children[1]], 
      }
    }
  }
}*/
/*
class InnerCommon {
  children: TreeNode[] = []
  sf: StringFactory
  str(ee: ErrorExpected) {return ''}
  parent = () => undefined
  constructor(sf: StringFactory) {this.sf = sf}
  apply = (f: (n: TreeNode) => TreeNode) => this.children = this.children.map(f)
}*/
/*
interface TreeNode {
  t: 'conjunction' | 'disjunction',
  node: InnerCommon
}*/
/*
type TreeNode = {t: 'conjunction', node: Conjunction}

class BinOpNode<T> extends InnerCommon {
  t: T
  constructor(sf: StringFactory, t: T, lhs: TreeNode, rhs: TreeNode) {
    super(sf); this.t = t; this.children = [lhs, rhs];
  }
  lhs() { return this.children[0] }
  rhs() { return this.children[1] }
}

class Conjunction extends BinOpNode<'conjunction'> {
  constructor(sf: StringFactory, lhs: TreeNode, rhs: TreeNode) {
    super(sf, 'conjunction', lhs, rhs);
  }
  str(ee: ErrorExpected) { return this.sf.conjunction(this.lhs().node.str(ee), this.rhs(), ee) };
}*/

