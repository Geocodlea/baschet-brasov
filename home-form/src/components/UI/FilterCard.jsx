import React from "react";
import classes from "./FilterCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterCard(props) {
  return (
    <div id={props.id} data-type={props.dataType} className={classes.container}>
      <p>{props.filterText}</p>
      <FontAwesomeIcon icon={props.icon} onClick={props.onClearFilter} />
    </div>
  );
}
