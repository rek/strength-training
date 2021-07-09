import * as React from "react";

import { GraphIcon, NavBar } from "../components/common";

export const Sidebar: React.FC = ({ children }) => {
  return (
    <NavBar
      title="-Strength Training and Tracking-"
      leftPages={[
        { name: "Home", icon: GraphIcon },
        { name: "Test", icon: GraphIcon },
      ]}
    >
      {children}
    </NavBar>
  );
};
