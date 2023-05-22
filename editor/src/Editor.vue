<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, watchEffect } from 'vue';
import GrammarNode from './components/GrammarNode.vue';
import { useLanguage } from './stores/language';
import { useNodeStore } from './stores/node';

const root = useNodeStore("root");
const language = useLanguage();

const language_refs = storeToRefs(language);

const user = ref("vicky");

watch([language_refs.current], () => {
  console.log("language changed");
  root.value = "";
  root.children.splice(0);
});

</script>

<template>
  <header>AST Editor</header>
  <p>Press tab to enter into the "Editor" section.</p>
  <p>
    Language select:
    <select v-model="language.current">
      <option value="json">JSON</option>
      <option value="clojure">Clojure</option>
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
    <GrammarNode :store="root.$id" type="root" />
  </main>
</template>

<style lang="scss" src="./assets/main.scss"></style>
<style lang="scss" src="./assets/lang.json.scss"></style>
<style lang="scss" src="./assets/grey/lang.json.scss"></style>
<style lang="scss" src="./assets/vicky/lang.json.scss"></style>
