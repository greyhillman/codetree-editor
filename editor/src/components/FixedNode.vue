<script setup lang="ts">
import type { Fixed } from '@/grammar';
import { useEditMode } from '@/stores/mode';
import { useNodeStore } from '@/stores/node';
import GrammarNode from './GrammarNode.vue';
import { computed, useCssModule } from 'vue';
import { useSelection } from '@/stores/selection';
import { useKeyboard } from '@/stores/keyboard';
import { useLanguage } from '@/stores/language';

const props = defineProps<{
    store: string;
    value: Fixed;
}>();

const store = useNodeStore(props.store);
const selection = useSelection();
const mode = useEditMode();
const keyboard = useKeyboard();

while (store.children.length > props.value.nodes.length) {
    store.remove_child(store.children.length - 1);
}
while (store.children.length < props.value.nodes.length) {
    store.add_child();
}

console.log("Current children:");
console.log(store.children.length);
console.log("Expected children");
console.log(props.value.nodes.length);

const classes = computed(() => {
    return {
        'selected': selection.value === props.store,
        'node fixed': true,
        [props.value.name]: true,
    }
});

const keydown = (event: KeyboardEvent) => {
    console.log("Fixed key event");
    console.log(event);

    event.stopPropagation();

    if (mode.current === 'navigating') {
        if (event.key === keyboard.move.in) {
            selection.move("in");
        } else if (event.key === keyboard.move.out) {
            selection.move("out");
        } else if (event.key === keyboard.move.next) {
            selection.move("next");
        } else if (event.key === keyboard.move.prev) {
            selection.move("prev");
        }
    }
}
</script>

<template>
    <section :class="classes" @keydown="keydown" :id="`node-${store.$id}`" tabindex="0">
        <header>Fixed: {{ props.value.name }} ({{ store.$id }})</header>
        <ol>
            <li v-for="(grammar_type, index) in props.value.nodes" :key="index">
                <GrammarNode :store="store.children[index]" :type="grammar_type" />
            </li>
        </ol>
    </section>
</template>