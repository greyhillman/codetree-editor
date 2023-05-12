<script setup lang="ts">
import type { Fixed } from '@/grammar';
import { useEditMode } from '@/stores/mode';
import { useNodeStore } from '@/stores/node';
import GrammarNode from './GrammarNode.vue';
import { grammar } from '@/grammar';
import { computed } from 'vue';
import { useSelection } from '@/stores/selection';

const props = defineProps<{
    store: string;
    value: Fixed;
}>();

const store = useNodeStore(props.store);
const selection = useSelection();

while (store.children.length > props.value.nodes.length) {
    store.remove_child(store.children.length - 1);
}
while (store.children.length < props.value.nodes.length) {
    store.add_child();
}

const classes = computed(() => {
    return {
        'selected': selection.value === props.store,
    }
});

</script>

<template>
    <section :class="classes">
        <header>{{ props.value.name }}</header>
        <ol>
            <li v-for="(grammar_type, index) in props.value.nodes" :key="index">
                <GrammarNode :store="store.children[index]" :value="grammar[grammar_type]" />
            </li>
        </ol>
    </section>
</template>