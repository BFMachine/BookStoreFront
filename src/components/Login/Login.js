import React from "react";
import { connect } from "react-redux";
import "./Login.scss";
import { actionInitialLoadToken } from "../../actions/actions";


class Login extends React.Component {
    constructor(){
        super();

        this.state = {
            userName: "",
            userPassword: ""
        }
    }

    onChangeNameHandle = (e) => {
        this.setState({
            userName: e.target.value    
        })
    }

    onChangePasswordHandle = (e) => {
        this.setState({
            userPassword: e.target.value
        })
    }

    onClickNewUser = (e) => {
        this.props.initLoadToken();
    }

    render() {
        return (
            <form className="login__form" onSubmit={this.handleOnSubmit}>
                {/*<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/150px-HTML5_logo_and_wordmark.svg.png" width="70px" />*/}
                <p>Авторизируйтесь:</p>
                <input type="text" className="login__form_input_name" placeholder="имя пользователя (e-mail)" 
                        name="userName" autoComplete="off"
                        value={this.state.userName}
                        onChange={this.onChangeNameHandle}/>
                <input type="password" className="login__form_input_password" placeholder="пароль" 
                        name="userPassword" autoComplete="off"
                        value={this.state.userPassword}
                        onChange={this.onChangePasswordHandle}/> 
    
                    {/*this.props.deny && <p className="login__form_p_deny">Неверное имя или пароль</p>*/}    
                    <button className="login__form_button" type="submit">Вход</button>

                <div className="login__div-break-line">
                <h5>еще не зарегистрированы?</h5>
                </div>

                <button className="login__form_button" type="button" onClick={this.onClickNewUser}>Создать аккаунт</button>


            </form>
        );       

    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        initLoadToken: ()=>{
            dispatch( actionInitialLoadToken() );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);