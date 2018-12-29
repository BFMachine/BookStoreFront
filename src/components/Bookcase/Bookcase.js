import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createSelector } from "reselect";

import BookCard from "../BookCard/BookCard";
import FilterPanel from "./FilterPanel/FilterPanel";
import Pagination from "./Pagination/Pagination";
import { actionGetBooks, actionSetSearchString, actionSetSearchMode, 
         actionSetPageLazy } from "../../actions/actions";

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
  constructor(props) {
    super(props);

    this.state = {
      loadBookInLazyMode: 0
    };
  }
  
  componentDidMount() {
    if(this.props.location.search) {
      this.props.setSearch(true, this.props.location.search);  

    } else{
      this.props.setSearch(false, "");  
    }

    this.props.getBooks();
    this.caseWrapperResizeHandler();
    window.addEventListener("resize", this.caseWrapperResizeHandler);
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.caseWrapperResizeHandler);
  }

  bookClickHandler = id => {
    this.props.history.push("/books/" + id);
  }

  getCaseWrapperRef = (ref) => {
    this._refCaseWrapper = ref;
  }


  //debouncer ??? no
  caseWrapperResizeHandler = (e) => {
    //if(document.body.clientWidth < 480) {
    //console.log(`resize ${document.body.clientWidth} ${e}`);
    if(document.body.clientWidth <= 480 && !this.props.lazy) {
      this.props.setLazyPageMode(true);
    }

    if(document.body.clientWidth > 480 && this.props.lazy) {
      this.props.setLazyPageMode(false);
    }


  }


  renderBooks = () => {
    if(!this.props.lazy) {
      return ( 
        this.props.books.map((item, index) => (
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
        )));
    }

    
    if(this.props.lazy) {

      if(this.state.loadBookInLazyMode === 0) {
        let f = () => {
          setTimeout(() => {
          if(this.state.loadBookInLazyMode < this.props.books.length) {
            this.setState((state)=>{
              return {
                loadBookInLazyMode: state.loadBookInLazyMode + 1
              };
            });

          }
        });
      };

      
      }
        

      return ( 
        this.props.books.map((item, index) => (
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
        )));
    }
  }

  /*
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
          */

  render() {
    return (
      <MainWrapper>
        <FilterPanel />

        <CaseWrapper ref={this.getCaseWrapperRef}>
          {this.renderBooks()}  
        </CaseWrapper>

        {!this.props.lazy && <Pagination />}
        

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
    description: PropTypes.string,
    price: PropTypes.number,
    rank: PropTypes.string,
  })), 
  history: PropTypes.instanceOf(Object),
  getBooks: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setLazyPageMode: PropTypes.func.isRequired,
  covers: PropTypes.arrayOf(PropTypes.string),
  lazy: PropTypes.bool,
  location: (PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }))
};

function mapStateToProps(state) {
  return {
      books: state.books,
      covers: getCoversToBook(state),
      lazy: state.pages.lazy
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
      },
      setLazyPageMode: (mode) => {
        console.log(`lazy page mode ${mode}`);
        dispatch(actionSetPageLazy(mode));
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookcase);
