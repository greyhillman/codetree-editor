<script setup lang="ts">
import type { Literal } from '@/grammar';
import { useEditMode } from '@/stores/mode';
import { useNodeStore } from '@/stores/node';
import { useSelection } from '@/stores/selection';
import { computed, onMounted, ref, vModelCheckbox, type Ref } from 'vue';

const props = defineProps<{
    store: string;
    value: Literal;
}>();
const store = useNodeStore(props.store);
const selection = useSelection();
const mode = useEditMode();

const classes = computed(() => {
    return {
        'selected': selection.value === props.store,
    };
});

const input_ref: Ref<HTMLInputElement | null> = ref(null);

onMounted(() => {
    document.addEventListener("keyup", event => {
        if (selection.value === props.store && event.key === 'e') {
            console.log("Start editing literal node");
            mode.current = 'editing';
            input_ref.value?.focus();
        }
    });
});

const handle_text_input = (event: KeyboardEvent) => {
    console.log("Text input");
    console.log(event);
    if (event.key === 'Escape' || event.key === 'Enter') {
        mode.current = 'navigating';
    }
}

const handle_number_input = (event: KeyboardEvent) => {
    console.log("Number input");
    console.log(event);
    if (event.key === 'Escape' || event.key === 'Enter') {
        mode.current = 'navigating';
    }
}
</script>

<template>
    <span :class="classes" v-if="mode.current === 'navigating'">{{ store.value }}</span>
    <input type="text" ref="input_ref" :class="classes" v-if="mode.current === 'editing' && props.value.value === 'string'"
        v-model="store.value" @keydown="handle_text_input" />
    <input type="number" ref="input_ref" :class="classes"
        v-if="mode.current === 'editing' && props.value.value === 'number'" v-model="store.value"
        @keydown="handle_number_input" />
</template>