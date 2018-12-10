import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
//import moment from "moment";
//import PropTypes from "prop-types";
//import "moment/locale/ru";

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
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    //const { email, full_name, address, phone } = this.props.auth;

    return (
      <CaseWrapper>
        <BookCard 
          title="Спящие красавицы" 
          author="Frank Miller"  
          description="Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla "
          price={5.65}
          rank="one"
          category="2"
          cover="images/file-1543589493775.jpg"
        />
        <BookCard 
          title="Часовая битва" 
          author="Frank Miller"  
          description="Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla "
          price={5.65}
          rank="two"
          category="2"
          cover="images/file-1543589451407.jpg"
        />
        <BookCard 
          title="ООчень длииинnnnnnnnnниое названне" 
          author="dsfdsf sdfdfasdf"  
          description="Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla "
          price={15.65}
          rank="three"
          category="2"
          cover="images/file-1543589387542.jpg"
        />


        {this.props.books.map((item) => (
          <BookCard 
            key={item.id}
            title={item.title}
            author={item.author}
            price={item.price}
            rank={item.rank}
            cover={item.Files.filter(item => item.type === "cover" )[0].name}
          />
        ))}

      </CaseWrapper>
    );    
  }
}

/* eslint-disable react/require-default-props */
/*Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.number,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
    rank: PropTypes.string,
  })), 
  auth: PropTypes.shape({
    email: PropTypes.string,
    full_name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string
  }),
  getCart: PropTypes.func.isRequired,
};*/


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
