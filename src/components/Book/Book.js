import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Covers from "./Covers/Covers";
import { actionGetBooks, actionAddToCart, actionAddToCartOnServer } from "../../actions/actions";

const BookWrap = styled.div`
    //min-width: 140px;
    //max-width: 180px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`;

const BaseInfo = styled.div `
  flex: 1 1 auto;
`;

const Panel = styled.div `
  padding-left: 20px;

  > h1 {
    font-family: 'Museo',Arial,Helvetica,sans-serif;
    font-weight: 500;
    font-size: 30px;
    color: #000;
    line-height: 32px;
    letter-spacing: .01em;
    margin-bottom: 13px;
    min-width: 100px;
  }

  span {
    cursor: pointer;
    display: inline-block;
    color: #256aa1;
    text-decoration: none;
    vertical-align: middle;
    margin-left: 16px;
  }
`;

const ToolPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ececec;
`;

const FavoriteIcon = styled.div`
  margin-left: 16px;
  width:14px;
  height:12px;
  top:2px;
  background-image:url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http%3A//www.w3.org/2000/svg' viewBox='-9 11 14 12'%3E%3Cstyle%3E.st0%7Bfill:%23999999;%7D%3C/style%3E%3Cpath class='st0' d='M-7.4 14.9c0-1.7 1.2-2.4 2.2-2.4 1.7 0 3.2 2.3 3.2 2.3s1.6-2.3 3.3-2.3c1 0 2.2.6 2.2 2.4 0 2.1-2.3 4.8-5.4 6.5-3.2-1.7-5.5-4.5-5.5-6.5zM1.3 11c-1.9 0-2.6.8-3.3 1.7-.7-.9-1.4-1.7-3.3-1.7-1.8 0-3.7 1.3-3.7 3.9 0 3 3.3 6.4 7 8.1 3.7-1.7 7-5.1 7-8.1C5 12.3 3.1 11 1.3 11z'/%3E%3C/svg%3E");
  cursor: pointer;
`;

const ContentColumn = styled.div`
  margin-bottom: 24px;
  padding-left: 20px;
  position: relative;
  font-size: 12px;
  white-space: nowrap;
  order: 0;
  flex: 1 1 auto;
  align-self: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SaleBlock = styled.div`
  width: 258px;
  margin: 25px 0 0 -258px;
  
  vertical-align: top;
  white-space: normal;
  
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
`;

const Price = styled.div`
  margin: 20px 20px 0 30px;
  padding-top: 6px;
  margin-bottom: 16px;
  padding-left: 0;
 
  font-family: 'MuseoSans',Arial,Verdana,sans-serif;
  font-size: 2.25rem;
  line-height: normal;
`;

const SaleButton = styled.div`
  height: 63px;
  line-height: 63px;
  background: #0f77b0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  user-select: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  margin-top: 31px;

  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  color: #fff;

  :active {
    line-height: 65px;
  }
  :hover {
    background: #256aa3;
  }
`;

const Author = styled.div`
  word-wrap: break-word;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const StarsGray = styled.div`
  //position: relative;
  vertical-align: middle;
  background: 0 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,17px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,34px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,51px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,68px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat;
  height: 15px;
  width: 82px
`;

const StarsMask = styled.div`
  background: 0 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,17px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,34px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,51px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,68px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat;
  height: 15px;
  width: 82px;
  width: ${props => ranking(props.rank)}
`;

/*(props.rank * 82 / 5) + "px"*/
function ranking (rank) {
  switch(rank) {
    case "one" : 
      return "17px";
    case "two" :
      return "34px";
    case "three" :
      return "51px";
    case "four" :
      return "67px";
    case "five" :
      return "82px";
    default:
    return 0;
  }
}


class Book extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      book: props.books.filter( item => item.id === parseInt(props.match.params.id))[0]
    };
    console.log("constructor");
  }

  componentDidMount() {
    if(!this.state.book){
      this.props.getBooks();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(!state.book) {
      return ({
        book: props.books.filter( item => item.id === parseInt(props.match.params.id))[0]
      });
    }
    return null;
  }

  buttonAddCartHandler = () => {
    this.props.addToCart(this.state.book);
  }

  render() {
    
    /// how to fix it?
    if(!this.state.book) {
      return (
        <div>
          Book not found!!!?
        </div>
      );
    }

    return (

      <BookWrap>
        
        <Covers 
          title={this.state.book.title}
          img_array={this.state.book.Files.filter(item => item.type === "cover") /*BAD PRACTICE! reselect */} 
        />

        <BaseInfo>
        
          <Panel>
            <h1>{this.state.book.title}</h1>
            <ToolPanel>
              <StarsGray>
                <StarsMask rank={this.state.book.rank} />  
              </StarsGray>
              <span>1 отзыв</span>
              <FavoriteIcon />
            </ToolPanel>
          </Panel>
      
          <ContentColumn>
            <Author>{this.state.book.author}</Author>
            <SaleBlock>
              <Price>
                {this.state.book.price} 
                &nbsp;руб
              </Price>
              <SaleButton onClick={this.buttonAddCartHandler}>
                Добавить в корзину
              </SaleButton>
            </SaleBlock>
          </ContentColumn>
        </BaseInfo>
      </BookWrap>
    );    
  }
}

/* eslint-disable react/require-default-props */
Book.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.number,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
    rank: PropTypes.string,
    Files: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }))
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  getBooks: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
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
      },
      addToCart: (book) => {
        console.log("addCart " + book.title);
        dispatch(actionAddToCart(book)); //// if authorized call server method else local debug!
        dispatch(actionAddToCartOnServer(book));
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);
