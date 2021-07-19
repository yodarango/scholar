// core
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// components
import Chapter from "../../helpers/fetch-bible-chapter";

// styles
import randomDailyVerseStyles from "../../styles/fragments/squares/RandomDailyVerse.module.css";
import scripturesHTMLStyles from "../../styles/fragments/popup-content/ScripturesHTML.module.css";

// helpers
import { getNewVerseId } from "../../helpers/random-daily-verses";
import { bibleApi } from "../../env";

const RandomDailyVerse = () => {
   // ========== Fetch random verse every 24hrs the
   type IverseId = {
      bibleId?: string;
      bookId?: string;
      chapterId?: string;
      content?: string;
      copyright?: string;
      id?: string;
      next?: { id: string; number: string };
      orgId?: string;
      previous?: { id: string; number: string };
      reference?: string;
      verseCount?: number;
   };

   const [verseIdState, setVerseIdState] = useState<IverseId>({ id: getNewVerseId() });
   const dailyVerse = async () => {
      try {
         const requ = await fetch(
            `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${verseIdState.id}?content-type=text&include-verse-numbers=false`,
            {
               method: "GET",
               headers: {
                  "api-key": bibleApi
               }
            }
         );

         const json = await requ.json();
         setVerseIdState(json.data);
         return json.data;
      } catch (error) {
         setVerseIdState({ content: "Oh no! An error ocurred! We are on it! " });
         console.log(error);
      }
   };

   useEffect(() => {
      dailyVerse();
   }, []);

   // ===============   FUNCTION: read the entire chapter based on the daily verse
   const [readFullChapterSrtate, setReadFullChapterSrtate] = useState<JSX.Element | boolean>(false);
 
   const readDailyVerse = () => {
      console.log(verseIdState.chapterId);
      setReadFullChapterSrtate(
         <>
            <div className='dark-bkg'>
               <div
                  className={`closeModal ${scripturesHTMLStyles.closeModal}`}
                  onClick={() => setReadFullChapterSrtate(false)}>
                  X
               </div>
               <div className='medium-spacer'></div>
               <div className={`dark-bkg_content-holder`}>
                  {<Chapter chapterId={verseIdState.chapterId} />}
               </div>
            </div>
         </>
      );
   };

   return (
      <>
         {readFullChapterSrtate}
         <div className={randomDailyVerseStyles.squaredCardWrapper}>
            <p className='std-text-block--info'>{verseIdState.reference}</p>
            <p className={`std-text-block ${randomDailyVerseStyles.dailyVerse}`}>
               {verseIdState.content}
            </p>

            <div className={`${randomDailyVerseStyles.squaredCardWrapperFooter}`}>
               <div className={randomDailyVerseStyles.footerWrapRight}>
                  <Link
                     href={{ pathname: "new-post/commentary", query: { verse: verseIdState.id } }}>
                     <a className={`std-vector-icon ${randomDailyVerseStyles.commentIcon}`}></a>
                  </Link>
               </div>
               <div className={randomDailyVerseStyles.footerWrapLeft} >
                  <div className={`std-vector-icon ${randomDailyVerseStyles.readIcon}`} onClick={readDailyVerse}></div>
               </div>
            </div>
         </div>
      </>
   );
};

export default dynamic(() => Promise.resolve(RandomDailyVerse), { ssr: false });
//export default RandomDailyVerse;
