import { Grammar } from "@/grammar";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { grammar as json } from "../grammars/json";
import { grammar as clojure } from "../grammars/clojure";

const grammars = {
  json: json,
  clojure: clojure,
} as Record<string, Grammar>;

export const useLanguage = defineStore("language", () => {
  const current = ref("json");
  const grammar = computed(() => grammars[current.value]);

  return {
    current,
    grammar,
  };
});
