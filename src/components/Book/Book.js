import React from "react";
import styled, { keyframes, css } from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createSelector } from "reselect";
import moment from "moment";

import Covers from "./Covers/Covers";
import { actionAddToCart, actionAddToCartOnServer,
  actionDeleteFromCart, actionDeleteFromCartOnServer, actionAddToFavorite,
  actionAddToFavoriteOnServer, actionDeleteFromFavorite, actionDeleteFromFavoriteOnServer,
  actionGetBookComments, actionCreateNewComment, actionAddBookToCash, actionGetBook
} from "../../actions/actions";
import InputComments from "./InputComment/InputComment";
import config from "../../config";

const colorLine = "#0083ca";

const MainWrap = styled.div`
  padding-bottom: 20px;
`;

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

  span {
    :hover {
      text-decoration: underline;
    }
  }
`;

const grow = keyframes`
  from {
    width: 14px; 
    height: 12px;
    background-size: 14px 12px;
    left: 2px;
    top: 5px;
  }
  to {
    width: 50px;
    height: 50px;
    background-size: 50px 50px;
    left: -15px;
    top: -19px;
  }
`;

const complexMixin = css`
  animation: ${grow} 150ms linear;
`;

const arrow_up = keyframes`
  from {
    transform: rotate(-135deg);    
    top: 7px;
  }
  to {
    transform: rotate(45deg);
    top: 0px;
  }
`;

const arrow_up_mix = css`
  animation: ${arrow_up} 100ms linear;
`;

const arrow_down = keyframes`
  from {
    transform: rotate(45deg);    
    top: 0px;
  }
  to {
    transform: rotate(-135deg);
    top: 7px;
  }
`;

const FavoriteIcon = styled.div`
  margin-left: 16px;
  height: 12px;
  cursor: pointer;
  position: relative;
  background-repeat: no-repeat;
  background-size: 14px 12px;
  background-position: 3px 50%;
  padding: 5px 5px 5px 25px;

  background-image: ${props => ( props.inFavorite ? 
    `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http%3A//www.w3.org/2000/svg' viewBox='-9 11 14 12'%3E%3Cstyle%3E.st0%7Bfill:%23cd0000;%7D%3C/style%3E%3Cpath class='st0' d='M-7.4 14.9c0-1.7 1.2-2.4 2.2-2.4 1.7 0 3.2 2.3 3.2 2.3s1.6-2.3 3.3-2.3c1 0 2.2.6 2.2 2.4 0 2.1-2.3 4.8-5.4 6.5-3.2-1.7-5.5-4.5-5.5-6.5zM1.3 11c-1.9 0-2.6.8-3.3 1.7-.7-.9-1.4-1.7-3.3-1.7-1.8 0-3.7 1.3-3.7 3.9 0 3 3.3 6.4 7 8.1 3.7-1.7 7-5.1 7-8.1C5 12.3 3.1 11 1.3 11z'/%3E%3C/svg%3E");` :
    `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http%3A//www.w3.org/2000/svg' viewBox='-9 11 14 12'%3E%3Cstyle%3E.st0%7Bfill:%23999999;%7D%3C/style%3E%3Cpath class='st0' d='M-7.4 14.9c0-1.7 1.2-2.4 2.2-2.4 1.7 0 3.2 2.3 3.2 2.3s1.6-2.3 3.3-2.3c1 0 2.2.6 2.2 2.4 0 2.1-2.3 4.8-5.4 6.5-3.2-1.7-5.5-4.5-5.5-6.5zM1.3 11c-1.9 0-2.6.8-3.3 1.7-.7-.9-1.4-1.7-3.3-1.7-1.8 0-3.7 1.3-3.7 3.9 0 3 3.3 6.4 7 8.1 3.7-1.7 7-5.1 7-8.1C5 12.3 3.1 11 1.3 11z'/%3E%3C/svg%3E");`
  )}
 
  :after {
    ${props => (props.showAnimation ? complexMixin : "")}
    content: "";
    display: block;
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http%3A//www.w3.org/2000/svg' viewBox='-9 11 14 12'%3E%3Cstyle%3E.st0%7Bfill:%23cd0000;%7D%3C/style%3E%3Cpath class='st0' d='M-7.4 14.9c0-1.7 1.2-2.4 2.2-2.4 1.7 0 3.2 2.3 3.2 2.3s1.6-2.3 3.3-2.3c1 0 2.2.6 2.2 2.4 0 2.1-2.3 4.8-5.4 6.5-3.2-1.7-5.5-4.5-5.5-6.5zM1.3 11c-1.9 0-2.6.8-3.3 1.7-.7-.9-1.4-1.7-3.3-1.7-1.8 0-3.7 1.3-3.7 3.9 0 3 3.3 6.4 7 8.1 3.7-1.7 7-5.1 7-8.1C5 12.3 3.1 11 1.3 11z'/%3E%3C/svg%3E");
  }

  :hover {
    background-color: #e5f6ff;;
  }
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
  background: #0083ca;
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
  white-space: pre-wrap;
  font-size: 1.25rem;
  line-height: 1.5rem;

  span {
    margin-top: 0.5rem;
    display: block;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: normal;
  }
`;

const StarsGray = styled.div`
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

const ReadFragment = styled.div`
  margin-top: 0.5rem;
  display: block;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: normal;
  cursor: pointer;
  color: #256aa1;
  :hover {
    text-decoration: underline;
  }
`;

const Comments = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const CommentsHeader = styled.div`
  font-size: 25px;
  padding: 14px 35px 14px 20px;
  display: flex;
  flex-direction: row;
`;

const ArrowUp = styled.div`
  width: 10px;
  height: 10px;
  position: relative;
  top: 7px;
  margin: 0 10px; //auto
  border: solid ${colorLine};;
  border-width: 0 3px 3px 0;
  animation: ${arrow_down} 100ms linear;
  transform: rotate(-135deg);
`;  

const ArrowDown = styled.div`
  width: 10px;
  height: 10px;
  position: relative;
  top: 0px;
  margin: 0 10px; //auto
  border: solid ${props => (props.no_comments ? "#cccccc" : colorLine)};
  ${props => (props.animationArrow ? arrow_up_mix : "")}
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
`;  

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  margin-bottom: 10px;

  p {
    margin: 0 30px;
    display: block;
    width: 92%;
  }
`;

const CommentHeader = styled.div`
  width: 17%;
`;

const CommentContentAuthor = styled.div`
  margin-bottom: 8px;
  color: #256aa3;
  line-height: 19px;
  overflow-wrap: break-word;
`;

const CommentContentDate = styled.div`
  margin-bottom: 12px;
  color: #999;
  line-height: 19px;
  font-size: 14px;
`;

const NewComment = styled.div`
  color: #999;
  margin-left: 50px;
`;


const getBooks = (state) => state.books;
const getCach = (state) => state.cach;
const getCart = (state) => state.cart;
const getFavorite = (state) => state.favorite;

const getId = (_, props) => props.match.params.id;

const getSelectedBook = createSelector(
  [getBooks, getCach, getId],
  (books, cach, id) => {
    let book = books.find(item => item.id === parseInt(id));
    
    if(book) {
      return book;
    }

    return cach.find(item => item.id === parseInt(id));
  }
);

const isInCartBook = createSelector(
  [getCart, getId],
  (cart, id) => {
    return ( cart.find( item => item.id === parseInt(id)) !== undefined );
  }
);

const isInFavoriteBook = createSelector(
  [getFavorite, getId],
  (favorite, id) => {
    return ( favorite.find( item => item.id === parseInt(id)) !== undefined );
  }
);

const getCoversToBook = createSelector(
  [getSelectedBook],
  (book) => {
    if(!book) {
      return null;
    }
    return book.Files.filter(item => item.type === "cover");
  }
);

const getFileToBook = createSelector(
  [getSelectedBook],
  (book) => {
    if(!book) {
      return null;
    }
    return book.Files.filter(item => item.type === "text");
  }
);


class Book extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      showAnimation: false,
      showComments: false,
      animationArrow: false,
      showInputComment: false
    };
  }

  componentDidMount() {

    if(!this.props.book){
      this.props.getBook(this.props.match.params.id);

    } else {
      this.props.getBookComment(this.props.match.params.id);
    }
  }

  buttonAddDelCartHandler = () => {

    if(this.props.inCart) {
      this.props.delteFromCart(this.props.book);

    } else {
      this.props.addToCart(this.props.book);
    }
  }

  onClickFavoriteHandler = () =>  {

    if(this.props.inFavorite) {
      this.props.delteFromFavorite(this.props.book);

    } else {
      this.setState({
        showAnimation: true
      });

      setTimeout(()=>{
        let self = this;
        self.setState({
          showAnimation: false
        });
      }, 500);

      this.props.addToFavorite(this.props.book);
    }
  }
 
  onClickCommentsHandler = () => {
    
    if(!this.props.comments.length) {
      return; 
    }

    this.setState({
      animationArrow: true
    });

    this.setState((state) => {
      return {
        showComments: !state.showComments
      };
    });

    if(this._CommentsHeader) {
      setTimeout(() => {
        this._CommentsHeader.scrollIntoView(true);
      }, 50);
    }
  }

  getCommentsRef = (node) => {
    this._CommentsHeader = node;
  }
  
  onClickNewCommentHandler = () => {
    this.setState({
      showInputComment: true
    });
  }

  onAddComment = (commenter, content) => {

    this.props.sendComment(this.props.book.id, commenter, content);

    this.setState({
      showInputComment: false
    });

    this.setState({
      showComments: true
    });
  }

  getCommentCountString = (count) => {
    
    let returnString = " отзывов";
    let lastNumber = count % 10;
    
    if(lastNumber === 0) {
      returnString = "отзывов";
    } else if (lastNumber === 1) {
      returnString = " отзыв";
    } else if(lastNumber < 5) {
      returnString = " отзыва";
    } 

    //special case
    if(count % 100 === 11 || count % 100 === 12 || count % 100 === 13 || count % 100 === 14) {
      returnString = "отзывов";
    }

    if(count === 0) {
      returnString = "нет отзывов";
    } else {
      returnString = count + " " + returnString;
    }

    return returnString;
  }
  
  getCategory = (category) => {
    switch(category) {
      case 1 : 
        return "Классика";
      case 2 : 
        return "Фэнтэзи";
      case 3 : 
        return "Приключения";
      case 4 : 
        return "Детектив";
      case 5 : 
        return "Фантастика";
      case 6 : 
        return "Научная литература";
      case 7 : 
        return "Детская литература";
      default : 
        return "";
    }
  }


  onReadFileClickHandler = () => {
    let fileName = this.props.files[0].name;
    if(!fileName) {
      return;
    }

    window.open(config.SERVER + fileName);
  }


  render() {
    
    if(!this.props.book) {
      return null;
    }

    return (
      <MainWrap>
        <BookWrap>
          
          <Covers 
            title={this.props.book.title}
            img_array={this.props.covers} 
          />

          <BaseInfo>
          
            <Panel>
              <h1>{this.props.book.title}</h1>
              <ToolPanel>
                <StarsGray>
                  <StarsMask rank={this.props.book.rank} />  
                </StarsGray>
                <span onClick={this.onClickCommentsHandler}>
                  {this.getCommentCountString(this.props.comments.length)}                  
                </span>
                <FavoriteIcon 
                  onClick={this.onClickFavoriteHandler}
                  inFavorite={this.props.inFavorite}
                  showAnimation={this.state.showAnimation}
                >
                  в избранное
                </FavoriteIcon>

              </ToolPanel>
            </Panel>
        
            <ContentColumn>
              <Author>
                {this.props.book.author}
                <span>
                  {this.getCategory(this.props.book.category)}
                </span>
                {this.props.files.length > 0 && 
                (
                  <ReadFragment onClick={this.onReadFileClickHandler}>
                    читать отрывок...
                  </ReadFragment>
                )}
              </Author>
              
              <SaleBlock>
                <Price>
                  {this.props.book.price} 
                  &nbsp;руб
                </Price>
                <SaleButton onClick={this.buttonAddDelCartHandler}>
                  {this.props.inCart ? "Удалить из корзины" : "Добавить в корзину"}
                </SaleButton>
              </SaleBlock>
            </ContentColumn>
          </BaseInfo>
        </BookWrap>
        
        <Comments ref={this.getCommentsRef}>
          
          <CommentsHeader onClick={this.onClickCommentsHandler}>
            Отзывы
            {this.state.showComments ? 
              <ArrowUp /> : 
              (
                <ArrowDown 
                  no_comments={this.props.comments.length === 0} 
                  animationArrow={this.state.animationArrow}
                />
              )
            }
          </CommentsHeader>

          {this.state.showComments && this.props.comments.map(item => (
            <CommentContainer key={item.id}>
              <CommentHeader>
                <CommentContentAuthor>
                  {item.commenter_name}
                </CommentContentAuthor>
                <CommentContentDate>
                  {moment(item.created_at).locale("ru").format("DD.MM.YYYY")}
                </CommentContentDate>
              </CommentHeader>
              <p>{item.content}</p>  
            </CommentContainer>
            ))}

          <NewComment onClick={this.onClickNewCommentHandler}>
            {this.state.showInputComment? 

              this.props.auth && this.props.auth.authorized ?   
                (
                  <InputComments
                    user_name={this.props.auth.full_name}
                    send_comment={this.onAddComment}
                  /> 
                ) : 
                "Только зарегистрированные пользователи могут оставлять комментарии" :
              "Оставьте свой комментарий..."
            }
          </NewComment>
        </Comments>
      </MainWrap>
    );    
  }
}

/* eslint-disable react/require-default-props */
Book.propTypes = {
  book: PropTypes.shape({
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
  }),
  inCart: PropTypes.bool.isRequired,
  inFavorite: PropTypes.bool.isRequired,
  covers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })),
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })),
  match : PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    commenter_name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
  })),
  auth: PropTypes.shape({
    id: PropTypes.number,
    full_name: PropTypes.string,
    authorized: PropTypes.bool
  }),
  getBook: PropTypes.func.isRequired,
  getBookComment: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  delteFromCart: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  delteFromFavorite: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
      book: getSelectedBook(state, props),
      inCart: isInCartBook(state, props),
      inFavorite: isInFavoriteBook(state, props),
      covers: getCoversToBook(state, props),
      files: getFileToBook(state, props),
      comments: state.comments,
      auth: state.authentications
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getBook: (book) => {
        dispatch(actionGetBook(book));
      },
      
      getBookComment: (id) => {
        dispatch(actionGetBookComments(id));
      },

      sendComment: (book_id, commenter_name, content) => {
        dispatch(actionCreateNewComment(book_id, commenter_name, content));
      },

      addToCart: (book) => {
        dispatch(actionAddToCart(book)); //// if authorized call server method else local debug!
        dispatch(actionAddBookToCash(book));
        dispatch(actionAddToCartOnServer([book.id]));
      },

      delteFromCart: (book) => {
        dispatch(actionDeleteFromCart(book)); //// if authorized call server method else local debug!
        dispatch(actionDeleteFromCartOnServer(book));
      },

      addToFavorite: (book) => {
        dispatch(actionAddToFavorite(book)); //// if authorized call server method else local debug!
        dispatch(actionAddBookToCash(book));
        dispatch(actionAddToFavoriteOnServer([book.id]));
      },

      delteFromFavorite: (book) => {
        dispatch(actionDeleteFromFavorite(book)); //// if authorized call server method else local debug!
        dispatch(actionDeleteFromFavoriteOnServer(book));
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);
