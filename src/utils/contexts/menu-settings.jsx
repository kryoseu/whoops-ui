"use client";

import { createContext, useState } from "react";

export const MenuSettingsContext = createContext(null);

export function MenuSettingsProvider({ children }) {
  const [selectedSection, setSelectedSection] = useState(["Cycles"]);
  const [selectedCustomDashboard, setSelectedCustomDashboard] = useState(null);
  const [range, setRange] = useState("7d");

  return (
    <MenuSettingsContext.Provider
      value={{
        selectedSection,
        setSelectedSection,
        selectedCustomDashboard,
        setSelectedCustomDashboard,
        range,
        setRange,
      }}
    >
      {children}
    </MenuSettingsContext.Provider>
  );
}
