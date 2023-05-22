<script setup lang="ts">
import type { Literal } from '@/grammar';
import { useKeyboard } from '@/stores/keyboard';
import { useEditMode } from '@/stores/mode';
import { useNodeStore } from '@/stores/node';
import { useSelection } from '@/stores/selection';
import { computed, nextTick, onMounted, ref, vModelCheckbox, watchEffect, type Ref } from 'vue';

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
const section_ref: Ref<HTMLElement | null> = ref(null);

const handle_input = (event: KeyboardEvent) => {
    console.log("Literal input key event");
    console.log(event);

    event.stopPropagation();
    event.stopImmediatePropagation();

    if (event.key === 'Escape' || event.key === 'Enter') {
        mode.current = 'navigating';
        nextTick(() => {
            input_ref.value?.blur();
            section_ref.value?.focus();
        });
    }
}

const edit_enabled = computed(() => {
    return selection.value === props.store && mode.current === 'editing';
});

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
            nextTick(() => {
                event.preventDefault();
                input_ref.value?.focus();
            });
        }
    } else if (mode.current === 'editing') {
        if (event.key === keyboard.edit.stop) {
            mode.current = 'navigating';
            nextTick(() => {
                input_ref.value?.blur();
                section_ref.value?.focus();
            });
        }
    }
}
</script>

<template>
    <section :class="classes" @keydown="keydown" :id="`node-${store.$id}`" tabindex="0" ref="section_ref">
        <header>Literal ({{ store.$id }})</header>

        <input :disabled="!edit_enabled" :type="value.value" ref="input_ref" v-model="store.value"
            @keydown="handle_input" />
    </section>
</template>