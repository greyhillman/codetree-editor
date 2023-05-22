import { choice, fixed, literal, multiple, type Grammar } from "../grammar";

// JSON grammar: https://www.json.org/json-en.html
export const grammar = {
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
} as Grammar;
