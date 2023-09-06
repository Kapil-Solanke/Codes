import { createContext, useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const value = {
    user,
    setUser,
    token,
    setToken,
  };

  return <AppContext.Provider  value={value}>
    {children}
  </AppContext.Provider>
}