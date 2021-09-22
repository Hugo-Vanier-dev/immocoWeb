import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
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
