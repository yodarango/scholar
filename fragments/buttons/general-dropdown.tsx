import React from "react";
import GeneralDropdownStyles from "../../styles/buttons/GeneralDropDown.module.css";

export type TdropdownObjectSingleOption = {
   textContent: string;
   funcParams: any;
   id: number;
};

export type TdropdownOptionsJSX = {
   content: JSX.Element;
   funcParams?: any;
   id: number;
};

export type TdropdownOptionsString = {
   content: string[];
   funcParams?: any;
   id: number;
};
type generalDropdownProps = {
   dropdownOptionsJSX?: TdropdownOptionsJSX[];
   dropdownOptionsString?: TdropdownOptionsString[];
   dropdownOptionsObject?: TdropdownObjectSingleOption[];
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
            dropdownOptionsJSX.map((option: TdropdownOptionsJSX) => (
               <div
                  key={option.id}
                  className={`${GeneralDropdownStyles.option} ${optionNewClass}`}
                  onClick={cta}>
                  {option}
               </div>
            ))}
         {dropdownOptionsString &&
            dropdownOptionsString.map((option: TdropdownOptionsString) => (
               <div
                  key={option.id}
                  className={`${GeneralDropdownStyles.option} ${optionNewClass}`}
                  onClick={cta}>
                  {option}
               </div>
            ))}
         {dropdownOptionsObject &&
            dropdownOptionsObject.map((option: TdropdownObjectSingleOption) => (
               <div
                  key={option.id}
                  className={`${GeneralDropdownStyles.singleOption} ${optionNewClass}`}
                  onClick={() => cta(option)}>
                  {option.textContent}
               </div>
            ))}
      </div>
   );
};

export default GeneralDropdown;
