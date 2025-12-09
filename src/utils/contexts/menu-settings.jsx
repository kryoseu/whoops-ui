"use client";

import { createContext, useState } from "react";

export const MenuSettingsContext = createContext(null);

export function MenuSettingsProvider({ children }) {
  const [range, setRange] = useState("7d");

  return (
    <MenuSettingsContext.Provider
      value={{
        range,
        setRange,
      }}
    >
      {children}
    </MenuSettingsContext.Provider>
  );
}
