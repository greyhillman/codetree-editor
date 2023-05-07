import { defineStore } from "pinia";
import { ref } from "vue";
import { useNodeStore } from "./node";

const MODES = Object.freeze({
  NAVIGATING: "navigating",
  EDITING: "editing",
});

export const useInputStore = defineStore("input", () => {
  const selected = ref("root");
  const mode = ref(MODES.NAVIGATING);

  const move_selection = (direction: "in" | "out" | "up" | "down") => {
    const tree = useNodeStore(selected.value);

    console.log(direction);
    console.log(selected.value);

    if (direction === "in" && tree.children.length > 0) {
      selected.value = tree.children[0];
    } else if (direction === "out") {
      selected.value = tree.parent ?? "root";
    } else if (direction === "down") {
      selected.value = tree.next_sibling ?? selected.value;
    } else if (direction === "up") {
      selected.value = tree.previous_sibling ?? selected.value;
    }

    console.log(selected.value);
  };

  const key_down = (event: KeyboardEvent) => {
    if (mode.value === MODES.NAVIGATING) {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          move_selection("out");
        } else {
          move_selection("in");
        }
      } else if (event.key === "Enter") {
        if (event.shiftKey) {
          move_selection("up");
        } else {
          move_selection("down");
        }
      }

      if (event.key === "j") {
        move_selection("down");
      } else if (event.key === "k") {
        move_selection("up");
      } else if (event.key === "l") {
        move_selection("in");
      } else if (event.key === "h") {
        move_selection("out");
      }

      if (event.key === ";") {
        move_selection("down");
      } else if (event.key === ":") {
        move_selection("up");
      } else if (event.key === "(") {
        move_selection("in");
      } else if (event.key === ")") {
        move_selection("out");
      }

      const tree = useNodeStore(selected.value);

      if (event.key === "a") {
        tree.add_child();
      }
    }
  };

  return {
    selected,
    mode,
    key_down,
  };
});
