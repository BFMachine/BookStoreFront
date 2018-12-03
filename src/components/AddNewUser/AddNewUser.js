import React from 'react';
import "./AddNewUser.scss";

export default class AddNewUser extends React.Component {
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

    render() {
        return (
            <form className="add-new-user__form" onSubmit={this.handleOnSubmit}>
                {/*<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/150px-HTML5_logo_and_wordmark.svg.png" width="70px" />*/}
                <p>Регистрация:</p>

                <label>
                    <span>Имя</span>
                    <input type="text" className="add-new-user__form_input_text" placeholder="Ф.И.О пользователя" 
                            name="userName" autoComplete="off"
                            value={this.state.userName}
                            onChange={this.onChangeNameHandle}/>
                </label>

                <label>
                    <span>Email</span>
                    <input type="text" className="add-new-user__form_input_text" placeholder="логин для авторизации" 
                            name="userName" autoComplete="off"
                            value={this.state.userName}
                            onChange={this.onChangeNameHandle}/>
                </label>

                <label>
                    <span>Пароль</span>
                    <input type="password" className="add-new-user__form_input_text" placeholder="не менее 6 символов" 
                            name="userName" autoComplete="off"
                            value={this.state.userName}
                            onChange={this.onChangeNameHandle}/>
                </label>

                <label>
                    <span>Адрес доставки</span>
                    <input type="text" className="add-new-user__form_input_text" placeholder="полный адрес с почтовым индексом" 
                            name="userName" autoComplete="off"
                            value={this.state.userName}
                            onChange={this.onChangeNameHandle}/>
                </label>

                <label>
                    <span>Телефон</span>
                    <input type="text" className="add-new-user__form_input_text" placeholder="в формате +7(ххх)ххх-хх-хх" 
                            name="userName" autoComplete="off"
                            value={this.state.userName}
                            onChange={this.onChangeNameHandle}/>
                </label>

                <button className="add-new-user__form_button" type="button">Создать аккаунт</button>


            </form>
        );       

    }

}