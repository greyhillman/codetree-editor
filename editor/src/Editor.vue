<script setup lang="ts">
import { onMounted } from 'vue';
import GrammarNode from './components/GrammarNode.vue';
import { grammar } from './grammar';
import { useEditMode } from './stores/mode';
import { useNodeStore } from './stores/node';
import { useSelection } from './stores/selection';

const root = useNodeStore("root");

onMounted(() => {
  document.addEventListener("keydown", (event) => {
    const mode = useEditMode();
    const selection = useSelection();

    console.log("Editor key event");
    console.log(event);


    if (mode.current === 'navigating') {
      event.preventDefault();

      if (event.key === 'j') {
        selection.move("down");
      } else if (event.key === 'k') {
        selection.move("up");
      } else if (event.key === 'h') {
        selection.move("out");
      } else if (event.key === 'l') {
        selection.move("in");
      }

      if (event.key === 'e') {
        mode.current = 'editing';
      }
    } else if (mode.current === 'editing') {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        mode.current = 'navigating';
      }
    }
  });
})

</script>

<template>
  <header>AST Editor</header>
  <p>Press tab to enter into the "Editor" section.</p>
  <main>
    <GrammarNode :store="root.$id" :value="grammar['program']" />
  </main>
</template>

<style lang="scss" src="./assets/main.scss"></style>
