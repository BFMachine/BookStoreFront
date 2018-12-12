import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Bookedit.scss";

import { actionCreateNewUser } from "../../actions/actions";

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

class BookEdit extends React.Component {
  constructor(){
    super();
  } 

  render() {
    return (
      <form 
        className="add-new-user__form" 
        onSubmit={this.onSubmitHandle}
      >
        <p>
          Изменения книги
        </p>

        <label>
          <span>Наименование</span>
          <input  
            type="text"
            className="add-new-user__form_input_text"
            placeholder="введите наименование" 
            name="title"
            autoComplete="off"
            required
          />
        </label>

        <label>
          <span>Автор</span>
          <input 
            type="text"
            className="add-new-user__form_input_text"
            placeholder="введите автора произведения" 
            name="author"
            autoComplete="off"
            required
          />
        </label>

        <label>
          <span>Описание</span>
          <textarea 
            rows="10" 
            cols="45" 
            className="add-new-user__form_input_text"
            placeholder="описание книги" 
            name="description"
            autoComplete="off"
            title="введите описание книги"
          />
        </label>

        <div className="book-edit__form-input-wraper">
          <label className="add-new-user__form-third">
            <span>Цена</span>
            <input 
              type="number"
              className="add-new-user__form_input_text"
              placeholder="цена издания в рублях" 
              name="price" 
            />
          </label>

          <label className="add-new-user__form-third">
            <span>Рейтинг</span>
            <input 
              type="text" 
              className="add-new-user__form_input_text" 
              placeholder="в формате +7(ххх)ххх-хх-хх" 
              name="rank"
            />
          </label>
          
          <label className="add-new-user__form-third">
            <span>Жанр</span>
            <input 
              type="text" 
              className="add-new-user__form_input_text" 
              placeholder="в формате +7(ххх)ххх-хх-хх" 
              name="category"
            />
          </label>
        </div>

        <label>
            <span>Файл обложки</span>
            <input 
              type="file" 
              className="add-new-user__form_input_text" 
              placeholder="в формате +7(ххх)ххх-хх-хх" 
              name="category"
            />
        </label>

        <label>
            <span>Файл фрагмента</span>
            <input 
              type="file" 
              className="add-new-user__form_input_text" 
              placeholder="в формате +7(ххх)ххх-хх-хх" 
              name="category"
            />
        </label>

          
        
        <button 
          className="add-new-user__form_button"
          type="submit"
          onClick={this.onSubmitButtonClick}
        >
          Сохранить изменения
        </button>
      </form>
    );       
  }
}

/* eslint-disable react/require-default-props */
/*
BookEdit.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object)
};
*/
function mapStateToProps(state) {
  return {
    authorized: state.authentications.authorized,
    role:  state.authentications.role
  };
}
/*
function mapDispatchToProps(dispatch) {
  return {
      createNewUser: ( name, email, password, address, phone, role = "user") => {
                          dispatch( actionCreateNewUser( name, email, password, address, phone, role ));
                      }
  };
}
*/
export default connect(mapStateToProps, null)(BookEdit);
