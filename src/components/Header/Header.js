import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import PopupMenu from "../PopupMenu/PopupMenu";
import "./Header.scss";

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      menuTimer: 0,
      menuVisible: false
    };
  }

  
//({ name, authorized }) {

  onMouseEnterHandler = (e) => {
    console.log(`in this.state.menuTimer ${this.state.menuTimer}`);

    if(!this.state.menuTimer) { 
      this.setState({
        menuTimer: setTimeout(()=>{
          let self = this;
          self.setState({
            menuTimer: 0,
            menuVisible: true
          });
          console.log("settimeout ended!!!");
          


        }, 1000)
      });
    }
  }

  onMouseLeaveHandler = (e) => {
    console.log(`out this.state.menuTimer ${this.state.menuTimer}`);

    /*    setTimeout(() => {
        let self = this;
        if(!self.state.menuTimer) {

        }
    }, 200); */
    if(this.state.menuVisible) {
        return;
    }

    const timer = this.state.menuTimer;
    if(timer) {
        clearTimeout(timer);
    }
    
    this.setState({
        menuTimer: 0,
        menuVisible: false
    });

  }

  menuVisibleOff = () => {
      this.setState({
        menuVisible: false
    });
  }


  render() {
      const { name, authorized } = this.props;
      console.log(this.state.menuVisible);
    return (
        <div className="Header__div-wrapper">
            <div className="Header__div-top-wrapper">
                <div className="Header__div-top">
                    <div className="Header__div-top_links">
                        <a href="#p1">Пункты выдачи</a>
                        <a href="#p1">Доставка</a>
                        <a href="#p1">Оплата</a>
                        <a href="#p1">Помощь</a>
                     </div>
                    <div className="Header__div-top_phone">
                        +7 999 999-99-99
                    </div>
                </div>
            </div>
            <div className="Header__div-middle">

                <div className="Header__div-logo" />
                
                <div className="Header__div-search-bar">
                    <input type="text" maxLength="255" autoComplete="off" placeholder="Выбирайте..."/>
                    <button type="submit" className="Header__div-search-button">
                        <div className="Header__div-search-bar_icon">
                        </div>
                    </button>
                </div>

              <div 
                className="Header__div-user-menu" 
                onMouseLeave={this.onMouseLeaveHandler}
                onMouseEnter={this.onMouseEnterHandler}
              >
                <Link className="Header__div-menu-item" to='/login'>
                  <div className="Header__div-icon-cabinet" />
                  {authorized ? name.match(/^\S+@/i) : "Профиль"}
                  {this.state.menuVisible && <PopupMenu menuVisibleOff={this.menuVisibleOff} 
                                                        menuVisible={this.state.menuVisible} />}
                </Link>

                

                <Link className="Header__div-menu-item" to='/orders'>  
                  <div className="Header__div-icon-order" />
                  Заказы
                </Link>
                <Link className="Header__div-menu-item" to='/cabinet'>
                  <div className="Header__div-icon-chart" />
                  Корзина
                </Link>
              </div>

            </div>
            <div className="Header__div-bottom">
                <a href="#p1">Классика</a>
                <a href="#p1">Фэнтэзи</a>
                <a href="#p1">Приключения</a>
                <a href="#p1">Детектив</a>
                <a href="#p1">Фантастика</a>
                <a href="#p1">Научная литература</a>
                <a href="#p1">Детская</a>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        name: state.authentications.email,
        authorized: state.authentications.authorized
    };
}

export default connect (mapStateToProps, null)(Header);
