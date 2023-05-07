<script setup lang="ts">
import { useNodeStore } from '@/stores/node';

const props = defineProps<{
    store: string;
    depth: number;
    selected: string;
}>();

const store = useNodeStore(props.store);

const classes = {
    "node": true,
    "selected": store.$id === props.selected,
};

console.log(classes);

</script>

<template>
    <section class="node" :class="store.$id === props.selected ? 'selected' : ''" :tabindex="props.depth">
        <header>{{ store.value }}</header>
        <ol>
            <li v-for="child in store.children" :key="child">
                <CompositeNode :store="child" :depth="props.depth + 1" :selected="props.selected" />
            </li>
        </ol>
    </section>
</template>
