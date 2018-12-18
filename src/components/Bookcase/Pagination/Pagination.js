import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, {css} from "styled-components";
import { actionSetPageCurrent, actionGetBooks } from "../../../actions/actions";


const ToolPagination = styled.ul`
  display: block;
  padding-left: 0;
  margin: 20px auto;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
`;

const selectedPage = css`
  background-color: #337ab7;
  border-color: #337ab7;
`;

const ToolPageButton = styled.li`
  display: inline;

  span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    background-color: #fff;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  ${props => (props.selected ? selectedPage: "")}

`;



class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {};
  }


  onClickPageHandler = (page) => {
    console.log(page);
    this.props.setCurrentPage(page);

  }

  getPagesMarkup = () => {
    let out = [];

    for(let i = 1; i <= this.props.pages; i++) {
      out.push(
        <ToolPageButton 
          key={i} 
          selected={this.props.page === i ? true : false}
        >
          <span onClick={()=>this.onClickPageHandler(i)}>
            {i}
          </span>
        </ToolPageButton>
      );
    }

    return out;

  }
    
  

  render() {
    const {page, pages, size} = this.props;

    return (
        <ToolPagination>
          <ToolPageButton>
            <span onClick={()=>this.onClickPageHandler(1)}>
              Первая
            </span>
          </ToolPageButton>
          <ToolPageButton>
            <span onClick={()=>this.onClickPageHandler(-1)}>
              Предыдущая
            </span>
          </ToolPageButton>
          
          {this.getPagesMarkup()}

          <ToolPageButton>
            <span onClick={()=>this.onClickPageHandler(-1)}>
              Следующая
            </span>
          </ToolPageButton>
          <ToolPageButton>
            <span onClick={()=>this.onClickPageHandler(this.props.pages)}>
              Последняя
            </span>
          </ToolPageButton>


        </ToolPagination>
    );
  }

}

/* eslint-disable react/require-default-props */
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    page: state.pages.page,
    pages: state.pages.pages,
    size: state.pages.size
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPage: (page) => {
      dispatch(actionSetPageCurrent(page));
      dispatch(actionGetBooks());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);


