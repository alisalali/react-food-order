import React, { Fragment } from "react";
import Card from "./Card";
import classes from "./Model.module.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};
const ModelOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Model = (props) => {
  return (
    <Fragment>
      {/* <Backdrop />
      <ModelOverlay>
        {props.children}
        <Card>
        </Card>;
      </ModelOverlay> */}
      {/* createPortal */}
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModelOverlay>{props.children}</ModelOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Model;
