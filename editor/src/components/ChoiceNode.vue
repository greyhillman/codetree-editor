<script setup lang="ts">
import { type Choice } from '@/grammar';
import { useEditMode } from '@/stores/mode';
import { useNodeStore } from '@/stores/node';
import GrammarNode from './GrammarNode.vue';
import { computed, onMounted, vModelCheckbox, type Ref, ref } from 'vue';
import { useSelection } from '@/stores/selection';
import { useKeyboard } from '@/stores/keyboard';
import { useLanguage } from '@/stores/language';

const props = defineProps<{
    store: string;
    value: Choice;
}>();

const tree = useNodeStore(props.store);
const selection = useSelection();
const mode = useEditMode();
const keyboard = useKeyboard();

if (!tree.value) {
    tree.value = props.value.choices[0];
}

while (tree.children.length < 1) {
    tree.add_child();
}
while (tree.children.length > 1) {
    tree.remove_child(tree.children.length - 1);
}

const classes = computed(() => {
    return {
        'selected': selection.value === props.store,
        'node choice': true,
        [props.value.name]: true,
    };
});

const input: Ref<HTMLElement | null> = ref(null);

const next_value = (current: string) => {
    const current_index = props.value.choices.findIndex(choice => choice === current);

    const new_index = Math.min(current_index + 1, props.value.choices.length - 1);

    return props.value.choices[new_index];
}

const prev_value = (current: string) => {
    const current_index = props.value.choices.findIndex(choice => choice === current);

    const new_index = Math.max(current_index - 1, 0);

    return props.value.choices[new_index];
}

const keydown = (event: KeyboardEvent) => {
    console.log("Choice key event");
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
        if (event.key === keyboard.move.next) {
            tree.value = next_value(tree.value);
        } else if (event.key === keyboard.move.prev) {
            tree.value = prev_value(tree.value);
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
        <header>Choice ({{ tree.$id }})</header>
        <select v-model="tree.value" ref="input">
            <option v-for="choice in props.value.choices" :value="choice">{{ choice }}</option>
        </select>
        <GrammarNode v-if="tree.value" :store="tree.children[0]" :type="tree.value" />
    </section>
</template>