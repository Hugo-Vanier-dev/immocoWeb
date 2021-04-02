import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UseUserContext } from "../context/userContext";

function PrivateRoute({ children, ...rest }) {
    const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return(<Route {...rest} >{ children }</Route>);
  } else {
    return (
      <Route {...rest} 
      children={({location}) => (
        <Redirect
            to={{
                pathname: "/login",
                //state: { from: location },
            }}
            />
      )} />
    );
  }
}

export default PrivateRoute;
