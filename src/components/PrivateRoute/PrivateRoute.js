import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ authorized, role, adminOnly, component: Component, render: renderProps, ...rest }) => {
  if(Component){

    if(!authorized){
      return (
        <Route 
          {...rest}
          render={(props) => 
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />}
        />
      );
    }

    if(adminOnly && role !== "admin") {
      return (
        <Route 
          {...rest}
          render={(props) => 
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />}
        />
      );
    }

    return (
      <Route 
        {...rest}
        render={(props) => <Component {...props} />}
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
    } 
    
    if(adminOnly && role !== "admin") {
      return (
        <Route 
          {...rest}
          render={(props) => 
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />}
        />
      );
    }
    
    return (
      <Route 
        {...rest}
        render={renderProps}
      />
    );
  } 

  console.error("error in PrivateRoute");
  return null;
};
  
export default connect(state=>({ 
  authorized: state.authentications.authorized,
  role: state.authentications.role
 }))(PrivateRoute);
