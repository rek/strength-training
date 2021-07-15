export interface Activity {
  id?: string; // no id before create
  user: string;
  weight: string;
  movement: string;
  implement: string;
}

export interface ActivityHydrayed extends Activity {
  implementName: string;
  weightName: string;
  movementName: string;
}

export type Activities = Activity[];

export interface RawActivity {
  name?: string;
  fields?: {
    user?: {
      stringValue: string;
    };
    movement?: {
      stringValue: string;
    };
    implement?: {
      stringValue: string;
    };
    weight?: {
      stringValue: string;
    };
  };
}
