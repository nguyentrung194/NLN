import React, { createContext, useReducer } from "react";
import { UserReducer, UserState } from "./user-context";

export const UserContext = createContext<UserState>({
  isLogin: false,
  name: '',
  time: null,
  email: '',
  images: [],
});

const initialState: UserState = {
  isLogin: false,
  name: '',
  time: null,
  email: '',
  images: [],
};

const UserContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const takePiture = (payload: any) => {
    dispatch({ type: "TAKE_PITURE", payload });
  };

  const login = (payload: any) => {
    dispatch({ type: "LOGIN", payload });
  };

  const register = (payload: any) => {
    dispatch({ type: "REGISTER", payload });
  };

  const logout = (payload: any) => {
    dispatch({ type: "LOGOUT", payload });
  };

  const contextValues = {
    takePiture,
    login,
    register,
    logout,
    ...state,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;