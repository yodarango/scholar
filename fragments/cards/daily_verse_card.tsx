/********************************************************************************************* 
   This component loads a specific verse either by calling 
   it using the link query or by choosing a new verse manually 
   calling the "ScripturePicker" componennt which in effect calls 
   the proper additional components 
   
*********************************************************************************************/

// core
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import { TverseContent } from "../../pages";
import { Icon } from "../chunks/icons";
import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../../layouts/resource-not-found-error";

// styles
import styles from "./daily_verse_card.module.css";

// helpers: types

type dailyVerseProps = {
   verseContent?: TverseContent | undefined;
   versionId: string;
};

export const DailyVerseCard = ({ verseContent, versionId }: dailyVerseProps) => {
   // -------------------------- hooks --------------------
   const router = useRouter();
   //? implement helper to fetch a bible verse. decide whether to use the already existing one "data/APIs/fetch_bible_verse.ts" or implement a new on
   //? This compent should be responsible for its own data fetching

   return (
      <>
         <div className={styles.mainWrapper}>
            {verseContent && (
               <div className={styles.squaredCardWrapper}>
                  {/* --------------------- title ---------------------- */}
                  <div className={styles.title}>
                     <Header
                        text={verseContent.reference}
                        type={3}
                        size='main'
                        align='center'
                        lineHieght='.9'
                     />
                  </div>

                  {/* --------------------- content ---------------------- */}
                  <div className={styles.content}>
                     <Parragraph text={verseContent.content} size='main' align='center' />
                  </div>

                  {/* --------------------- card actions ----------------- */}
                  <div className={styles.actions}>
                     <Link href={`/?verse=${verseContent.previous.id}`}>
                        <a>
                           <Icon name='arrowBack' size='2rem' color='#F1EAFF' />
                        </a>
                     </Link>
                     <div>
                        <Icon name='comment' size='2rem' color='#F1EAFF' />
                     </div>
                     <Link href={`/?verse=${verseContent.next.id}`}>
                        <a>
                           <Icon name='arrowForth' size='2rem' color='#F1EAFF' />
                        </a>
                     </Link>
                  </div>
               </div>
            )}
            {/* {!verseContent && !err && (
               <CardsLazyLoading amount={1} compClass={cardLazyLoadingStyles.dailyVerseCard} />
            )}
            {err && <ResourceNotFoundError />} */}
         </div>
      </>
   );
};
