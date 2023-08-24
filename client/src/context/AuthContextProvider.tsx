import { ReactNode, createContext, useState } from "react";
import { authInterface } from "../interfaces/authContext";

interface authContext {
  auth: authInterface | null;
  setAuth: (x: authInterface | null) => void;
}

export const AuthContext = createContext({} as authContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<authInterface | null>({} as authInterface);

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
