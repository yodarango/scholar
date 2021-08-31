// core
import React, { useState } from "react";
import Link from "next/link";

// components
import StarReviews from "../star-reviews";
import ConfirmationPopup from "../confirmation-popup";

// styles
import sermonStyles from "../../styles/fragments/library-items/Sermon.module.css";
import cardStyles from "../../styles/components/Cards.module.css";

export type sermonProps = {
   id: string;
   userId?: string;
   userAvatar: string;
   userSignature?: string;
   tags: string[];
   colors: string[];
   title: string;
   author: string;
   reviews: string[];
   stars: number[];
   description?: string;
   file: string;
   newClass?: string;
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};

const Sermon = ({
   id,
   tags,
   colors,
   title,
   author,
   reviews,
   stars,
   file,
   userId,
   userAvatar,
   newClass,
   deleteOption,
   editOption,
   reportOption
}: sermonProps) => {
   // ===============   SUNCTION 2: Open the actions wrapper   ============== ///
   const [actionsWrapper, setActionsWrapper] = useState<boolean>(false);
   const handleOpenActionsWrapper = () => {
      setActionsWrapper(true);
      console.log("hey");
   };

   // ================= FUNCTION 1: Handle the delete popup  ===================//
   const [deletePopupState, setDeletePopupState] = useState<boolean>(false);
   const handleDeleteConfirmation = () => {
      setDeletePopupState(true);
   };

   // ================= FUNCTION 2: Handle the report popup  ===================//
   const [reportPopupState, setReportPopupState] = useState<boolean>(false);
   const handleReportConfirmation = () => {
      setReportPopupState(true);
   };
   return (
      <>
         <div className={`${sermonStyles.mainWrapper} ${newClass}`} key={id}>
            {deletePopupState && (
               <ConfirmationPopup
                  title={`Are you sure you want to delete this sermon?`}
                  cancel={() => setDeletePopupState(false)}
               />
            )}

            {reportPopupState && (
               <ConfirmationPopup
                  cancel={() => setReportPopupState(false)}
                  title={"Are you sure you want to report this sermon?"}
               />
            )}
            {actionsWrapper && (
               <>
                  <div className={sermonStyles.actionWrapper}>
                     <span
                        className={`closeModal`}
                        style={{ top: `-10px`, right: `-10px` }}
                        onClick={() => setActionsWrapper(false)}>
                        X
                     </span>
                     {deleteOption && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.delete)}
                           onClick={handleDeleteConfirmation}></span>
                     )}
                     {editOption && (
                        <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>
                     )}
                     {reportOption && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.report)}
                           onClick={handleReportConfirmation}></span>
                     )}
                  </div>
               </>
            )}
            <div
               className={sermonStyles.innerpages}
               style={{
                  borderTop: `5px solid ${colors[0]}`,
                  borderRight: `5px solid ${colors[0]}`
               }}></div>

            <div className={sermonStyles.outerCover} style={{ backgroundColor: colors[0] }}>
               <div className={sermonStyles.textWrapper}>
                  <Link href={file}>
                     <a>
                        <h1 className={sermonStyles.title}>{title}</h1>
                        <h3 className={sermonStyles.author}>by: {author}</h3>
                     </a>
                  </Link>
                  <div
                     className={`${sermonStyles.userReputation}`}
                     style={{
                        backgroundImage: "linear-gradient(130deg, #ff9214ed, #ff0045)"
                     }}>
                     <div
                        className={`${sermonStyles.avatar}`}
                        style={{ backgroundImage: `url(${userAvatar})` }}></div>
                  </div>
                  <span className={sermonStyles.category}>Category: {tags[0]}</span>
                  {reportOption && (
                     <span
                        className={`std-vector-icon ${sermonStyles.actionTrigger}`}
                        onClick={handleOpenActionsWrapper}></span>
                  )}
               </div>
            </div>

            <StarReviews contentId={id} stars={stars} reviews={reviews} />
         </div>
      </>
   );
};

export default Sermon;
