import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { actionSetFilterCategory, actionSetFilterRank, actionSetFilterAuthor,  actionGetBooks, 
  actionSetFilterSort, actionSetFilterSortDirection, actionSetPageCurrent, actionSetPageSize,
  CATEGORY_ALL, CATEGORY_CLASSIC, CATEGORY_FANTASY, CATEGORY_ADVENTURE, CATEGORY_DETECTIVE,
  CATEGORY_FICTION, CATEGORY_SCIENTIFIC, CATEGORY_CHILDREN, RANK_ALL, RANK_1, RANK_2, RANK_3,
  RANK_4, RANK_5, SORT_BY_ALL, SORT_BY_PRICE, SORT_BY_RANK, SORT_BY_AUTHOR
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
  setPageSize,
  selectedPageSize,
  allAuthor
}) {

  return (
    <form className="filter-panel___form">

      <select 
        className="first"
        name="category"
        onChange={setFilterCategory}
        value={selectedCategory}
      >
        <option value={CATEGORY_ALL}>Любая категория</option>
        <option value={CATEGORY_CLASSIC}>Классика</option>
        <option value={CATEGORY_FANTASY}>Фэнтэзи</option>
        <option value={CATEGORY_ADVENTURE}>Приключения</option>
        <option value={CATEGORY_DETECTIVE}>Детектив</option>
        <option value={CATEGORY_FICTION}>Фантастика</option>
        <option value={CATEGORY_SCIENTIFIC}>Научная литература</option>
        <option value={CATEGORY_CHILDREN}>Детская</option>
      </select>

      <select 
        name="rank"
        onChange={setFilterRank}
        value={selectedRank}
      >
        <option value={RANK_ALL}>Все</option>
        <option value={RANK_1}>1</option>
        <option value={RANK_2}>2</option>
        <option value={RANK_3}>3</option>
        <option value={RANK_4}>4</option>
        <option value={RANK_5}>5</option>
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
        <option value={SORT_BY_ALL}>Без сортировки</option>
        <option value={SORT_BY_PRICE}>По цене</option>
        <option value={SORT_BY_RANK}>По рейтингу </option>
        <option value={SORT_BY_AUTHOR}>По имени автора </option>
      </select>

      <select 
        name="direction"
        onChange={setFilterSortDirection}
        value={selectedSortDirection}
      >
        <option value="ASC">по возрастанию</option>
        <option value="DESC">по убыванию</option>
      </select>

      <select 
        name="item_to_page"
        onChange={setPageSize}
        value={selectedPageSize}
      >
        <option value={0}>Все</option>
        <option value={4}>4</option>
        <option value={7}>7</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>

    </form>
  );
}

/* eslint-disable react/require-default-props */
FilterPanel.propTypes = {
  selectedCategory: PropTypes.string,
  selectedRank: PropTypes.string,
  selectedSort: PropTypes.string,
  selectedSortDirection: PropTypes.string,
  selectedPageSize: PropTypes.number,
  filterAuthor: PropTypes.string,
  setFilterCategory: PropTypes.func.isRequired,
  setFilterRank: PropTypes.func.isRequired,
  setFilterAuthor: PropTypes.func.isRequired,
  setFilterSort: PropTypes.func.isRequired,
  setFilterSortDirection: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  allAuthor: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.filter.category,
    selectedRank: state.filter.rank,
    selectedSort: state.filter.sort,
    selectedSortDirection: state.filter.direction,
    selectedPageSize: state.pages.size,
    allAuthor: state.authors,
    filterAuthor: state.filter.author
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    setFilterCategory: (e) => {
      const filter = e.target.options[e.target.selectedIndex].value;
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
    },

    setPageSize: (e) => {
      const pageSize = +e.target.options[e.target.selectedIndex].value;
      dispatch(actionSetPageSize(pageSize));
      dispatch(actionSetPageCurrent(1));
      dispatch(actionGetBooks());
    },


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
