import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createSelector } from "reselect";

import BookCard from "../BookCard/BookCard";
import FilterPanel from "./FilterPanel/FilterPanel";
import Pagination from "./Pagination/Pagination";
import { actionGetBooks, actionSetSearchString, actionSetSearchMode } from "../../actions/actions";

const MainWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const CaseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  //justify-content: space-around;
`;

const getCoversToBook = createSelector(
  [state => state.books],
  (books) => {

    if(!books) {
      return null;
    }
    return books.map((item)=>(item.Files.filter(itemFile => itemFile.type === "cover")[0].name));
  }
);


class Bookcase extends React.Component {
  
  componentDidMount() {

    if(this.props.location.search) {
      this.props.setSearch(true, this.props.location.search);  

    } else{
      this.props.setSearch(false, "");  
    }
   
    this.props.getBooks();
  }

  componentDidUpdate (prevProps) {
    
    if(prevProps.location.pathname !== this.props.location.pathname || 
      prevProps.location.search !== this.props.location.search ) {

      if(this.props.location.search) {
        this.props.setSearch(true, this.props.location.search);  

      } else {
        this.props.setSearch(false, "");  
      }
      
      this.props.getBooks();
    }
  }

  bookClickHandler = id => {
    this.props.history.push("/books/" + id);
  }

  render() {
    return (
      <MainWrapper>
        <FilterPanel />

        <CaseWrapper>
          {this.props.books.map((item, index) => (
            <BookCard 
              id={item.id}
              key={item.id}
              title={item.title}
              author={item.author}
              price={item.price}
              rank={item.rank}
              cover={this.props.covers[index]}
              bookClick={this.bookClickHandler}
            />
          ))}
        </CaseWrapper>

        <Pagination />
      </MainWrapper>
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
  setSearch: PropTypes.func.isRequired,
  covers: PropTypes.arrayOf(PropTypes.string),
  location: (PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }))
};

function mapStateToProps(state) {
  return {
      books: state.books,
      covers: getCoversToBook(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getBooks: () => {
          dispatch(actionGetBooks());
      },
      setSearch: (search, string) => {
        dispatch(actionSetSearchMode(search));
        dispatch(actionSetSearchString(string));
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookcase);
