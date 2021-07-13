import { createMachine } from "xstate";

export const trainingMachine = createMachine({
  id: "training",
  initial: "noDevice",
  states: {
    noDevice: {
      on: { NEXT: "unCalibrated" },
    },
    unCalibrated: {
      on: { NEXT: "ready", ERROR: "noDevice" },
    },
    ready: {
      on: { NEXT: "running", ERROR: "noDevice" },
    },
    running: {
      on: { NEXT: "hasRun", ERROR: "ready" },
    },
    hasRun: {
      on: { NEXT: "ready" },
    },
  },
});
