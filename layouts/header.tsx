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
import { TdropdownObjectSingleOption } from "../fragments/buttons/general-dropdown";
import getCookie from "../helpers/get-cookie";
import parseJWT from "../helpers/auth/decodeJWT";

// types
import { Tuser } from "../pages/users/[userId]";

type headerProps = {
   currPage: string;
};

export default function Header({ currPage }: headerProps) {
   // set up router
   const router = useRouter();
   //check if the user is authenticated in order to upload to dropbox
   const [isUserAuth, setIsUserAuth] = useState<Tuser | null>(null);

   useEffect(() => {
      const authCookie = getCookie("authorization");
      const decodedUser = parseJWT(authCookie);
      setIsUserAuth(decodedUser);

      console.log(decodedUser);
   }, []);

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

   // Check if the user is a patron to redirect them appropiately
   const checkIfUserPatron = async () => {
      try {
         const { data } = await client.query({
            query: CHECK_IF_PATRON_ACCOUNT,
            variables: {}
         });
         if (isUserAuth?.ID) {
            if (data.user_has_stripe_account) {
               router.replace("/subscription/billing");
            } else {
               router.replace("/subscription/join");
            }
         } else {
            router.replace("/login");
         }

         console.log(data);
      } catch (error) {
         console.log(error);
      }
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
            <div>
               <Link href={"/"}>
                  <a className='header-logo'></a>
               </Link>
            </div>
            <h2 className='header-curr-page'>{currPage}</h2>
            {!openDropDownState && isUserAuth?.ID && (
               <span className={"new-post-trigger"} onClick={handleShowDropDown}></span>
            )}
            {openDropDownState && isUserAuth?.ID && (
               <span
                  className={"new-post-trigger"}
                  onClick={() => setOpenDropDownState(false)}></span>
            )}

            <button className={`go-pro-button`} onClick={checkIfUserPatron}></button>
         </div>
      </>
   );
}
