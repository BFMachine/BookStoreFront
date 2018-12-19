import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { actionSetFilterCategory, actionSetFilterRank, actionSetFilterAuthor,  actionGetBooks, 
  actionSetFilterSort, actionSetFilterSortDirection, actionSetPageCurrent
} from "../../../actions/actions";
import "./FilterPanel.scss";
import SelectAuthor from "./SelectAuthor/SelectAuthor";


function FilterPanel({
  setFilterCategory, 
  selectedCategory, 
  setFilterRank, 
  selectedRank,
  setFilterAuthor,
  filterAuthor,
  setFilterSort,
  selectedSort,
  setFilterSortDirection,
  selectedSortDirection,
  allAuthor
}) {

  return (
    <form className="filter-panel___form">

      <select 
        name="category"
        onChange={setFilterCategory}
        value={selectedCategory}
      >
        <option value="0">Любая категория</option>
        <option value="1">Классика</option>
        <option value="2">Фэнтэзи</option>
        <option value="3">Приключения</option>
        <option value="4">Детектив</option>
        <option value="5">Фантастика</option>
        <option value="6">Научная литература</option>
        <option value="7">Детская</option>
      </select>

      <select 
        name="rank"
        onChange={setFilterRank}
        value={selectedRank}
      >
        <option value="0">Все</option>
        <option value="one">1</option>
        <option value="two">2</option>
        <option value="three">3</option>
        <option value="four">4</option>
        <option value="five">5</option>
      </select>

      <SelectAuthor 
        authors={allAuthor}
        filter={filterAuthor}
        set_filer_author={setFilterAuthor}
      />

      <select 
        name="sort"
        onChange={setFilterSort}
        value={selectedSort}
      >
        <option value="none">Без сортировки</option>
        <option value="price">По цене</option>
        <option value="rank">По рейтингу </option>
        <option value="author">По имени автора </option>
      </select>

      <select 
        name="direction"
        onChange={setFilterSortDirection}
        value={selectedSortDirection}
      >
        <option value="ASC">по возрастанию</option>
        <option value="DESC">по убыванию</option>
      </select>

    </form>
  );
}

/* eslint-disable react/require-default-props */
FilterPanel.propTypes = {
  selectedCategory: PropTypes.number,
  selectedRank: PropTypes.string,
  selectedSort: PropTypes.string,
  selectedSortDirection: PropTypes.string,
  filterAuthor: PropTypes.string,
  setFilterCategory: PropTypes.func.isRequired,
  setFilterRank: PropTypes.func.isRequired,
  setFilterAuthor: PropTypes.func.isRequired,
  setFilterSort: PropTypes.func.isRequired,
  setFilterSortDirection: PropTypes.func.isRequired,
  allAuthor: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.filter.category,
    selectedRank: state.filter.rank,
    selectedSort: state.filter.sort,
    selectedSortDirection: state.filter.direction,
    allAuthor: state.authors,
    filterAuthor: state.filter.author
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    setFilterCategory: (e) => {
      const filter = +e.target.options[e.target.selectedIndex].value;
      dispatch(actionSetFilterCategory(filter));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    },

    setFilterRank: (e) => {
      const filter = e.target.options[e.target.selectedIndex].value;
      dispatch(actionSetFilterRank(filter));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    },

    setFilterAuthor: (e) => {
      const filter = e.target.options[e.target.selectedIndex].value;
      dispatch(actionSetFilterAuthor(filter));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    },

    setFilterSort: (e) => {
      const filter = e.target.options[e.target.selectedIndex].value;
      dispatch(actionSetFilterSort(filter));
      dispatch(actionGetBooks());
    },

    setFilterSortDirection: (e) => {
      const filter = e.target.options[e.target.selectedIndex].value;
      dispatch(actionSetFilterSortDirection(filter));
      dispatch(actionGetBooks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
