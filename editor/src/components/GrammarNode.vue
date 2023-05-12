<script setup lang="ts">
import ChoiceNode from './ChoiceNode.vue';
import FixedNode from './FixedNode.vue';
import LiteralNode from './LiteralNode.vue';
import MultipleNode from './MultipleNode.vue';
import type { GrammarNode } from '@/grammar';

const props = defineProps<{
    store: string;
    value: GrammarNode;
}>();

</script>

<template>
    <ChoiceNode v-if="props.value.type === 'Choice'" :store="props.store" :value="props.value" />
    <FixedNode v-if="props.value.type === 'Fixed'" :store="props.store" :value="props.value" />
    <LiteralNode v-if="props.value.type === 'Literal'" :store="props.store" :value="props.value" />
    <MultipleNode v-if="props.value.type === 'Multiple'" :store="props.store" :value="props.value" />
</template>