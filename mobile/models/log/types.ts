export interface Rep {
  averageAccel: number;
  peakAccel: number;
  durationMillis: number;
}

export interface Log {
  rawData: number[];
  bodyWeight: number;
  timestamp: number;
  durationMillis: number;

  calculated?: {
    reps: Rep[];
  };
}
