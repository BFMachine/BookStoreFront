import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { actionSetFilterCategory, actionSetFilterRank } from "../../../actions/actions";
import "./FilterPanel.scss";


/* eslint-disable react/require-default-props */
FilterPanel.propTypes = {
  selectedCategory: PropTypes.number,
  selectedRank: PropTypes.string,
  setFilterCategory: PropTypes.func.isRequired,
  setFilterRank: PropTypes.func.isRequired
};


function FilterPanel({setFilterCategory, selectedCategory, setFilterRank, selectedRank}) {

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


    </form>
  );

}


const mapStateToProps = (state) => {
  return {
    selectedCategory: state.filter.category,
    selectedRank: state.filter.rank
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    setFilterCategory: (e) => {
      const filter = +e.target.options[e.target.selectedIndex].value;
      dispatch( actionSetFilterCategory(filter) );
    },

    setFilterRank: (e) => {
      const filter = e.target.options[e.target.selectedIndex].value;
      dispatch( actionSetFilterRank(filter) );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
