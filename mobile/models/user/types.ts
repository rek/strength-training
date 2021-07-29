export interface User {
  id?: string; // no id before create
  name: string;
  displayName?: string;
  weight: string;
  age?: number;
}

export interface RawUser {
  name?: string;
  fields?: {
    name?: {
      stringValue: string;
    };
    weight?: {
      integerValue: string;
    };
    age?: {
      integerValue: string;
    };
  };
}
