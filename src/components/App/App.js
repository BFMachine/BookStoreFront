import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from "../Login/Login";
import Header from "../Header/Header";
import AddNewUser from "../AddNewUser/AddNewUser";
import Cabinet from "../Cabinet/Cabinet";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Orders from "../Orders/Orders";
import InfoPage from "../InfoPage/InfoPage";
import Cart from "../Cart/Cart";
import Favorite from "../Favorite/Favorite";
import Bookcase from "../Bookcase/Bookcase";
import Book from "../Book/Book";
import BookEdit from "../BookEdit/BookEdit";
import Footer from "../Footer/Footer";

import './App.scss';

const App = () => {
  return (
    <div id="p1" className="app__page-wrapper">        
      <Header />

      <div className="app__content-wrapper">
        <Switch>
          <Route exact path="/" component={Bookcase} />
          <Route exact path="/login" component={Login} />
          <Route path="/login/new" component={AddNewUser} />
          <Route path="/books/:id" component={Book} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorite" component={Favorite} />
          <Route 
            path="/founderror"
            render={(props) => (
              <InfoPage {...props} message="Эта страница еще не реализована" />
            )} 
          />
          
          <PrivateRoute path="/cabinet" component={Cabinet} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/bookedit" component={BookEdit} adminOnly="true" />
          <PrivateRoute 
            path="/logout" 
            render={(props) => (
              <InfoPage {...props} message="Вы вышли из системы" />
            )} 
          />
        </Switch>
      </div>        

      <Footer />
    </div>
  );
};

export default App;
