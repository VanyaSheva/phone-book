import React from "react";
import styles from "./Filter.module.css";
import PropTypes from "prop-types";

const Filter = ({ value, onFilter }) => (
  <>
    <label className={styles.label}>
      Find contact by name:
      <input
        type="search"
        name="filter"
        value={value}
        onChange={onFilter}
      ></input>
    </label>
  </>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,

  onFilter: PropTypes.func.isRequired,
};

export default Filter;
