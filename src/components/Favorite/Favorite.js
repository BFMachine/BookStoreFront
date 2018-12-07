import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
//import moment from "moment";
import PropTypes from "prop-types";
import "moment/locale/ru";

import { actionGetFavorite } from "../../actions/actions";

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


class Favorite extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getFavorite();
  }

  render() {
    const { email, full_name, address, phone } = this.props.auth;

    return (
      <OrderWrapper>

        <TitleMain>Ваши заказы</TitleMain>
        <HLine />
        <TitleMiddle>{full_name}</TitleMiddle>
        <TitleThird>{email}</TitleThird>
        <TitleThird>{address}</TitleThird>
        <TitleThird>{phone}</TitleThird>
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

            {this.props.favorite.length !==0 && this.props.favorite.map((item, i) => {
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
Favorite.propTypes = {
  favorite: PropTypes.arrayOf(PropTypes.shape({
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
  getFavorite: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
      favorite: state.favorite,
      auth: state.authentications
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getFavorite: () => {
          dispatch(actionGetFavorite());
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
