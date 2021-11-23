// core
import React, { useState } from "react";
import Link from "next/link";

// components
import StarReviews from "../star-reviews";
import ConfirmationPopup from "../confirmation-popup";

// styles
import sermonStyles from "../../styles/fragments/library-items/Sermon.module.css";
import cardStyles from "../../styles/components/Cards.module.css";

export type Tsermon = {
   id: string;
   userId?: string;
   userAvatar: string;
   userSignature?: string;
   categoryTags: string[];
   tagColors: string[];
   title: string;
   author: string;
   currentRanking: Number;
   description?: string;
   fileUrl: string;
   newClass?: string;
   user?: any;
};

type sermonProps = {
   sermon: Tsermon;
   newClass?: String;
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};

const Sermon = ({ sermon, deleteOption, editOption, reportOption, newClass }: sermonProps) => {
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
         <div className={`${sermonStyles.mainWrapper} ${newClass}`} key={sermonStyles.ID}>
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
                  borderTop: `5px solid ${sermon.tagColors[0]}`,
                  borderRight: `5px solid ${sermon.tagColors[0]}`
               }}></div>

            <div
               className={sermonStyles.outerCover}
               style={{ backgroundColor: sermon.tagColors[0] }}>
               <div className={sermonStyles.textWrapper}>
                  <Link href={sermon.fileUrl}>
                     <a>
                        <h1 className={sermonStyles.title}>{sermon.title}</h1>
                        <h3 className={sermonStyles.author}>by: {sermon.author}</h3>
                     </a>
                  </Link>
                  <div
                     className={`${sermonStyles.userReputation}`}
                     style={{
                        backgroundImage: "linear-gradient(130deg, #ff9214ed, #ff0045)"
                     }}>
                     <div
                        className={`${sermonStyles.avatar}`}
                        style={{ backgroundImage: `url(${sermon.userAvatar})` }}></div>
                  </div>
                  <span className={sermonStyles.category}>Category: {sermon.categoryTags[0]}</span>
                  {reportOption && (
                     <span
                        className={`std-vector-icon ${sermonStyles.actionTrigger}`}
                        onClick={handleOpenActionsWrapper}></span>
                  )}
               </div>
            </div>

            <StarReviews contentId={sermon.id} currentRanking={sermon.currentRanking} />
         </div>
      </>
   );
};

export default Sermon;
