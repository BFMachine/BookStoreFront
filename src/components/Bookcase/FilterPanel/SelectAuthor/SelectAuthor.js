import React from "react";
import PropTypes from "prop-types";

function SelectAuthor({authors, filter, set_filer_author}) {

  return (
    <select 
      name="author"
      value={filter}
      onChange={set_filer_author}
    >
      <option value="">Все</option>
      {authors.map((item, i) => (
        <option 
          key={i}
          value={item}
        >
          {item}
        </option>
      ))}
    </select>
  );
}

/* eslint-disable react/require-default-props */
SelectAuthor.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
  filter:  PropTypes.string,
  set_filer_author: PropTypes.func.isRequired
};

export default SelectAuthor;
