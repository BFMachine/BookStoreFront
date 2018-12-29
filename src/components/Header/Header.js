import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import PopupMenu from "../PopupMenu/PopupMenu";
import * as actions from "../../actions/actions"; 

import history from "../../modules/history";
import "./Header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.menuTimer = 0;

    this.state = {
      menuVisible: false
    };
  }

  onClickPopupMenuHandler = () => {
    if(this.menuTimer) {
      clearTimeout(this.menuTimer);
    }

    this.menuTimer = 0;
    this.setState({
      menuVisible: true
    });
  }

  onMouseEnterHandler = () => {
    if(!this.menuTimer) { 
      this.menuTimer = setTimeout(()=>{
          this.menuTimer = 0;
          this.setState({
            menuVisible: true
          });
      }, 400);
    }
  }

  onMouseLeaveHandler = (e) => {
    if(this.state.menuVisible && e.target === this) {
      return;
    }

    if(this.menuTimer) {
        clearTimeout(this.menuTimer);
    }
    
    this.menuTimer = 0;
    this.setState({
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

  onClickSearchHandler = (e) => {
    const search = e.target.children[0].value;

    e.preventDefault();
    e.target.children[0].value = "";

    if(search === "") {
      this.props.setSearchMode();
      history.push("/");
      return;
    }
    this.props.setSearchMode();
    history.push({
      pathname: "/search",
      search: `?text=${search}`
    });
    
  }

  render() {
    const { name, authorized, logoutUser, role } = this.props;
    return (
      <div className="header__wrapper">
        <div className="header__top-wrapper">
          <div className="header__top">
            <div className="header__top_links">
              <Link to="/founderror">
                Пункты выдачи
              </Link>
              <Link to="/founderror">
                Доставка
              </Link>
              <Link to="/founderror">
                Оплата
              </Link>
              <Link to="/founderror">
                Помощь
              </Link>
            </div>
            <div className="header__top_phone">
                +7 999 999-99-99
            </div>
          </div>
        </div>
        <div className="header__middle">
          <Link className="header__logo" to='/' />  
          <form 
            className="header__search-bar"
            onSubmit={this.onClickSearchHandler}
          >
            <input 
              type="text"
              maxLength="255"
              autoComplete="off"
              placeholder={this.props.search === "" ?
                "поиск..." : 
                "результат поиска " + decodeURIComponent(this.props.search.slice(6))
              } 
            />
            <button
              type="submit"
              className="header__search-button"
            />
          </form>

          <div className="header__user-menu">
            <div
              className="header__menu-popup" 
              onMouseLeave={this.onMouseLeaveHandler}
              onMouseEnter={this.onMouseEnterHandler}
              onClick={this.onClickPopupMenuHandler}
            >
              <div className="header__menu-item">
                <div className="header__icon-cabinet" />
                <span>
                  {authorized ? name.match(/^\S+@/i) : "Профиль"}
                </span>
              </div>
              {<PopupMenu
                mouseLeave={this.onMouseLeaveHandler} 
                menuVisible={this.state.menuVisible} 
                authorized={authorized}
                logoutUser={logoutUser}
                role={role}
              />}
            </div>

            <Link className="header__menu-item" to='/orders'>  
              <div className="header__icon-order" />
              <span>Заказы</span>
            </Link>
            <Link className="header__menu-item" to='/favorite'>  
              <div className="header__icon-favorit" />
              <span>Избранное</span>
            </Link>
            <Link className="header__menu-item" to='/cart'>
              <div className="header__icon-chart" />
              <span>Корзина</span>
            </Link>
          </div>

        </div>
        <div className="header__bottom"> 
          <span onClick={()=>this.setCategoryFilter(actions.CATEGORY_ALL)}>Все</span>
          <span onClick={()=>this.setCategoryFilter(actions.CATEGORY_CLASSIC)}>Классика</span>
          <span onClick={()=>this.setCategoryFilter(actions.CATEGORY_FANTASY)}>Фэнтэзи</span>
          <span onClick={()=>this.setCategoryFilter(actions.CATEGORY_ADVENTURE)}>Публицистика</span>
          <span onClick={()=>this.setCategoryFilter(actions.CATEGORY_DETECTIVE)}>Детектив</span>
          <span onClick={()=>this.setCategoryFilter(actions.CATEGORY_FICTION)}>Женские романы</span>
          <span onClick={()=>this.setCategoryFilter(actions.CATEGORY_SCIENTIFIC)}>Научная литература</span>
          <span onClick={()=>this.setCategoryFilter(actions.CATEGORY_CHILDREN)}>Детская</span>
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
  setSearchMode: PropTypes.func.isRequired,
  search: PropTypes.string,
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
        role: state.authentications.role,
        search: state.search.string
    };
}

let mapDipatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(actions.actionLogoutUser());
    },
    setFilter: (filter) => {
      dispatch(actions.actionSetFilterCategory(filter));
      dispatch(actions.actionSetPageCurrent(1));
      dispatch(actions.actionGetBooks());
    },
    setSearchMode : () => {
      dispatch(actions.actionSetPageCurrent(1));
    }
  };
};

export default connect (mapStateToProps, mapDipatchToProps)(Header);
