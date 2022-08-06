// core
import { useEffect, useState } from "react";
import Image from "next/image";

// components
import Chapter from "../../layouts/fetch-bible-chapter";
import PopupWrapper from "../../layouts/popup-wrapper";
import Commentary from "../../layouts/popup-new-comment";
import ResourceNotFoundError from "../chunks/error_resource_not_found";

// styles
import randomDailyVerseStyles from "../../styles/fragments/squares/RandomDailyVerse.module.css";
import fetchNewChapterStyles from "../../styles/layouts/FetchNewChapter.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

//helpers
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

// types
import { getNewVerseId } from "../../helpers/APIs/random-daily-verses";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";

type randomDailyVerseProps = {
   versionId: string;
};

const RandomDailyVerse = ({ versionId }: randomDailyVerseProps) => {
   // ===============   FUNCTINO 1: Get the daily verse
   const [verseContent, setVerseContent] = useState<any>({});
   const [verseError, setVerseError] = useState(false);
   const [loadingState, setloadingState] = useState<string>("loading");

   // get the date
   const date = new Date();
   const dateFormat = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;

   const getVerse = async () => {
      try {
         const request = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${getNewVerseId()}?content-type=text&include-verse-numbers=false`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );

         const response = await request.json();
         response.data.lastCall = dateFormat;
         setloadingState("done");
         return response;
      } catch (error) {
         console.log(error);
         setVerseError(true);
         setloadingState("error");
         return null;
      }
   };

   // ============== Function 0.1 : Check if verse exists in the cache
   const checkCache = async () => {
      const saveVerseinCache: any = localStorage.getItem("todays-verse");

      if (!saveVerseinCache) {
         const verseCall: any = await getVerse();
         if (verseCall) {
            const verseData = verseCall.data;
            // update state with the new data
            setVerseContent(verseData);

            // update the local storage
            const stringifiedResponse = JSON.stringify(verseData);
            localStorage.setItem("todays-verse", stringifiedResponse);
         } else {
            // set the error state
            setVerseError(true);
         }
      } else {
         const JsonData = JSON.parse(saveVerseinCache);

         if (JsonData.lastCall === dateFormat) {
            setVerseContent(JsonData);
            setloadingState("done");
         } else {
            const verseCall: any = await getVerse();
            if (verseCall) {
               const verseData = verseCall.data;
               // update state with the new data
               setVerseContent(verseData);

               // update the local storage
               const stringifiedResponse = JSON.stringify(verseData);
               localStorage.setItem("todays-verse", stringifiedResponse);
            } else {
               // set the error state
               setVerseError(true);
            }
         }
      }
   };

   useEffect(() => {
      checkCache();
   }, []);

   // ===============   FUNCTION 2: read the entire chapter based on the daily verse
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
            content={<Commentary verseData={verseContent} err={verseError} />}
         />
      );
   };

   return (
      <>
         {readFullChapterSrtate}
         {openCommentModalState}
         {loadingState === "done" && verseContent && (
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
         )}
         {loadingState === "loading" && (
            <CardsLazyLoading amount={1} compClass={cardsLazyLoadingStyles.wigoDailyVerse} />
         )}

         {loadingState === "error" && <ResourceNotFoundError />}
      </>
   );
};

export default RandomDailyVerse;
