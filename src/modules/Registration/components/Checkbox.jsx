import React from "react";

export const Checkbox = ({ player, onChangeHandler, series }) => (
  <label htmlFor={`new-${series}-${player.name}`}>
    <input
      type="checkbox"
      checked={player.series[series]}
      style={{ display: "none" }}
      onChange={onChangeHandler}
      className="hidden-checkbox"
      id={`new-${series}-${player.name}`}
    />

    <span className="custom-checkbox" />
  </label>
);
