<script setup lang="ts">
import { ref } from 'vue';
import GrammarNode from './components/GrammarNode.vue';
import { grammars } from './grammar';
import { useLanguage } from './stores/language';
import { useNodeStore } from './stores/node';

const root = useNodeStore("root");
const language = useLanguage();

</script>

<template>
  <header>AST Editor</header>
  <p>Press tab to enter into the "Editor" section.</p>
  <p>
    Language select:
    <select v-model="language.current">
      <option value="json">JSON</option>
    </select>
  </p>
  <main>
    <GrammarNode :store="root.$id" :value="language.grammar['root']" />
  </main>
</template>

<style lang="scss" src="./assets/main.scss"></style>
