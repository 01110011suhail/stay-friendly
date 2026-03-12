import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (authData) => {
    sessionStorage.setItem("token", authData.accessToken);
    sessionStorage.setItem("refreshToken", authData.refreshToken);
    sessionStorage.setItem("user", JSON.stringify(authData.user || {}));
    setUser(authData.user || {});
  };

  const logoutUser = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);