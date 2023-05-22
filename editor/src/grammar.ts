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

// JSON grammar: https://www.json.org/json-en.html
const grammars = {
  json: {
    root: fixed("root", ["value"]),
    object: multiple("object", "entry"),
    array: multiple("array", "value"),
    entry: fixed("entry", ["string", "value"]),
    value: choice("value", [
      "object",
      "array",
      "number",
      "string",
      "true",
      "false",
      "null",
    ]),
    number: literal("number", "number"),
    string: literal("string", "string"),
    true: fixed("true", []),
    false: fixed("false", []),
    null: fixed("null", []),
  } as Grammar,
} as Record<string, Grammar>;

type Grammar = {
  root: GrammarNode;
  [key: string]: GrammarNode;
};

export { grammars };
