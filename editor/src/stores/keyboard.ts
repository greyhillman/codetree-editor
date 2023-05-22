import { defineStore } from "pinia";
import { ref } from "vue";

export const useKeyboard = defineStore("keyboard", () => {
  return {
    move: {
      next: ref("j"),
      prev: ref("k"),
      in: ref("l"),
      out: ref("h"),
    },
    edit: {
      start: ref("e"),
      stop: ref("Escape"),
    },
  };
});
