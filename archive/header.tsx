// core
import { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

// graphQl
import client from "../apollo-client";
import { CHECK_IF_PATRON_ACCOUNT } from "../graphql/billing/billing";

// components
import GeneralDropdown from "../fragments/buttons/general-dropdown";
import QuoteEditor from "../fragments/post-editor/quote-editor";
import CommentEditor from "../fragments/post-editor/comment-editor";
import PopupWrapper from "./popup-wrapper";
import ThoughtTextEditor from "../fragments/post-editor/popup-new-thought";
import SermonNotesPost from "../fragments/post-editor/sermon-notes-post";

// styles
import generalDropDownStyles from "../styles/buttons/GeneralDropDown.module.css";

//helpers

import { loggedInStatus } from "../helpers/auth/get-loggedin-user";
// types
import { Tuser } from "../pages/users/[signature]";
import { TdropdownObjectSingleOption } from "../fragments/buttons/general-dropdown";

type headerProps = {
   currPage: string;
};

export default function Header({ currPage }: headerProps) {
   // set up router
   const router = useRouter();
   //check if the user is authenticated in order to show the create post button
   const [isUserAuth, setIsUserAuth] = useState<boolean>(false);

   useEffect(() => {
      if (router.isReady) {
         const authJWT = loggedInStatus();
         authJWT ? setIsUserAuth(true) : setIsUserAuth(false);
      }
   }, [router.isReady]);

   // =================   FUNCTION 1: open the new post dropdown   ================= //
   const [openDropDownState, setOpenDropDownState] = useState<boolean>(false);
   const handleShowDropDown = () => {
      setOpenDropDownState(true);
   };

   // =================   FUNCTION 2: open the correct editor depending on selected choice   ================= //
   const [openEditorState, setOpenEditorState] = useState<boolean | JSX.Element>(false);
   const handleOpenEditor = (e: TdropdownObjectSingleOption) => {
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
                  { textContent: "Commentary", funcParams: "com", id: 1 },
                  { textContent: "Quote", funcParams: "quote", id: 2 },
                  { textContent: "Thought", funcParams: "thought", id: 3 },
                  { textContent: "Sermon Notes", funcParams: "sermon", id: 4 }
               ]}
               optionNewClass={generalDropDownStyles.header_singleOption}
               mainNewClass={generalDropDownStyles.header_mainWrapper}
            />
         )}
         {openEditorState}
         <div className='header'>
            {/* <h1 className='beta-header'>Beta 1.0. </h1> */}
            <div className='header-logo-wrapper'>
               {currPage === "HOME" && (
                  <Link href={"/"}>
                     <a className='header-logo'></a>
                  </Link>
               )}
            </div>
            <h2 className='header-curr-page'>{currPage}</h2>
            {!openDropDownState && isUserAuth && (
               <span className={"new-post-trigger"} onClick={handleShowDropDown}></span>
            )}
            {openDropDownState && isUserAuth && (
               <span
                  className={"new-post-trigger"}
                  onClick={() => setOpenDropDownState(false)}></span>
            )}

            <Link href={"/subscription/join"}>
               <a className={`go-pro-button`}></a>
            </Link>
         </div>
      </>
   );
}
