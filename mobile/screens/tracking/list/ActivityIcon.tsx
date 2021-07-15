import * as React from "react";

import { Icons } from "../../../components";

type Props = {
  name: string;
};
export const ActivityIcon: React.FC<Props> = ({ name }) => {
  if (name === "Kettlebell") {
    return <Icons.Kettlebell />;
  }

  if (name === "Dumbbell") {
    return <Icons.Dumbbell />;
  }

  if (name === "Barbell") {
    return <Icons.Dumbbell />;
  }

  return null;
};
