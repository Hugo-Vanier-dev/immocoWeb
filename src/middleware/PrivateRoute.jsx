import React from "react";
import { BrowserRouter as Redirect, Route } from "react-router-dom";
import { UseUserContext } from "../context/userContext";

function PrivateRoute({ children, ...rest }) {
  let user = UseUserContext();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
