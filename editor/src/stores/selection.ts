import { defineStore } from "pinia";
import { ref } from "vue";
import { useNodeStore } from "./node";

export const useSelection = defineStore("selection", () => {
  const selected = ref("root");

  const move_selection = (direction: "in" | "out" | "up" | "down") => {
    const tree = useNodeStore(selected.value);

    if (direction === "in" && tree.children.length > 0) {
      selected.value = tree.children[0];
    } else if (direction === "out") {
      selected.value = tree.parent ?? "root";
    } else if (direction === "down") {
      selected.value = tree.next_sibling ?? selected.value;
    } else if (direction === "up") {
      selected.value = tree.previous_sibling ?? selected.value;
    }
  };

  return {
    value: selected,
    move: move_selection,
  };
});
