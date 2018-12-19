import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import PopupMenu from "../PopupMenu/PopupMenu";
import { actionLogoutUser, actionSetFilterCategory, actionSetPageCurrent, CATEGORY_ALL, 
  CATEGORY_CLASSIC, CATEGORY_FANTASY, CATEGORY_ADVENTURE, CATEGORY_DETECTIVE,
  CATEGORY_FICTION, CATEGORY_SCIENTIFIC, CATEGORY_CHILDREN, actionGetBooks
 } from "../../actions/actions";
import "./Header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuTimer: 0,
      menuVisible: false
    };
  }

  onClickPopupMenuHandler = () => {

    if(this.state.menuTimer) {
      clearTimeout(this.state.menuTimer);
    }

    this.setState({
      menuTimer: 0,
      menuVisible: true
    });
  }

  onMouseEnterHandler = () => {

    if(!this.state.menuTimer) { 
      this.setState({
        menuTimer: setTimeout(()=>{
          let self = this;
          self.setState({
            menuTimer: 0,
            menuVisible: true
          });
        }, 400)
      });
    }
  }

  onMouseLeaveHandler = (e) => {
    // eslint-disable-next-line
    if(this.state.menuVisible && e.target == this) {
      return;
    }

    if(this.state.menuTimer) {
        clearTimeout(this.state.menuTimer);
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

  setCategoryFilter = (filter) => {
    this.props.setFilter(filter);
  }

  render() {
    const { name, authorized, logoutUser, role } = this.props;
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

          <Link className="Header__div-logo" to='/' />  

          <div className="Header__div-search-bar">
            <input type="text" maxLength="255" autoComplete="off" placeholder="Выбирайте..." />
            <button type="submit" className="Header__div-search-button">
              <div className="Header__div-search-bar_icon" />
            </button>
          </div>

          <div className="Header__div-user-menu">
            <div
              className="header__menu-popup" 
              onMouseLeave={this.onMouseLeaveHandler}
              onMouseEnter={this.onMouseEnterHandler}
              onClick={this.onClickPopupMenuHandler}
            >
              {/*<Link className="Header__div-menu-item" to='/login'>*/}
              <div className="Header__div-menu-item">
                <div className="Header__div-icon-cabinet" />
                {authorized ? name.match(/^\S+@/i) : "Профиль"}
              </div>
              {/*</Link>*/}
              {<PopupMenu
                mouseLeave={this.onMouseLeaveHandler} 
                menuVisible={this.state.menuVisible} 
                authorized={authorized}
                logoutUser={logoutUser}
                role={role}
              />}
            </div>

            <Link className="Header__div-menu-item" to='/orders'>  
              <div className="Header__div-icon-order" />
              Заказы
            </Link>
            <Link className="Header__div-menu-item" to='/favorite'>  
              <div className="Header__div-icon-favorit" />
              Избранное
            </Link>
            <Link className="Header__div-menu-item" to='/cart'>
              <div className="Header__div-icon-chart" />
              Корзина
            </Link>
          </div>

        </div>
        <div className="Header__div-bottom"> 
          <span onClick={()=>this.setCategoryFilter(CATEGORY_ALL)}>Все</span>
          <span onClick={()=>this.setCategoryFilter(CATEGORY_CLASSIC)}>Классика</span>
          <span onClick={()=>this.setCategoryFilter(CATEGORY_FANTASY)}>Фэнтэзи</span>
          <span onClick={()=>this.setCategoryFilter(CATEGORY_ADVENTURE)}>Приключения</span>
          <span onClick={()=>this.setCategoryFilter(CATEGORY_DETECTIVE)}>Детектив</span>
          <span onClick={()=>this.setCategoryFilter(CATEGORY_FICTION)}>Фантастика</span>
          <span onClick={()=>this.setCategoryFilter(CATEGORY_SCIENTIFIC)}>Научная литература</span>
          <span onClick={()=>this.setCategoryFilter(CATEGORY_CHILDREN)}>Детская</span>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/require-default-props */
Header.propTypes = {
  name: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  role: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
  history:PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
Header.defaultProps = {
  name: ""
};

function mapStateToProps(state) {
    return { 
        name: state.authentications.email,
        authorized: state.authentications.authorized,
        role: state.authentications.role
    };
}

let mapDipatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(actionLogoutUser());
    },
    setFilter: (filter) => {
      dispatch(actionSetFilterCategory(filter));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    }

  };
};

export default connect (mapStateToProps, mapDipatchToProps)(Header);
