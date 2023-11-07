import React from "react";
import classes from "./Dropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({
  selected,
  setSelected,
  activeDropdown,
  setActiveDropdown,
  dropdownOptions,
  setApiValues,
}) {
  return (
    <div className={classes.container}>
      <div
        onClick={(e) => setActiveDropdown(!activeDropdown)}
        className={classes.content}
      >
        <span>{selected}</span>
        <span className={classes.arrow}>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      {activeDropdown && (
        <ul className={classes.listItems}>
          {dropdownOptions.map((option) => (
            <li
              key={option.value}
              onClick={(e) => {
                setApiValues(option.value);
                setSelected(option.text);
                setActiveDropdown(false);
              }}
              className={classes.item}
            >
              <span className={classes.itemText}>{option.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
