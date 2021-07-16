import React from "react";
import GeneralDropdownStyles from "../../styles/buttons/GeneralDropDown.module.css";

const GeneralDropdown = ({ version }) => {
   return (
      <div className={GeneralDropdownStyles.mainWrapper}>
         <div className={GeneralDropdownStyles.chapter}>Version</div>
         <div className={GeneralDropdownStyles.chapter}>Chapter</div>
         <div className={GeneralDropdownStyles.Color}>Color</div>
      </div>
   );
};

export default GeneralDropdown;
