import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import config from "../../config";

const mobile_layout = "768px";
const phone_layout = "480px";

const CardWrap = styled.div`
    flex: 1 1 160px;
    max-width: 240px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    cursor: pointer;

    @media only screen and (max-width : ${mobile_layout})  {
      flex-basis: 140px;
    }
    @media only screen and (max-width : ${phone_layout})  {
      flex-basis: 110px;
    }
`;

const ImgContainer = styled.div `
  height: 200px;
  margin-bottom: 16px;

  @media only screen and (max-width : ${mobile_layout})  {
    height: 170px;
  }
  @media only screen and (max-width : ${phone_layout})  {
    height: 140px;
  }
`;

const Img = styled.img`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: 100%;
  max-width: 100%;
  display: block;
  margin: auto;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
  padding-left: 16px;
`;

const Title = styled.div`
  word-wrap: break-word;
  font-size: 1.2rem;
  line-height: 1.75rem;
  padding-left: 16px;
  white-space: pre-wrap;
`;

const Author = styled.div`
  word-wrap: break-word;
  font-size: 1.12rem;
  line-height: 1.75rem;
  padding-left: 16px;
  white-space: pre-wrap;
`;

const StarsGray = styled.div`
  margin-top: 8px;
  position: relative;
  vertical-align: middle;
  background: 0 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,17px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,34px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,51px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,68px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat;
  height: 15px;
  width: 82px;
  margin-left: 16px;
`;

const StarsMask = styled.div`
  background: 0 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,17px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,34px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,51px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,68px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat;
  height: 15px;
  width: 82px;
  width: ${props => ranking(props.rank)};
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


function BookCard ({ id, title, author, price, rank, cover, bookClick }) {
  
  let path = config.SERVER + cover;
  
  function testClick() {
    bookClick(id);
  }
  
    return (
      <CardWrap onClick={testClick}>
        <ImgContainer>
          <Img src={path} alt="Обложка книги" title={title} />
        </ImgContainer>
        <Price>
          {price}
          руб
        </Price>
        <Title>{title}</Title>
        <Author>{author}</Author>
        <StarsGray>
          <StarsMask rank={rank} />
        </StarsGray>
      </CardWrap>
    );    
}

/* eslint-disable react/require-default-props */
BookCard.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number,
  rank: PropTypes.string,
  cover: PropTypes.string,
  bookClick: PropTypes.func.isRequired
};

export default BookCard;
