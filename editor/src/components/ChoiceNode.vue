<script setup lang="ts">
import { grammar, type Choice } from '@/grammar';
import { useEditMode } from '@/stores/mode';
import { useNodeStore } from '@/stores/node';
import GrammarNode from './GrammarNode.vue';
import { computed, onMounted, vModelCheckbox, type Ref, ref } from 'vue';
import { useSelection } from '@/stores/selection';

const props = defineProps<{
    store: string;
    value: Choice;
}>();

const tree = useNodeStore(props.store);
const selection = useSelection();
const mode = useEditMode();

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
    };
});

const input: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
    document.addEventListener("keydown", event => {
        if (selection.value !== props.store) {
            return;
        }

        console.log("Choice node key event");

        event.preventDefault();

        if (mode.current === 'editing') {
            input.value?.focus();
        } else if (mode.current === 'navigating') {
            input.value?.blur();
        }
    });
});

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
    event.preventDefault();

    if (mode.current === 'editing') {
        if (event.key === 'j') {
            tree.value = next_value(tree.value);
        } else if (event.key === 'k') {
            tree.value = prev_value(tree.value);
        }
    }
}

</script>

<template>
    <select v-model="tree.value" :class="classes" ref="input" @keydown="keydown">
        <option v-for="choice in props.value.choices" :value="choice">{{ choice }}</option>
    </select>
    <GrammarNode v-if="tree.value" :store="tree.children[0]" :value="grammar[tree.value]" />
</template>