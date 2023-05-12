import { defineStore } from "pinia";
import { Ref, ref } from "vue";

const MODES = Object.freeze({
  NAVIGATING: "navigating",
  EDITING: "editing",
});

type Modes = "navigating" | "editing";

export const useEditMode = defineStore("edit-mode", () => {
  const current: Ref<Modes> = ref(MODES.NAVIGATING);

  return {
    current,
  };
});
