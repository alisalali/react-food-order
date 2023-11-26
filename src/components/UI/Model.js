import React from "react";
import Card from "./Card";
import classes from "./Model.module.css";

const Model = (props) => {
  return <Card>{props.children}</Card>;
};

export default Model;
