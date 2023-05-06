# viey-editor

An experimental AST editor & format.

## Experimental

We're currently in the prototyping phase: expect technologies and formats to change.
In this phase, we are prioritizing rapid development and exploration.

## Editor

The vision for the editor is

- to visualize the structure of a program as an AST
- to allow different views of the same AST
- to quickly navigate and edit the AST as fast or faster than normal text-based coding

## Format

To support the editor, and to remove reliance on text-based grammar, we will need a format for storing the AST of a programming language.
The goals of the format are, in order of importance:

1. Simplicity
2. Ease
3. Machine efficient

### Simplicity

By simplicity, we mean there are few concepts and connections a programmer needs in order to parse the AST format.
We want programmers to be able to write their own tooling without complexity: edge-cases, gotchas, complection, etc.

### Ease

By ease, we mean a novice programmer can parse the format without learning new concepts.
A programmer with a year of experience should be able to parse the format and create their own tooling.

### Machine efficient

By machine efficient, we mean the format is space and time efficient: the format should be small to store and fast to parse.
