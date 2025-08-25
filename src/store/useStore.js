import { create } from "zustand";
import { temporal } from "zundo";

export const useStore = create(
    temporal(
      (set, get) => ({
        nodes: [],
        edges: [],
        setNodes: (nodes) => set({ nodes }),
        setEdges: (edges) => set({ edges }),
        undo: () => get().temporal.undo(),
        redo: () => get().temporal.redo(),
      }),
      {
        partialize: (state) => ({ nodes: state.nodes, edges: state.edges }),
      }
    )
  );
  