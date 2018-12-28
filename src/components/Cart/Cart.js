import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createSelector } from "reselect";

import { actionGetCart, actionSetCart, actionDeleteAllCartOnServer } from "../../actions/actions";
import BookCard from "../BookCard/BookCard";

const colorLine = "#c9d3d8";
const phone_layout = "480px";

const OrderWrapper = styled.div`
    padding: 24px 46px;
`;

const HeaderOwner = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colorLine};

  @media only screen and (max-width : ${phone_layout})  {
    :before {
      content: "";
      width: 100%;
      order: 1;
    }   
  }
`;

const TitleMain = styled.h3`
    font-size: 1.5rem;
    font-weight: normal;
`;

const IserInfo = styled.h5`
    font-size: 1rem;
    font-weight: normal;
`;

const CaseWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Button = styled.button`
  width: 150px;
  height: 38px;
  border: 1px solid #0083ca;
  border-radius: .25rem;
  padding: 8px;
  background-color: #0083ca;
  order: 1;
  color: white;

  :active {
    background: darker($button-color, 7%); 
    box-shadow: inset 0 1px 2px rgba(0,0,0,.5);    
  }
  
  :disabled {
    background: #dddddd;
    border-color: #dddddd;
  }
`;

const getCoversToBook = createSelector(
  [state => state.cart],
  (book) => {
    if(!book) {
      return null;
    }
    return book.map((item)=>(item.Files.filter(itemFile => itemFile.type === "cover")[0].name));
  }
);


class Cart extends React.Component {

  componentDidMount() {
    this.props.getCart();
  }

  bookClickHandler = id => {
    this.props.history.push("/books/" + id);
  }

  render() {
    const { full_name } = this.props.auth;

    return (
      <OrderWrapper>
        <HeaderOwner>
          <TitleMain>Корзина</TitleMain>
          <IserInfo>{full_name}</IserInfo>
          <Button 
            onClick={this.props.clearCart}
            disabled={this.props.cart.length < 1 ? true : false}
          >
            Очистить корзину
          </Button>
        </HeaderOwner>

        <CaseWrapper>    
          {this.props.cart.map((item, index) => (
            <BookCard 
              key={item.id}
              id={item.id}
              title={item.title}
              author={item.author}
              price={item.price}
              rank={item.rank}
              //cover={item.Files.filter(item => item.type === "cover" )[0].name}
              cover={this.props.covers[index]}
              bookClick={this.bookClickHandler}
            />
          ))}
        </CaseWrapper>

      </OrderWrapper>
    );    
  }
}

/* eslint-disable react/require-default-props */
Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number,
    rank: PropTypes.string,
    Files: PropTypes.arrayOf(PropTypes.shape({ 
      type: PropTypes.string,
      name: PropTypes.string.isRequired  
    }))
  })), 
  auth: PropTypes.shape({
    full_name: PropTypes.string,
  }),
  getCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  covers: PropTypes.arrayOf(PropTypes.string)
};

function mapStateToProps(state) {
  return {
      cart: state.cart,
      auth: state.authentications,
      covers: getCoversToBook(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getCart: () => {
        dispatch(actionGetCart());
      },
      clearCart: () => {
        dispatch(actionSetCart([]));
        dispatch(actionDeleteAllCartOnServer());
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
