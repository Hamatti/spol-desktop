import React from "react";
import "./Filter.scss";

export const Filter = ({ onChangeHandler }) => (
  <div className="filter">
    <label htmlFor="filter">Filter by name</label>
    <input
      type="text"
      name="filter"
      id="filter"
      onChange={ev => onChangeHandler(ev.target.value)}
    />
  </div>
);
