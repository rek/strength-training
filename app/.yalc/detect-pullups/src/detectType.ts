// not so important i think now

export const detectType = (log: any, pullups: any) => {
  let type = "Unknown";
  if (pullups.algo1.count > 0 && pullups.algo2.count > 0) {
    type = "pullup";
  }
  if (type !== "pullup") {
    if (log.length > 20) {
      type = "weight";
    }
  }
  return type;
};
