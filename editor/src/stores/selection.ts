import { defineStore } from "pinia";
import { ref, watch, watchEffect } from "vue";
import { useNodeStore } from "./node";

export const useSelection = defineStore("selection", () => {
  const selected = ref("root");

  watchEffect(() => {
    const element = document.getElementById(`node-${selected.value}`);
    element?.focus();

    console.log("Selection changed");
    console.log(element);
  });

  const move_selection = (direction: "in" | "out" | "next" | "prev") => {
    const tree = useNodeStore(selected.value);

    if (direction === "in" && tree.children.length > 0) {
      console.log(tree.children);
      selected.value = tree.children[0];
    } else if (direction === "out") {
      selected.value = tree.parent ?? "root";
    } else if (direction === "next") {
      selected.value = tree.next_sibling ?? selected.value;
    } else if (direction === "prev") {
      selected.value = tree.previous_sibling ?? selected.value;
    }
  };

  return {
    value: selected,
    move: move_selection,
  };
});
