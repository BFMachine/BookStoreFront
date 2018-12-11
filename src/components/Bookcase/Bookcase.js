import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import BookCard from "../BookCard/BookCard";
import { actionGetBooks } from "../../actions/actions";

const CaseWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

`;

class Bookcase extends React.Component {

  componentDidMount() {
    this.props.getBooks();
  }

  bookClickHandler = id => {
    this.props.history.push("/books/" + id);
  }

  render() {
    return (
      <CaseWrapper>
        <BookCard 
          id={1}
          title="Спящие красавицы" 
          author="Frank Miller"  
          description="Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla "
          price={5.65}
          rank="one"
          category="2"
          cover="images/file-1543589493775.jpg"
          bookClick={this.bookClickHandler}
        />
        <BookCard 
          id={2}
          title="Часовая битва" 
          author="Frank Miller"  
          description="Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla "
          price={5.65}
          rank="two"
          category="2"
          cover="images/file-1543589451407.jpg"
          bookClick={this.bookClickHandler}
        />
        <BookCard 
          id={3}
          title="ООчень длииинnnnnnnnnниое названне" 
          author="dsfdsf sdfdfasdf"  
          description="Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla "
          price={15.65}
          rank="three"
          category="2"
          cover="images/file-1543589387542.jpg"
          bookClick={this.bookClickHandler}
        />

        {this.props.books.map((item) => (
          <BookCard 
            id={item.id}
            key={item.id}
            title={item.title}
            author={item.author}
            price={item.price}
            rank={item.rank}
            cover={item.Files.filter(item => item.type === "cover" )[0].name}
            bookClick={this.bookClickHandler}
          />
        ))}

      </CaseWrapper>
    );    
  }
}

/* eslint-disable react/require-default-props */
Bookcase.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.number,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
    rank: PropTypes.string,
  })), 
  history: PropTypes.instanceOf(Object),
  getBooks: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
      books: state.books
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getBooks: () => {
          dispatch(actionGetBooks());
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookcase);
