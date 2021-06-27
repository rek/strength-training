import { createMachine } from "xstate";

export const trainingMachine = createMachine({
  id: "training",
  initial: "inactive",
  states: {
    inactive: {
      on: { NEXT: "running", ERROR: "inactive" },
    },
    running: {
      on: { NEXT: "hasRun", ERROR: "inactive" },
    },
    hasRun: {
      on: { NEXT: "inactive" },
    },
  },
});
