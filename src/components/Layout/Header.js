import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <img src="/assets/meals.jpg" alt="Meals Header" />
    </header>
  );
};

export default Header;
