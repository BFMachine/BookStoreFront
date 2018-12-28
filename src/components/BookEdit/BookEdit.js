import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Bookedit.scss";

import { actionCreateNewBook } from "../../actions/actions";

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

class BookEdit extends React.Component {
  
  onSubmitHandle = (e) => {
    this.props.createNewBook(
      e.target["title"].value,
      e.target["author"].value,
      e.target["description"].value,
      e.target["price"].value, 
      e.target["rank"].value, 
      e.target["category"].value, 
      e.target["cover-file"].files, 
      e.target["fragment-file"].files
    );
          
    e.preventDefault();
    this.props.history.push("/");
  }

  render() {
    return (
      <form 
        className="book-edit__form" 
        onSubmit={this.onSubmitHandle}
      >
        <p>
          Изменения книги
        </p>

        <label>
          <span>Наименование</span>
          <input  
            type="text"
            className="book-edit__form_input_text"
            placeholder="введите наименование произведения" 
            name="title"
            autoComplete="off"
            required
          />
        </label>

        <label>
          <span>Автор</span>
          <input 
            type="text"
            className="book-edit__form_input_text"
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
            className="book-edit__form_input_text"
            placeholder="описание книги" 
            name="description"
            autoComplete="off"
            title="введите описание книги"
          />
        </label>

        <div className="book-edit__form-input-wraper">
          <label className="book-edit__form-third">
            <span>Цена</span>
            <input 
              type="number"
              min="1"
              className="book-edit__form_input_text"
              placeholder="цена в рублях" 
              name="price" 
              required
            />
          </label>

          <label className="book-edit__form-third">
            <span>Рейтинг</span>
            <select 
              className="book-edit__form_input_text" 
              name="rank"
              defaultValue="five"
            >
              <option value="one">1</option>
              <option value="two">2</option>
              <option value="three">3</option>
              <option value="four">4</option>
              <option value="five">5</option>
            </select>

          </label>
          
          <label className="book-edit__form-third">
            <span>Жанр</span>
            <select 
              className="book-edit__form_input_text" 
              name="category"
              defaultValue="1"
            >
              <option value="1">Классика</option>
              <option value="2">Фэнтэзи</option>
              <option value="3">Приключения</option>
              <option value="4">Детектив</option>
              <option value="5">Фантастика</option>
              <option value="6">Научная литература</option>
              <option value="7">Детская</option>
            </select>

          </label>
        </div>

        <label>
          <span>Файлы обложки</span>
          <input 
            type="file" 
            className="book-edit__form_input_text" 
            name="cover-file"
            multiple
          />
        </label>

        <label>
          <span>Файл фрагмента</span>
          <input 
            type="file" 
            className="book-edit__form_input_text" 
            name="fragment-file"
          />
        </label>
        
        <button 
          className="book-edit__form_button"
          type="submit"
        >
          Сохранить изменения
        </button>
      </form>
    );       
  }
}

/* eslint-disable react/require-default-props */
BookEdit.propTypes = {
    createNewBook: PropTypes.func.isRequired,
    history: PropTypes.instanceOf(Object)
};

function mapDispatchToProps(dispatch) {
  return {
    createNewBook: (title, author, description, price, rank, category, coverFile, fragmentFile) => {
      dispatch( actionCreateNewBook(title, author, description, price, rank, category, coverFile, fragmentFile));
    }
  };
}

export default connect(null, mapDispatchToProps)(BookEdit);
