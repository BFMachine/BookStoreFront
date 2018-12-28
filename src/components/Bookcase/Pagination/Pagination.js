import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, {css} from "styled-components";

import { actionSetPageCurrent, actionGetBooks } from "../../../actions/actions";


const borderColor = "#ddd";
const selectedColor = "#337ab7";
const pagesInPagigation = 5;
const mobile_layout = "768px";

const DummyTool = styled.div`
  margin: 0 auto;
  height: 33px;
  width: 33px;
`;

const ToolPagination = styled.ul`

  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  padding-left: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
  
  @media only screen and (max-width : ${mobile_layout})  {
    flex-wrap : wrap;
  }

  > li:first-child  span{
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
  }
  > li:last-child  span{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
  }
`;


const selectedPage = css`
  background-color: ${selectedColor};
  border-color: ${selectedColor};
  :hover {
    background-color: ${selectedColor};
  }
  color: white;
`;

const disabledPage = css`
  background-color: white;
  color: #777;
  cursor: default;
`;

const ToolPageButton = styled.li`
  display: inline-flex;

  @media only screen and (max-width : ${mobile_layout})  {
    margin-top: -1px;
  }

  span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.4rem;
    color: ${selectedColor};
    background-color: #fff;
    border: 1px solid ${borderColor};
    cursor: pointer;
    user-select: none;
    
    :hover {
      background-color: ${props => (props.disabled ? "": borderColor)};
    }

    ${props => (props.selected ? selectedPage: "")}
    ${props => (props.disabled ? disabledPage: "")}
  }
`;


class Pagination extends React.Component {

  onClickPageHandler = (page) => {
    if(page === "prev") {
      page = this.props.page - 1;
    }

    if(page === "next") {
      page = this.props.page + 1;
    }

    if(page < 1 || page > this.props.pages) {
      return;
    }

    this.props.setCurrentPage(page);
  }

  getPagesMarkup = (startPage, endPage) => {
    let out = [];

    for(let i = startPage; i <= endPage; i++) {
      out.push(
        <ToolPageButton 
          key={i} 
          selected={this.props.page === i}
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
    const {page, pages} = this.props;
    
    let startPage = 1;
    let endPage = pages;

    if(pages > pagesInPagigation) {
      const halfPage = Math.ceil(pagesInPagigation / 2);
      
      if(page <= halfPage) {
        endPage = startPage + pagesInPagigation - 1;

      } else if (page > pages - halfPage) {
        startPage = endPage - pagesInPagigation + 1;

      } else {
        startPage = page - halfPage + 1;
        endPage = startPage + pagesInPagigation - 1;
      }
    }
    
    return (
      <DummyTool>
        <ToolPagination>
          <ToolPageButton disabled={page === 1}>
            <span onClick={()=>this.onClickPageHandler(1)}>
              Первая
            </span>
          </ToolPageButton>
          <ToolPageButton disabled={page === 1}>
            <span onClick={()=>this.onClickPageHandler("prev")}>
              Предыдущая
            </span>
          </ToolPageButton>
          
          {this.getPagesMarkup(startPage, endPage)}

          <ToolPageButton disabled={page >= pages}>
            <span onClick={()=>this.onClickPageHandler("next")}>
              Следующая
            </span>
          </ToolPageButton>
          <ToolPageButton disabled={page >= pages}>
            <span onClick={()=>this.onClickPageHandler(pages)}>
              Последняя
              {/*pages*/}
            </span>
          </ToolPageButton>
        </ToolPagination>
      </DummyTool>  
    );
  }
}

/* eslint-disable react/require-default-props */
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
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


