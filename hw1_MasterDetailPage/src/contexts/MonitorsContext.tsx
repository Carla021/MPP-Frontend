import { createContext } from "react";

import {
  MonitorsContextType,
  ProviderType,
} from "../types/MonitorsContextTypes.types";

export const MonitorsContext = createContext<MonitorsContextType | null>(null);

function MonitorsContextProvider({ monitorContext, children }: ProviderType) {
  return (
    <MonitorsContext.Provider value={monitorContext}>
      {children}
    </MonitorsContext.Provider>
  );
}

export { MonitorsContextProvider };
