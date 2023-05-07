<script setup lang="ts">
const props = defineProps<{
    value: string;
}>();
</script>

<template>
    <span class="node">{{ props.value }}</span>
</template>
