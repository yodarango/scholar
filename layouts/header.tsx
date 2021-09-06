import React, { useState } from "react";

// components
import GeneralDropdown from "../fragments/buttons/general-dropdown";
import QuoteEditor from "../fragments/post-editor/quote-editor";

// styles
import generalDropDownStyles from "../styles/buttons/GeneralDropDown.module.css";

//helpers
import { IdropdownObjectSingleOption } from "../fragments/buttons/general-dropdown";

type headerProps = {
   currPage: string;
};

export default function Header({ currPage }: headerProps) {
   // =================   FUNCTION 1: open the new post dropdown   ================= //
   const [openDropDownState, setOpenDropDownState] = useState<boolean>(false);
   const handleShowDropDown = () => {
      setOpenDropDownState(true);
   };

   // =================   FUNCTION 2: open the correct editor depending on selected choice   ================= //
   const [openEditorState, setOpenEditorState] = useState<boolean | JSX.Element>(false);
   const handleOpenEditor = (e: IdropdownObjectSingleOption) => {
      e.funcParams = "com"
         ? setOpenEditorState(<QuoteEditor handleCloseStories={() => setOpenEditorState(false)} />)
         : setOpenEditorState(false);
      setOpenDropDownState(false);
   };

   return (
      <>
         {openDropDownState && (
            <GeneralDropdown
               cta={handleOpenEditor}
               dropdownOptionsObject={[
                  { textContent: "Commentary", funcParams: "com" },
                  { textContent: "Quote", funcParams: "quote" },
                  { textContent: "Thought", funcParams: "thought" },
                  { textContent: "Sermon Notes", funcParams: "sermon" }
               ]}
               optionNewClass={generalDropDownStyles.header_singleOption}
               mainNewClass={generalDropDownStyles.header_mainWrapper}
            />
         )}
         {openEditorState}
         <div className='header'>
            <div>
               <div className='header-logo'></div>
            </div>
            <h2 className='header-curr-page'>{currPage}</h2>
            {!openDropDownState && (
               <span className={"new-post-trigger"} onClick={handleShowDropDown}></span>
            )}
            {openDropDownState && (
               <span
                  className={"new-post-trigger"}
                  onClick={() => setOpenDropDownState(false)}></span>
            )}
         </div>
      </>
   );
}
