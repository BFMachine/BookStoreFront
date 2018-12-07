import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
//import moment from "moment";
import PropTypes from "prop-types";
import "moment/locale/ru";

import { actionGetCart } from "../../actions/actions";

const colorLine = "#c9d3d8";

const OrderWrapper = styled.div`
    padding: 24px 46px;
`;

const TitleMain = styled.h3`
    font-size: 1.5rem;
    font-weight: normal;
`;

const TitleMiddle = styled.h4`
    font-size: 1.4rem;
    font-weight: normal;
`;
const TitleThird = styled.h5`
    //margin-top: -10px;
    font-size: 1rem;
    font-weight: normal;
`;

const HLine = styled.hr`
    color: ${colorLine};
    border: none; 
    background-color: ${colorLine};
    height: 1px; 
`;

const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    
`;

const Th = styled.td`
    padding: 5px 15px;
    text-align: right;
    font-weight: bold;
    //font-size: 1.1rem
`;

const Th1 = styled(Th)`
    width: 5%;
`;

const Td = styled.td`
    padding: 5px 15px;
    text-align: right;
`;


class Cart extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getCart();
  }

  render() {
    return (
      <OrderWrapper>

        <TitleMain>Ваши заказы</TitleMain>
        <HLine />
        <TitleMiddle>this.props.orders.full_name</TitleMiddle>
        <TitleThird>this.props.orders.email</TitleThird>
        <HLine />
        <Table>
          <tbody>
            
            <tr>
              <Th1>№</Th1>
              <Th>Автор</Th>
              <Th>Название</Th>
              <Th>Описание</Th>
              <Th>Категория</Th>
              <Th>Цена</Th>
              <Th>Рейтинг</Th>
            </tr>

            {this.props.cart.length !==0 && this.props.cart.map((item, i) => {
              return (
                <tr key={item.id}> 
                  <Td>{i + 1}</Td>
                  <Td>{item.author}</Td>
                  <Td>{item.title}</Td>
                  <Td>{item.description.slice(0, 20) + "..."}</Td>
                  <Td>{item.category}</Td>
                  <Td>
                    {item.price ? item.price.toFixed(2) : "0.00"}
                    руб
                  </Td>
                  <Td>{item.rank}</Td>
                </tr>    
              );
            })}  


          </tbody>
        </Table>
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
    category: PropTypes.number,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
    rank: PropTypes.string,
  })), 
  getCart: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
      cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getCart: () => {
          dispatch(actionGetCart());
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
