import React from "react";

const AuthGlobalContext = React.createContext({
  stateUser: { isAuthenticated: null, user: {} },
  dispatch: () => {}
});

export default AuthGlobalContext;
