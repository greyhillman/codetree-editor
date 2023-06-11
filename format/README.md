# AST Format

## Design Goals

1. Simplicity of decoding
2. Ease of decoding

### Simplicity of Decoding

A decoder for the file format should be simple:

- no loopbacks
- no maintaining offsets
- etc.

### Ease of Decoding

An average programmer should be able to

1. Understand the file format
2. Write a decoder for the file format
3. Query/manipulate the AST

## Structure

### Header

1. File identifier
2. Checksum
3. Language identifier
4. Language version

### Data Chunks

The data chunks are the pre-order traversal of the AST.

1. Chunk Type = 1 byte
2. Language Node Type = 2 byte
3. Data Length = 4 bytes
4. Data
