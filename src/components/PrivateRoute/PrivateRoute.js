import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ authorized, component: Component, render: renderProps, ...rest }) => {

  if(Component){
    return (
      <Route 
        {...rest}
        render={(props) => authorized 
            ? <Component {...props} /> 
            : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        }
      />
    );
    
  } else if (renderProps) {
    if(!authorized) {
      return (
        <Route 
          {...rest}
          render={(props) => 
            <Redirect to={{ pathname: "/login", state: { from: props.location }}} />
          }
        />
      );
    } else {
      return (
        <Route 
          {...rest}
          render={renderProps}
        />
      );
    }
  } 

  console.error("error in PrivateRoute");
  return null;
};
  
export default connect(state=>({ authorized: state.authentications.authorized }))(PrivateRoute);
