import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { actionSetFilterCategory, actionSetFilterRank, actionSetFilterAuthor,  actionGetBooks
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
    </form>
  );
}

/* eslint-disable react/require-default-props */
FilterPanel.propTypes = {
  selectedCategory: PropTypes.number,
  selectedRank: PropTypes.string,
  filterAuthor: PropTypes.string,
  setFilterCategory: PropTypes.func.isRequired,
  setFilterRank: PropTypes.func.isRequired,
  setFilterAuthor: PropTypes.func.isRequired,
  allAuthor: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.filter.category,
    selectedRank: state.filter.rank,
    allAuthor: state.authors,
    filterAuthor: state.filter.author
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    setFilterCategory: (e) => {
      const filter = +e.target.options[e.target.selectedIndex].value;
      dispatch( actionSetFilterCategory(filter) );
      dispatch(actionGetBooks());
    },

    setFilterRank: (e) => {
      const filter = e.target.options[e.target.selectedIndex].value;
      dispatch( actionSetFilterRank(filter) );
      dispatch(actionGetBooks());
    },

    setFilterAuthor: (e) => {
      const filter = e.target.options[e.target.selectedIndex].value;
      dispatch( actionSetFilterAuthor(filter) );
      dispatch(actionGetBooks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
