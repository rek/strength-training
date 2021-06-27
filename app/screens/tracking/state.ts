import { createMachine } from "xstate";

export const trainingMachine = createMachine({
  id: "training",
  initial: "inactive",
  states: {
    inactive: {
      on: { NEXT: "running" },
    },
    running: {
      on: { NEXT: "hasRun" },
    },
    hasRun: {
      on: { NEXT: "inactive" },
    },
  },
});
