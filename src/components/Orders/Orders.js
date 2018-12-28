import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import PropTypes from "prop-types";
import "moment/locale/ru";

import { actionGetOrders } from "../../actions/actions";

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
`;

const Th1 = styled(Th)`
    width: 5%;
`;

const Td = styled.td`
    padding: 5px 15px;
    text-align: right;
`;


class Orders extends React.Component {
   
  componentDidMount() {
      this.props.getOrders();
  }

  render() {
    return (
      <OrderWrapper>

        <TitleMain>Ваши заказы</TitleMain>
        <HLine />
        <TitleMiddle>{this.props.auth.full_name}</TitleMiddle>
        <TitleThird>{this.props.auth.email}</TitleThird>
        <HLine />
        <Table>
          <tbody>
            <tr>
              <Th1>№</Th1>
              <Th>Дата создания</Th>
              <Th>Сумма заказа</Th>
              <Th>Статус</Th>
              <Th>Дата оплаты</Th>
            </tr>
            {this.props.orders.length > 0 && this.props.orders.map((item, i) => {
                return (
                  <tr key={item.id}> 
                    <Td>{i + 1}</Td>
                    <Td>{moment(item.created_at).format("DD MMMM YYYY")}</Td>
                    <Td>
                      {item.total_cost ? item.total_cost.toFixed(2) : "0.00"}
                      руб
                    </Td>
                    <Td>{item.status}</Td>
                    <Td>{item.pay_date ? moment(item.pay_date).format("DD MMMM YYYY") : "не оплачен" }</Td>
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
Orders.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({
        created_at: PropTypes.string.isRequired,
        pay_date: PropTypes.string,
        status:PropTypes.string.isRequired,
        total_cost: PropTypes.number
    })),
    getOrders: PropTypes.func.isRequired,
    auth: PropTypes.shape({
        full_name: PropTypes.string,
        email: PropTypes.string
      }),
    
};
/* eslint-enable react/require-default-props */

function mapStateToProps(state) {
    return {
        orders: state.orders,
        auth: state.authentications
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getOrders: () => {
            dispatch(actionGetOrders());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
