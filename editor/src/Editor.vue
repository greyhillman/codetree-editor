<script setup lang="ts">
import { ref } from 'vue';
import GrammarNode from './components/GrammarNode.vue';
import { useLanguage } from './stores/language';
import { useNodeStore } from './stores/node';

const root = useNodeStore("root");
const language = useLanguage();

const user = ref("vicky");

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
  <p>
    User select:
    <select v-model="user">
      <option value="grey">Grey</option>
      <option value="vicky">Vicky</option>
    </select>
  </p>
  <main :lang="language.current" :data-user="user">
    <GrammarNode :store="root.$id" :value="language.grammar['root']" />
  </main>
</template>

<style lang="scss" src="./assets/main.scss"></style>
<style lang="scss" src="./assets/lang.json.scss"></style>
<style lang="scss" src="./assets/grey/lang.json.scss"></style>
<style lang="scss" src="./assets/vicky/lang.json.scss"></style>
