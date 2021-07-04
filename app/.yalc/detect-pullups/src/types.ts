export type Line = number[];

// export interface Pullup {
//   ascending: {
//     start: number;
//     end: number;
//   };
//   descending?: {
//     start: number;
//     end: number;
//   };
// }

export enum MarkerType {
  'start' = 'start',
  'peak' = 'peak',
  'dip' = 'dip',
}

export interface Marker {
  type: MarkerType;
  x: number;
}

export interface PullupReport {
  quailty?: number;
  confidence: number;
  force?: number;
  pressureChange?: number;
  markers?: Marker[];
}

export interface LogReport {
  pullupCount: number;
  items: PullupReport[];
}

export type ProcessedLog = { report: LogReport; weight: number };

export type XY = {
  x: number;
  y?: number;
};
