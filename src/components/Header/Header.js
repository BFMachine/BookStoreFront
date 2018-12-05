import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import "./Header.scss";

function Header({ name, authorized }) {
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

                <div className="Header__div-user-menu">
                    <Link className="Header__div-menu-item" to='/login'>
                        <div className="Header__div-icon-cabinet" />
                        {authorized ? name.match(/^\S+@/i) : "Профиль"}
                    </Link>
                    <Link className="Header__div-menu-item" to='/login/new'>  
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

function mapStateToProps(state) {
    return { 
        name: state.authentications.email,
        authorized: state.authentications.authorized
    }
}

export default connect (mapStateToProps, null)(Header);