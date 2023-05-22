const input_types = {
  text: "string",
  number: "number",
};

export const literal = (name: string, type: "string" | "number"): Literal => {
  return {
    name,
    type: "Literal",
    value: type,
  };
};

export const choice = (name: string, options: string[]): Choice => {
  return {
    name,
    type: "Choice",
    choices: options,
  };
};

export const multiple = (name: string, type: string): Multiple => {
  return {
    name,
    type: "Multiple",
    sequence: type,
  };
};

export const fixed = (name: string, nodes: string[]): Fixed => {
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

export type Grammar = {
  root: GrammarNode;
  [key: string]: GrammarNode;
};
