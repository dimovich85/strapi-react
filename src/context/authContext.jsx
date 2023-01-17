import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const onAuth = (jwt, user = {}) => {
    setToken(jwt);
    setUser(user);
  };
  return (
    <AuthContext.Provider value={{ token, user, onAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
