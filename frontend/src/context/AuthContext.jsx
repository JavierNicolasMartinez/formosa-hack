import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  errors: [],
  loading: true,
  signin: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export default AuthContext;
