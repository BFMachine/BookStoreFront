import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Cabinet.scss";

function Cabinet({ address, authorized, email, full_name, id, phone, role }) {
  return (
    <div className="cabinet__wrap">

      <h3>Личный кабинет</h3>
      <hr />
      <h4>Персональные данные</h4>
      <table>
        <tbody>
          <tr>
            <td>
              Имя пользователя:
            </td>
            <td>
              {full_name}
            </td>
          </tr>
          <tr>
            <td>
              Email:
            </td>
            <td>
              {email}
            </td>
          </tr>
          <tr>
            <td>
              Роль:
            </td>
            <td>
              {role === "admin" ? "администратор" : "пользователь"}
            </td>
          </tr>
          <tr>
            <td>
              Телефон:
            </td>
            <td>
              {phone}
            </td>
          </tr>
          <tr>
            <td>
              Адрес:
            </td>
            <td>
              {address}
            </td>
          </tr>
        </tbody>
      </table>

      <hr />
      <h4>Заказы</h4>

      <hr />
      <h4>Корзина</h4>

      <hr />
      <h4>Комментарии</h4>
      <hr />
      <h4>Недавно просмотренные</h4>
      <hr />
    </div>
    );

}

/* eslint-disable react/require-default-props */
Cabinet.propTypes = {
  address: PropTypes.string,
  authorized: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  full_name: PropTypes.string,
  id: PropTypes.number.isRequired,
  phone: PropTypes.string,
  role: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {...state.authentications};
}

export default connect(mapStateToProps)(Cabinet);
