import React, { useState } from "react";
import Link from "next/link";

// components
import GeneralDropdown from "../fragments/buttons/general-dropdown";
import QuoteEditor from "../fragments/post-editor/quote-editor";
import CommentEditor from "../fragments/post-editor/comment-editor";
import PopupWrapper from "./popup-wrapper";
import ThoughtTextEditor from "../layouts/popup-new-thought";
import SermonNotesPost from "../fragments/post-editor/sermon-notes-post";

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
      document.body.style.overflow = "hidden";
      e.funcParams === "quote"
         ? setOpenEditorState(
              <QuoteEditor
                 handleCloseStories={() => {
                    document.body.style.overflow = "visible";
                    setOpenEditorState(false);
                 }}
              />
           )
         : e.funcParams === "com"
         ? setOpenEditorState(
              <PopupWrapper
                 content={<CommentEditor versionId={"de4e12af7f28f599-02"} />}
                 closeModal={() => {
                    document.body.style.overflow = "visible";
                    setOpenEditorState(false);
                 }}
              />
           )
         : e.funcParams === "thought"
         ? setOpenEditorState(
              <PopupWrapper
                 content={<ThoughtTextEditor />}
                 closeModal={() => {
                    document.body.style.overflow = "visible";
                    setOpenEditorState(false);
                 }}
              />
           )
         : e.funcParams === "sermon"
         ? setOpenEditorState(
              <PopupWrapper
                 content={<SermonNotesPost />}
                 closeModal={() => {
                    document.body.style.overflow = "visible";
                    setOpenEditorState(false);
                 }}
              />
           )
         : null;
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
               <Link href={"/"}>
                  <a className='header-logo'></a>
               </Link>
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
            <Link href={"/go-pro"}>
               <a className={`go-pro-button`}></a>
            </Link>
         </div>
      </>
   );
}
