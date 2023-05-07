<script setup lang="ts">
import CompositeNode from './components/CompositeNode.vue';
import { useInputStore } from './stores/input';
import { useNodeStore, type NodeStore } from './stores/node';

const root = useNodeStore("root");
root.value = "root";

const input = useInputStore();

function key_down(event: KeyboardEvent) {
  event.preventDefault();
  console.log(event.key);
  console.log(event);

  input.key_down(event);
}

</script>

<template>
  <header>AST Editor</header>
  <p>Press tab to enter into the "Editor" section.</p>
  <main @keydown="key_down">
    <CompositeNode :store="root.$id" :depth="1" :selected="input.selected" />
  </main>
</template>

<style>
section.node.selected {
  outline: 2px solid orange;
}

main {
  font-family: 'Courier New', Courier, monospace;
  border: solid 2px black;
  padding: 0.5em;
}
</style>