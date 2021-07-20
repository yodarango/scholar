import React from "react";
import GeneralDropdownStyles from "../../styles/buttons/GeneralDropDown.module.css";

type generalDropdownProps = {
   dropdownOptions: JSX.Element[] | string[];
   mainNewClass?: string;
   optionNewClass?: string;
   cta: any;
};
const GeneralDropdown = ({
   dropdownOptions,
   mainNewClass,
   optionNewClass,
   cta
}: generalDropdownProps) => {
   return (
      <div className={`${GeneralDropdownStyles.mainWrapper} ${mainNewClass}`}>
         {dropdownOptions &&
            dropdownOptions.map((option: JSX.Element | string) => (
               <div className={`${GeneralDropdownStyles.option} ${optionNewClass}`} onClick={cta}>
                  {option}
               </div>
            ))}
      </div>
   );
};

export default GeneralDropdown;
