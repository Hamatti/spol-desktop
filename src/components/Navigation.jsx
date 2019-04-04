import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";

export const Navigation = () => (
  <ul>
    <Link to="/">
      <li>Home</li>
    </Link>
    <Link to="/registration">
      <li>Registration</li>
    </Link>
    <Link to="/cup">
      <li>Cup</li>
    </Link>
  </ul>
);
