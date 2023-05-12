<script setup lang="ts">
import { grammar, type Multiple } from '@/grammar';
import { useNodeStore } from '@/stores/node';
import GrammarNode from './GrammarNode.vue';
import { computed, onMounted, useCssModule } from 'vue';
import { useSelection } from '@/stores/selection';
import { useEditMode } from '@/stores/mode';

const props = defineProps<{
    store: string;
    value: Multiple;
}>();

const tree = useNodeStore(props.store);
const selection = useSelection();
const mode = useEditMode();

const classes = computed(() => {
    return {
        'selected': selection.value === props.store,
    };
});

onMounted(() => {
    document.addEventListener("keydown", event => {
        if (selection.value !== props.store) {
            return;
        }

        console.log("Multiple node key event");
        console.log(event);

        if (mode.current === 'editing') {
            if (event.key === 'a') {
                tree.add_child();
            }
        }
    });
})

</script>

<template>
    <section :class="classes">
        <header>{{ props.value.name }}</header>
        <ol>
            <li v-for="(child, index) in tree.children" :key="child">
                <GrammarNode :store="child" :value="grammar[props.value.sequence]" />
            </li>
        </ol>
    </section>
</template>