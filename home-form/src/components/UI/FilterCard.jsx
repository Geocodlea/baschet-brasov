import React from "react";
import classes from "./FilterCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterCard(props) {
  return (
    <div
      id={props.id}
      data-type={props.dataType}
      className={classes.container}
      style={props.style}
      onClick={props.onClearFilter}
    >
      <p>{props.filterText}</p>
      {!props.style && <FontAwesomeIcon icon={props.icon} />}
    </div>
  );
}
