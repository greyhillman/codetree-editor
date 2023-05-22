<script setup lang="ts">
import type { Literal } from '@/grammar';
import { useKeyboard } from '@/stores/keyboard';
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
const keyboard = useKeyboard();

const classes = computed(() => {
    return {
        'selected': selection.value === props.store,
        'node literal': true,
    };
});

const input_ref: Ref<HTMLInputElement | null> = ref(null);

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

const keydown = (event: KeyboardEvent) => {
    console.log("Literal key event");
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
            input_ref.value?.focus();
        }
    } else if (mode.current === 'editing') {

        if (event.key === keyboard.edit.stop) {
            mode.current = 'navigating';
        }
    }
}
</script>

<template>
    <section :class="classes" @keydown="keydown" :id="`node-${store.$id}`" tabindex="0">
        <header>Literal ({{ store.$id }})</header>
        <span v-if="mode.current === 'navigating'">{{ store.value }}</span>
        <input type="text" ref="input_ref" v-if="mode.current === 'editing' && props.value.value === 'string'"
            v-model="store.value" @keydown="handle_text_input" />
        <input type="number" ref="input_ref" v-if="mode.current === 'editing' && props.value.value === 'number'"
            v-model="store.value" @keydown="handle_number_input" />
    </section>
</template>