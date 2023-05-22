<script setup lang="ts">
import GrammarNode from './components/GrammarNode.vue';
import { grammar } from './grammar';
import { useNodeStore } from './stores/node';

const root = useNodeStore("root");

</script>

<template>
  <header>AST Editor</header>
  <p>Press tab to enter into the "Editor" section.</p>
  <main>
    <GrammarNode :store="root.$id" :value="grammar['value']" />
  </main>
</template>

<style lang="scss" src="./assets/main.scss"></style>
