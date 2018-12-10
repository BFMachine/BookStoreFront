import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { actionGetFavorite } from "../../actions/actions";
import BookCard from "../BookCard/BookCard";

const colorLine = "#c9d3d8";

const OrderWrapper = styled.div`
    padding: 24px 46px;
`;

const HeaderOwner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-item: flex-start;
  border-bottom: 1px solid ${colorLine};
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

class Favorite extends React.Component {

  componentDidMount() {
    this.props.getFavorite();
  }

  render() {
    const { full_name } = this.props.auth;

    return (
      <OrderWrapper>
        <HeaderOwner>
          <TitleMain>Избранное</TitleMain>
          <IserInfo>{full_name}</IserInfo>
        </HeaderOwner>

        <CaseWrapper>    
          {this.props.favorite.map((item) => (
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
