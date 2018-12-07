import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';

import Login from "../Login/Login";
import Header from "../Header/Header";
import AddNewUser from "../AddNewUser/AddNewUser";
import Cabinet from "../Cabinet/Cabinet";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Orders from "../Orders/Orders";
import InfoPage from "../InfoPage/InfoPage";
import Cart from "../Cart/Cart";
import Favorite from "../Favorite/Favorite";


/* eslint-disable */

class App extends Component {
  render() {
    return (
      <div id="p1" className="App__div-page-wrapper">        
        
        <Header />

        <div className="App__div-content-wrapper">

          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/login/new" component={AddNewUser}/>
            <PrivateRoute path="/cabinet" component={Cabinet} />
            <PrivateRoute path="/orders" component={Orders} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/favorite" component={Favorite} />

            <PrivateRoute path="/logout" 
              render={(props) => (
                <InfoPage {...props} message="Вы вышли из системы" />
              )} 
            />
            
          </Switch>

        </div>

        <footer className="App__div-footer-wrapper">
          <div className="App__div-footer">
            <div className="App__div-footer-item">
              <span>О нас</span>
              <a href="#p1">Пресса</a>
              <a href="#p1">Реквизиты</a>
              <a href="#p1">О компании</a>
            </div>
            <div className="App__div-footer-item">
              <span>Помощь</span>
              <a href="#p1">Как сделать заказ</a>
              <a href="#p1">Доставка</a>
              <a href="#p1">Оплата</a>
              <a href="#p1">Контакты</a>
            </div>
            <div className="App__div-footer-item">
              <span>Юридическим лицам</span>
              <a href="#p1">Покупка книг</a>
              <a href="#p1">Подарочные сертификаты</a>
              <a href="#p1">Сотрудничество</a>
            </div>
            <div className="App__div-footer-item">
              <span>+9 999 999-99-99 - круглосуточно</span>
              <a href="#p1">&copy;2018-OOO "Telecom"</a>
              <a href="#p1">Подарочные сертификаты</a>
            </div>
          </div>
        </footer>

      </div>
    );
  }
}
/* eslint-enable */
export default App;
