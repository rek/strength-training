import { Log } from "../types/types";

export const generateScore = (log: Log) => {
  // =FIXED((B14*D14/E14*M5)+(B14*C14)-(A14/B14*C14/M7), 0)

  /*

  Base multiplier	 = 100
  Speed multiplier = 80

  Base             =  Implement Weight * Average Rep Acceleration / Body Weight * Base multiplier
  Volume           =  Implement Weight * Total Rep count
  Speed Penalty	   =  Duration Milliseconds / Volume / Speed multiplier

  Score            =  Base + Volume - Speed Penalty

  */

  return {
    total: 10,
    base: 5,
    volume: 6,
    speed: 1,
  };
};
