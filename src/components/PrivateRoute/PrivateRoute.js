import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ authorized, component: Component, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={(props) => authorized 
          ? <Component {...props} /> 
          : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }
    />
  );
};
  
export default connect(state=>({ authorized: state.authentications.authorized }))(PrivateRoute);
