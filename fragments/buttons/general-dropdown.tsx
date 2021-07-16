import React from "react";
import GeneralDropdownStyles from "../../styles/buttons/GeneralDropDown.module.css";


type generalDropdownProps = {
   dropdownOptions: JSX.Element[] | string[];
   //CTA: React.MouseEventHandler
}
const GeneralDropdown = ({ dropdownOptions }:generalDropdownProps) => {
   return (
      <div className={GeneralDropdownStyles.mainWrapper}>
         {dropdownOptions && dropdownOptions.map((option: JSX.Element | string)=> ( <>{option}</>))}
      </div>
   );
};

export default GeneralDropdown;
