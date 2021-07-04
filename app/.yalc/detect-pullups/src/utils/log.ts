const logLevel = process.env.LOG || 2;

export const logInfo = (...rest: any) => {
  console.log(...rest);
};

export const logWarn = (...rest: any) => {
  console.log(...rest);
};

export const logDebug = (...rest: any) => {
  if (logLevel > 2) {
    console.log(...rest);
  }
};
