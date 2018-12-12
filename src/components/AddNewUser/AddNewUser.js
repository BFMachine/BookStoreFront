import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./AddNewUser.scss";

import { actionCreateNewUser } from "../../actions/actions";

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

class AddNewUser extends React.Component {
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

    this.setState({
        userName: e.target.value    
    });
  }

  onChangePasswordHandle = (e) => {
    if(this._refInputPassword)
        this._refInputPassword.setCustomValidity("");

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
    const name = e.target["name"].value;
    const address = e.target["address"].value;
    const phone = e.target["phone"].value;

    this.props.createNewUser( 
      name, 
      this.state.userName, 
      this.state.userPassword, 
      address, 
      phone,
      (this.props.authorized && this.props.role === "admin") ? "admin" : "user"
    );

    this.props.history.push("/cabinet");
    e.preventDefault();
  }

  render() {
    return (
      <form 
        className="add-new-user__form" 
        onSubmit={this.onSubmitHandle}
      >
        <p>
          Регистрация
          {this.props.authorized && this.props.role === "admin" && " администратора"}
          :
        </p>

        <label>
          <span>Имя</span>
          <input  
            type="text"
            className="add-new-user__form_input_text"
            placeholder="Ф.И.О пользователя" 
            name="name"
            autoComplete="off"
            required
          />
        </label>

        <label>
          <span>Email</span>
          <input 
            type="text"
            className="add-new-user__form_input_text"
            placeholder="логин для авторизации" 
            name="email"
            autoComplete="off"
            required
            title="Введите email, например: temp@gmail.com"
            value={this.state.userName}
            ref={this.getInputNameRef}
            onChange={this.onChangeNameHandle} 
          />
        </label>

        <label>
          <span>Пароль</span>
          <input 
            type="password"
            className="add-new-user__form_input_text"
            placeholder="не менее 3 символов" 
            name="password"
            autoComplete="off"
            title="Введите пароль, не менее 3 символов"
            value={this.state.userPassword}
            ref={this.getInputPasswordRef}
            onChange={this.onChangePasswordHandle} 
          />
        </label>

        <label>
          <span>Адрес доставки</span>
          <input 
            type="text"
            className="add-new-user__form_input_text"
            placeholder="полный адрес с почтовым индексом" 
            name="address" 
          />
        </label>

        <label>
          <span>Телефон</span>
          <input 
            type="phone" 
            className="add-new-user__form_input_text" 
            placeholder="в формате +7(ххх)ххх-хх-хх" 
            name="phone"
          />
        </label>

        <button 
          className="add-new-user__form_button"
          type="submit"
          onClick={this.onSubmitButtonClick}
        >
          Создать аккаунт
        </button>
      </form>
    );       
  }
}

/* eslint-disable react/require-default-props */
AddNewUser.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object)
};

function mapStateToProps(state) {
  return {
    authorized: state.authentications.authorized,
    role:  state.authentications.role
  };
}

function mapDispatchToProps(dispatch) {
  return {
      createNewUser: ( name, email, password, address, phone, role = "user") => {
                          dispatch( actionCreateNewUser( name, email, password, address, phone, role ));
                      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser);
