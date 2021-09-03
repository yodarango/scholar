// core
import React, { useState } from "react";

// components
import Chapter from "../../layouts/fetch-bible-chapter";
import PopupWrapper from "../../layouts/popup-wrapper";
import Commentary from "../../layouts/popup-new-comment";

// styles
import randomDailyVerseStyles from "../../styles/fragments/squares/RandomDailyVerse.module.css";
import fetchNewChapterStyles from "../../styles/layouts/FetchNewChapter.module.css";

// helpers
import { TverseContent } from "../../pages";

type randomDailyVerseProps = {
   verseContent: TverseContent;
   versionId: string;
};
const RandomDailyVerse = ({ verseContent, versionId }: randomDailyVerseProps) => {
   // ===============   FUNCTION 1: read the entire chapter based on the daily verse
   const [readFullChapterSrtate, setReadFullChapterSrtate] = useState<JSX.Element | boolean>(false);
   const readDailyVerse = () => {
      setReadFullChapterSrtate(
         <>
            <div className='dark-bkg'>
               <div
                  className={`closeModal ${fetchNewChapterStyles.closeModal}`}
                  onClick={() => setReadFullChapterSrtate(false)}>
                  X
               </div>
               <div className='medium-spacer'></div>
               <div className={`dark-bkg_content-holder`}>
                  {<Chapter versionId={versionId} chapterId={verseContent.chapterId} />}
               </div>
            </div>
         </>
      );
   };

   // =============== FUNCTION 2: Opben the comment component on opup =============== //
   const [openCommentModalState, setOpenCommentModalState] = useState<JSX.Element | boolean>(false);
   const handleOpenCommentPopup = () => {
      setOpenCommentModalState(
         <PopupWrapper
            closeModal={() => setOpenCommentModalState(false)}
            content={<Commentary verseData={verseContent} />}
         />
      );
   };

   return (
      <>
         {readFullChapterSrtate}
         {openCommentModalState}
         <div className={randomDailyVerseStyles.squaredCardWrapper}>
            <p className='std-text-block--info'>{verseContent.reference}</p>
            <p className={`std-text-block ${randomDailyVerseStyles.dailyVerse}`}>
               {verseContent.content}
            </p>

            <div className={`${randomDailyVerseStyles.squaredCardWrapperFooter}`}>
               <div className={randomDailyVerseStyles.footerWrapRight}>
                  <div
                     className={`std-vector-icon ${randomDailyVerseStyles.commentIcon}`}
                     onClick={handleOpenCommentPopup}></div>
               </div>
               <div className={randomDailyVerseStyles.footerWrapLeft}>
                  <div
                     className={`std-vector-icon ${randomDailyVerseStyles.readIcon}`}
                     onClick={readDailyVerse}></div>
               </div>
            </div>
         </div>
      </>
   );
};

export default RandomDailyVerse;
