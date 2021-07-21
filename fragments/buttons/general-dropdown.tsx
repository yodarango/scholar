import React from "react";
import GeneralDropdownStyles from "../../styles/buttons/GeneralDropDown.module.css";

export type IdropdownObjectSingleOption = {
   textContent: string;
   funcParams: any;
};

type generalDropdownProps = {
   dropdownOptionsJSX?: JSX.Element[];
   dropdownOptionsString?: string[];
   dropdownOptionsObject?: IdropdownObjectSingleOption[];
   mainNewClass?: string;
   optionNewClass?: string;
   cta: any;
};
const GeneralDropdown = ({
   dropdownOptionsJSX,
   dropdownOptionsString,
   dropdownOptionsObject,
   mainNewClass,
   optionNewClass,
   cta
}: generalDropdownProps) => {
   return (
      <div className={`${GeneralDropdownStyles.mainWrapper} ${mainNewClass}`}>
         {dropdownOptionsJSX &&
            dropdownOptionsJSX.map((option: JSX.Element) => (
               <div className={`${GeneralDropdownStyles.option} ${optionNewClass}`} onClick={cta}>
                  {option}
               </div>
            ))}
         {dropdownOptionsString &&
            dropdownOptionsString.map((option: string) => (
               <div className={`${GeneralDropdownStyles.option} ${optionNewClass}`} onClick={cta}>
                  {option}
               </div>
            ))}
         {dropdownOptionsObject &&
            dropdownOptionsObject.map((option: IdropdownObjectSingleOption) => (
               <div
                  className={`${GeneralDropdownStyles.singleOption} ${optionNewClass}`}
                  onClick={() => cta(option)}>
                  {option.textContent}
               </div>
            ))}
      </div>
   );
};

export default GeneralDropdown;
