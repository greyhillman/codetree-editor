import { grammars } from "@/grammar";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLanguage = defineStore("language", () => {
  const current = ref("json");
  const grammar = computed(() => grammars[current.value]);

  return {
    current,
    grammar,
  };
});
