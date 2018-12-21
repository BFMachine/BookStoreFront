import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { actionSetFilterCategory, actionSetFilterRank, actionSetFilterAuthor,  actionGetBooks, 
  actionSetFilterSort, actionSetFilterSortDirection, actionSetPageCurrent, actionSetPageSize,
  CATEGORY_ALL, CATEGORY_CLASSIC, CATEGORY_FANTASY, CATEGORY_ADVENTURE, CATEGORY_DETECTIVE,
  CATEGORY_FICTION, CATEGORY_SCIENTIFIC, CATEGORY_CHILDREN, SORT_BY_ALL, SORT_BY_PRICE,
  SORT_BY_RANK, SORT_BY_AUTHOR
} from "../../../actions/actions";
import CustomSelect from "../../CustomSelect/CustomSelect";
import CustomSelectStar from "../../CustomSelect/CustomSelectStar";

const categorySelect = [{
  name: "Любая категория",
  value: CATEGORY_ALL
}, {
  name: "Классика",
  value: CATEGORY_CLASSIC
}, {
  name: "Фэнтэзи",
  value: CATEGORY_FANTASY
}, {
  name: "Приключения",
  value: CATEGORY_ADVENTURE
}, {
  name: "Детектив",
  value: CATEGORY_DETECTIVE
}, {
  name: "Фантастика",
  value: CATEGORY_FICTION
}, {
  name: "Научная литература",
  value: CATEGORY_SCIENTIFIC
}, {
  name: "Детская",
  value: CATEGORY_CHILDREN
}];

const sortSelect = [{
  name: "по актуальности",
  value: ""
}, {
  name: "по автору (А-Я)",
  value: "author_ASC"
}, {
  name: "по автору (Я-А)",
  value: "author_DESC"
}, {
  name: "по цене (дешевле)",
  value: "price_ASC"
}, {
  name: "по цене (дороже)",
  value: "price_DESC"
}, {
  name: "по рейтингу (меньше)",
  value: "rank_ASC"
}, {
  name: "по рейтингу (больше)",
  value: "rank_DESC"
}];

const pagesSelect = [{
  name: "Все книги",
  value: "0"
}, {
  name: "4 книги",
  value: "4"
}, {
  name: "7 книг",
  value: "7"
}, {
  name: "10 книг",
  value: "10"
}, {
  name: "15 книг",
  value: "15"
}, {
  name: "20 книг",
  value: "20"
}];


const PanelForm = styled.form`
  margin: 4px 30px 16px 30px;
  align-self: left;
  flex-grow: 1;
  //height: 26px;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  
  @media only screen and (max-width : 768px)  {
    flex-wrap: wrap;
    margin-right: 0;
    margin-left: 0;

`;

const getAllAuthorToCustomSelect = (authors) => {

  if(!authors) {
    return null;
  }
  
  let authorsCustom = authors.map((item)=>{
    return {
      name: item,
      value: item
    };
  });

  authorsCustom.unshift({
    name: "Все авторы",
    value: ""
  });

  return authorsCustom;
};

const getSelectedSort = (sort, direction) => {

  if(sort === SORT_BY_ALL) {
    return SORT_BY_ALL.toString();
  }
    
  return sort + "_" + direction;
};


function FilterPanel({
  setFilterCategory, 
  selectedCategory, 
  setFilterRank, 
  selectedRank,
  setFilterAuthor,
  filterAuthor,
  setFilterSort,
  selectedSort,
  selectedDirection,
  setPageSize,
  selectedPageSize,
  allAuthor
}) {

  return (
    <PanelForm>

      <CustomSelect 
        value={selectedCategory} 
        options={categorySelect} 
        callback={setFilterCategory} 
        first
        width="165px"
      />
      
      <CustomSelectStar 
        value={selectedRank}
        callback={setFilterRank}
      />

      <CustomSelect 
        value={filterAuthor} 
        options={getAllAuthorToCustomSelect(allAuthor)} 
        callback={setFilterAuthor} 
        width="180px"
      />

      <CustomSelect 
        value={getSelectedSort(selectedSort, selectedDirection)} 
        options={sortSelect} 
        callback={setFilterSort} 
      />

      <CustomSelect 
        value={selectedPageSize.toString()} 
        options={pagesSelect} 
        callback={setPageSize} 
        last
        width="110px"
      />

    </PanelForm>
  );
}

/* eslint-disable react/require-default-props */
FilterPanel.propTypes = {
  selectedCategory: PropTypes.string,
  selectedRank: PropTypes.string,
  selectedSort: PropTypes.string,
  selectedDirection: PropTypes.string,
  selectedPageSize: PropTypes.number,
  filterAuthor: PropTypes.string,
  setFilterCategory: PropTypes.func.isRequired,
  setFilterRank: PropTypes.func.isRequired,
  setFilterAuthor: PropTypes.func.isRequired,
  setFilterSort: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  allAuthor: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.filter.category,
    selectedRank: state.filter.rank,
    selectedSort: state.filter.sort,
    selectedDirection: state.filter.direction,
    selectedPageSize: state.pages.size,
    filterAuthor: state.filter.author,
    allAuthor: state.authors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    setFilterCategory: (e) => {
      dispatch(actionSetFilterCategory(e));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    },

    setFilterRank: (e) => {
      dispatch(actionSetFilterRank(e));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    },

    setFilterAuthor: (e) => {
      dispatch(actionSetFilterAuthor(e));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    },

    setFilterSort: (e) => {
      const filter = e;
      let sort, direction;
      
      switch (filter) {
        case "price_ASC" : 
          sort = SORT_BY_PRICE;
          direction = "ASC";
          break;

        case "price_DESC" : 
          sort = SORT_BY_PRICE;
          direction = "DESC";
          break;

        case "rank_ASC" : 
          sort = SORT_BY_RANK;
          direction = "ASC";
          break;

        case "rank_DESC" : 
          sort = SORT_BY_RANK;
          direction = "DESC";
          break;

        case "author_ASC" : 
          sort = SORT_BY_AUTHOR;
          direction = "ASC";
          break;

        case "author_DESC" : 
          sort = SORT_BY_AUTHOR;
          direction = "DESC";
          break;

        default: 
          sort = "";
          direction = "ASC";
      }

      dispatch(actionSetFilterSort(sort));
      dispatch(actionSetFilterSortDirection(direction));
      dispatch(actionGetBooks());
    },

    setFilterSortDirection: (e) => {
      dispatch(actionSetFilterSortDirection(e));
      dispatch(actionGetBooks());
    },

    setPageSize: (e) => {
      dispatch(actionSetPageSize(+e));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
