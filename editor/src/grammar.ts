const input_types = {
  text: "string",
  number: "number",
};

const literal = (name: string, type: "string" | "number"): Literal => {
  return {
    name,
    type: "Literal",
    value: type,
  };
};

const choice = (name: string, options: string[]): Choice => {
  return {
    name,
    type: "Choice",
    choices: options,
  };
};

const multiple = (name: string, type: string): Multiple => {
  return {
    name,
    type: "Multiple",
    sequence: type,
  };
};

const fixed = (name: string, nodes: string[]): Fixed => {
  return {
    name,
    type: "Fixed",
    nodes,
  };
};

export interface Literal {
  name: string;
  type: "Literal";
  value: "string" | "number";
}

export interface Choice {
  name: string;
  type: "Choice";
  choices: string[];
}

export interface Multiple {
  name: string;
  type: "Multiple";
  sequence: string;
}

export interface Fixed {
  name: string;
  type: "Fixed";
  nodes: string[];
}

export type GrammarNode = Literal | Choice | Multiple | Fixed;

const grammar = {
  program: choice("program", ["statement", "def"]),
  statement: choice("statement", ["assignment", "expr"]),
  def: fixed("def", ["identifier", "parameters", "statements"]),
  parameters: multiple("parameters", "identifier"),
  statements: multiple("statements", "statement"),
  assignment: fixed("assignment", ["identifier", "expr"]),
  identifier: literal("identifier", "string"),
  expr: choice("expr", [
    "identifier",
    "number",
    "function-call",
    "not",
    "and",
    "or",
  ]),
  number: literal("number", "number"),
  "function-call": fixed("function-call", ["identifier", "arguments"]),
  arguments: multiple("arguments", "expr"),
  not: fixed("not", ["expr"]),
  and: fixed("and", ["expr", "expr"]),
  or: fixed("or", ["expr", "expr"]),
} as Grammar;

type Grammar = Record<string, GrammarNode>;

export { grammar };
