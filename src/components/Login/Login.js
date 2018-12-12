import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./Login.scss";

import { actionGetAuthentication, actionSetAuthenticationError } from "../../actions/actions";


class Login extends React.Component {
    constructor(){
        super();

        this.state = {
            userName: "",
            userPassword: ""
        };
    }

    onChangeNameHandle = (e) => {
        if(this._refInputName)
            this._refInputName.setCustomValidity("");

        if(this.props.message.length)
            this.props.clearResposeError();

        this.setState({
            userName: e.target.value    
        });
    }

    onChangePasswordHandle = (e) => {
        if(this._refInputPassword)
            this._refInputPassword.setCustomValidity("");

        if(this.props.message.length)
            this.props.clearResposeError();

        this.setState({
            userPassword: e.target.value
        });
    }

    getInputNameRef = (ref) => {
        this._refInputName = ref;
    }

    getInputPasswordRef = (ref) => {
        this._refInputPassword = ref;
    }

    onSubmitButtonClick = () => {
       // use onClick button event, set custom validity BEFORE!!! event submit because chrome bug
        if(this.state.userName.search(/^\S+@/i) === -1) {
            this._refInputName.setCustomValidity("email должен содержать символ \"@\"");
            return;
        }

        if(this.state.userName.search(/^\S+@\S+\./i) === -1) {
            this._refInputName.setCustomValidity("email должен содержать символ \".\"");
            return;
        }

        if(this.state.userName.search(/^\S+@\S+\.\S+$/i) === -1) {
            this._refInputName.setCustomValidity("Введите email по шаблону adress@domain.com");
            return;
        }
        
        if(this.state.userPassword.length < 3) {
            this._refInputPassword.setCustomValidity("Пароль должен содержать не менее 3 символов");
            return;
        }
    }

    onSubmitHandle = (e)=> {
        this.props.authentication(this.state.userName, this.state.userPassword);
        e.preventDefault();
    }

    onClickNewUserHandle = () => {
        this.props.history.push("/login/new");
    } 
    
    render() {

        if (this.props.authorized)
            return <Redirect to="/cabinet" />;

        return (
          <form 
            className="login__form"
            onSubmit={this.onSubmitHandle}
          >
            {/*<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/150px-HTML5_logo_and_wordmark.svg.png" width="70px" />*/}
            <p>Авторизируйтесь:</p>
            <input
              type="text"
              className="login__form_input_name"
              placeholder="имя пользователя (e-mail)" 
              name="userName"
              autoComplete="off"
              title="Введите email, например: temp@gmail.com"
              value={this.state.userName}
              ref={this.getInputNameRef}
              onChange={this.onChangeNameHandle} 
            />
            <input
              type="password"
              className="login__form_input_password"
              placeholder="пароль"
              name="userPassword"
              autoComplete="off"
              title="Введите пароль, не менее 3 символов"
              value={this.state.userPassword}
              ref={this.getInputPasswordRef}
              onChange={this.onChangePasswordHandle} 
            /> 
    
            <p className="login__form_deny">{this.props.message}</p>

            <button
              className="login__form_button"
              onClick={this.onSubmitButtonClick}
              type="submit"
            >
              Вход
            </button>

            <div className="login__div-break-line">
              <h5>еще не зарегистрированы?</h5>
            </div>

            <button
              className="login__form_button"
              type="button"
              onClick={this.onClickNewUserHandle}
            >
              Создать аккаунт
            </button>

          </form>  
        );       
    }
}

/* eslint-disable react/require-default-props */
Login.propTypes = {
    message: PropTypes.string,
    authorized: PropTypes.bool,
    authentication: PropTypes.func.isRequired,
    clearResposeError: PropTypes.func.isRequired,
    history: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
    return { 
        message: state.authentications.message,
        authorized: state.authentications.authorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authentication: (username, password)=>{
                            dispatch( actionGetAuthentication(username, password) );
                        },
        clearResposeError: () => {
                            dispatch( actionSetAuthenticationError("") );
                        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
