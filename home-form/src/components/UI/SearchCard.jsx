import React, { useState } from "react";
import classes from "./SearchCard.module.css";
import Button from "./Button";
import FilterCard from "./FilterCard";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";

export default function SearchCard(props) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  //const [dropdownErrorMessage, setDropdownErrorMessage] = useState("");

  const [terrainSelected, setTerrainSelected] = useState("Tip teren");
  const [apiTerrainSelected, setApiTerrainSelected] = useState("");
  const apiTerrain = [
    { text: "Modular FIBA", value: "INDOOR" },
    { text: "Tartan", value: "OUTDOOR" },
  ];

  const [renovationSelected, setRenovationSelected] =
    useState("Status renovare");
  const [apiStatusSelected, setApiStatusSelected] = useState("");
  const apiStatus = [
    { text: "Renovat", value: "RENOVATED" },
    { text: "In curs de renovare", value: "NOT_RENOVATED" },
  ];

  const toggleDropdown = (dropdownName) => {
    activeDropdown === dropdownName
      ? setActiveDropdown(null)
      : setActiveDropdown(dropdownName);
  };

  const submitForm = () => {
    console.log(apiTerrainSelected, apiStatusSelected);

    window.location = `terenuri-de-baschet?terrain=${apiTerrainSelected}&status=${apiStatusSelected}`;
    //   if (
    //     terrainSelected === "Tip teren" ||
    //     renovationSelected === "Status renovare"
    //   ) {
    //     setDropdownErrorMessage("Nu ai selectat tip teren sau status renovare");
    //   } else {
    //     setDropdownErrorMessage("");
    //   }
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.row}>
          <div className={classes.topFilter}>
            <Dropdown
              dropdownTitle={"Tip Teren"}
              dropdownOptions={apiTerrain}
              selected={terrainSelected}
              setSelected={setTerrainSelected}
              //  dropdownErrorMessage={dropdownErrorMessage}
              activeDropdown={activeDropdown === "terrain"}
              setActiveDropdown={() => toggleDropdown("terrain")}
              setApiValues={setApiTerrainSelected}
            />
            <Dropdown
              dropdownTitle={"Status Renovare"}
              dropdownOptions={apiStatus}
              selected={renovationSelected}
              setSelected={setRenovationSelected}
              //  dropdownErrorMessage={dropdownErrorMessage}
              activeDropdown={activeDropdown === "renovation"}
              setActiveDropdown={() => toggleDropdown("renovation")}
              setApiValues={setApiStatusSelected}
            />

            <Button submitForm={submitForm} />
          </div>

          <div className={classes.bottomFilter}>
            {terrainSelected !== "Tip teren" && (
              <FilterCard
                filterText={terrainSelected}
                id="selectedType"
                dataType={apiTerrainSelected}
                icon={faXmark}
                onClearFilter={() => {
                  setTerrainSelected("Tip teren");
                  setApiTerrainSelected("");
                }}
              />
            )}
            {renovationSelected !== "Status renovare" && (
              <FilterCard
                filterText={renovationSelected}
                id="selectedStatus"
                dataType={apiStatusSelected}
                icon={faXmark}
                onClearFilter={() => {
                  setRenovationSelected("Status renovare");
                  setApiStatusSelected("");
                }}
              />
            )}
            {(terrainSelected !== "Tip teren" ||
              renovationSelected !== "Status renovare") && (
              <FilterCard
                style={{ marginLeft: "auto" }}
                icon={faXmark}
                onClearFilter={() => {
                  setTerrainSelected("Tip teren");
                  setRenovationSelected("Status renovare");
                  setApiTerrainSelected("");
                  setApiStatusSelected("");
                }}
                filterText={"Șterge filtrele"}
              />
            )}
          </div>
        </div>
      </div>
      {/* <div className={classes.errorMessage}>
        <span>{dropdownErrorMessage}</span>
      </div> */}
    </div>
  );
}
