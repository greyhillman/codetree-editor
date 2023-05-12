import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export interface LeafNode {
  value: string;
}

let id = 0;
function new_id(): string {
  return `${id++}`;
}

export const useNodeStore = (id: string) =>
  defineStore(id, () => {
    const value = ref("");

    const parent: Ref<string | null> = ref(null);
    const previous_sibling: Ref<string | null> = ref(null);
    const next_sibling: Ref<string | null> = ref(null);

    const children: Ref<string[]> = ref([]);

    function add_child() {
      const store = useNodeStore(new_id());

      store.parent = id;

      const prev_sibling =
        children.value.length > 0
          ? children.value[children.value.length - 1]
          : null;

      if (prev_sibling) {
        const sibling = useNodeStore(prev_sibling);
        sibling.next_sibling = store.$id;
        store.previous_sibling = prev_sibling;
      }

      children.value.push(store.$id);

      return store;
    }

    function remove_child(index: number) {
      children.value.splice(index, 1);
    }

    return {
      value,
      previous_sibling,
      next_sibling,
      parent,
      children,
      add_child,
      remove_child,
    };
  })();

export type NodeStore = ReturnType<typeof useNodeStore>;
