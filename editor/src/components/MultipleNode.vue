<script setup lang="ts">
import { type Multiple } from '@/grammar';
import { useNodeStore } from '@/stores/node';
import GrammarNode from './GrammarNode.vue';
import { computed, onMounted, useCssModule } from 'vue';
import { useSelection } from '@/stores/selection';
import { useEditMode } from '@/stores/mode';
import { useKeyboard } from '@/stores/keyboard';
import { useLanguage } from '@/stores/language';

const props = defineProps<{
    store: string;
    value: Multiple;
}>();

const tree = useNodeStore(props.store);
const selection = useSelection();
const mode = useEditMode();
const keyboard = useKeyboard();

const classes = computed(() => {
    return {
        'selected': selection.value === props.store,
        'node multiple': true,
    };
});

const keydown = (event: KeyboardEvent) => {
    console.log("Multiple key event");
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

        if (event.key === keyboard.edit.start) {
            mode.current = 'editing';
        }
    } else if (mode.current === 'editing') {
        if (event.key === 'a') {
            tree.add_child();
        }
        if (event.key === keyboard.edit.stop) {
            mode.current = 'navigating';
        }
    }
}

const language = useLanguage();
</script>

<template>
    <section :class="classes" @keydown="keydown" :id="`node-${tree.$id}`" tabindex="0">
        <header>Multiple: {{ props.value.name }} ({{ tree.$id }})</header>
        <ol>
            <li v-for="(child, index) in tree.children" :key="child">
                <GrammarNode :store="child" :value="language.grammar[props.value.sequence]" />
            </li>
        </ol>
    </section>
</template>