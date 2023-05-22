<script setup lang="ts">
import ChoiceNode from './ChoiceNode.vue';
import FixedNode from './FixedNode.vue';
import LiteralNode from './LiteralNode.vue';
import MultipleNode from './MultipleNode.vue';
import type { GrammarNode } from '@/grammar';
import { useLanguage } from '@/stores/language';
import { computed } from 'vue';

const props = defineProps<{
    store: string;
    type: string;
}>();

const language = useLanguage();

const node = computed(() => language.grammar[props.type]);

const error = computed(() => {
    if (!(props.type in language.grammar)) {
        return true;
    }
    return false;
});

</script>

<template>
    <div class="error" v-if="error">
        <p>Invalid grammar: missing node {{ props.type }}</p>
    </div>
    <ChoiceNode v-if="node && node.type === 'Choice'" :store="props.store" :value="node" />
    <FixedNode v-if="node && node.type === 'Fixed'" :store="props.store" :value="node" />
    <LiteralNode v-if="node && node.type === 'Literal'" :store="props.store" :value="node" />
    <MultipleNode v-if="node && node.type === 'Multiple'" :store="props.store" :value="node" />
</template>