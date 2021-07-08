// core
import React, { useState } from "react";
import Link from "next/link";

// components

// styles
import randomDailyVerseStyles from "../../styles/fragments/squares/RandomDailyVerse.module.css";

// helpers
import { randomVerses } from "../../helpers/random-daily-verses";

const RandomDailyVerse = () => {
   // ========== Fetch random verse every 24hrs the
   type IrandomVerseState = {
      reference: string;
      content: string;
   };

   const dailyVerse = () => {
      const bookIndex = Math.floor(Math.random() * randomVerses.length);
      const bookId = randomVerses[bookIndex].id;
      const chapterIndex = Math.floor(Math.random() * randomVerses[bookIndex].chapter.length);
      const verseIndex = Math.floor(
         Math.random() * randomVerses[bookIndex].chapter[chapterIndex].verses.length
      );
      console.log(`${bookId}.${chapterIndex}.${verseIndex}`);
   };

   const [initialVerse, setInitialVerse] = useState<string>("EST.8.9");
   const [randomVerseState, setRandomVerseState] = useState<IrandomVerseState>({
      reference: "John 3:16",
      content: "for God so love the world"
   });

   return (
      <div className={randomDailyVerseStyles.squaredCardWrapper}>
         <p className='std-text-block--info'>{randomVerseState.reference}</p>
         <p className={`std-text-block ${randomDailyVerseStyles.dailyVerse}`}>
            {randomVerseState.content}
         </p>

         <div className={`${randomDailyVerseStyles.squaredCardWrapperFooter}`}>
            <div className={randomDailyVerseStyles.footerWrapRight}>
               <Link href={{ pathname: "new-post/commentary", query: { verse: initialVerse } }}>
                  <a className={`std-vector-icon ${randomDailyVerseStyles.commentIcon}`}></a>
               </Link>
            </div>
            <div className={randomDailyVerseStyles.footerWrapLeft} onClick={dailyVerse}>
               <div className={`std-vector-icon ${randomDailyVerseStyles.readIcon}`}></div>
            </div>
         </div>
      </div>
   );
};

export default RandomDailyVerse;
