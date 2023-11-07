import React from "react";
import classes from "./Button.module.css";

export default function Button(props) {
  return (
    <div className={classes.button}>
      <button id="submitButtonVite" onClick={props.submitForm}>
        Afișează
      </button>
    </div>
  );
}
