/********************************************************************************************* 
-  This component loads a specific verse by calling the verse-id in the router. If no verse-id 
   value is found in the router, however, a default verse will be returned by the helper
   function making the call.
-  The Component listens to the router change, therefore a new verse will load each  time the
   router query changes
*********************************************************************************************/

// core
import { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import { Icon } from "../chunks/icons";
import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";
import { ResourceNotFoundError } from "../chunks/error_resource_not_found";

// styles
import styles from "./daily_verse_card.module.css";

// helpers: types
import { fetchBibleVerseWDefault } from "../../../helpers/APIs/fetch_bible_verse_with_default";
import { RoundLoader } from "../chunks/round_loader";

type TypeDailyVerseCardProps = {
   withOutActions?: boolean;
   canComment?: boolean;
};

export const DailyVerseCard = memo(({ withOutActions, canComment }: TypeDailyVerseCardProps) => {
   //  hooks
   const [verseContent, setverseContent] = useState<any>(null);
   const [loading, setloading] = useState<string>("loading");

   //  make the call to the API on useEffect and router.isReady
   const getVerseDate = async (verseId: string, version?: string) => {
      try {
         const verse = await fetchBibleVerseWDefault(verseId, version);

         if (!verse) {
            setverseContent(null);
            setloading("error");
         } else {
            setverseContent(verse);

            setloading("done");
         }
      } catch (error) {
         console.log(error);
      }
   };

   // get the data
   const router = useRouter();
   useEffect(() => {
      const hasPreferences = localStorage.getItem("reading-preferences");
      const hasPreferencesObj = JSON.parse(hasPreferences || "{}");
      const personalVerse = localStorage.getItem("todays-verse");
      const personalVerseObj = JSON.parse(personalVerse || "{}");

      if (router.isReady) {
         const verseId = router.query["VERSE_ID"] as string;
         if (verseId) {
            getVerseDate(verseId, hasPreferencesObj?.vesionId);
         } else if (!verseId && personalVerse) {
            setverseContent(personalVerseObj.data);

            setloading("done");
         } else {
            getVerseDate(hasPreferencesObj?.vesionId);
         }
      }
   }, [router.isReady, router.query]);

   return (
      //  loading state
      <div className={styles.mainWrapper}>
         {loading === "loading" && (
            <div className={`${styles.card} ${styles.loadinCard}`}>
               <div className={styles.title}>
                  <Header text='Loading...' type={3} size='main' align='center' lineHieght='.9' />
               </div>
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            </div>
         )}

         {/*  load content  */}

         {verseContent && loading === "done" && (
            <div className={`${styles.card} ${withOutActions ? styles.cardWithOutActions : ""}`}>
               {/*  title  */}
               <div className={styles.title}>
                  <Header
                     text={verseContent.reference}
                     type={3}
                     size='main'
                     align='center'
                     lineHieght='.9'
                  />
               </div>

               {/*  content  */}
               <div
                  className={`${styles.content} ${
                     withOutActions ? styles.contentWithOutActions : ""
                  }`}>
                  <Parragraph text={verseContent.content} size='main' align='center' />
               </div>

               {/* --------------------- card actions ----------------- */}
               {!withOutActions && (
                  <div className={styles.actions}>
                     <Link href={`/explore?VERSE_ID=${verseContent.previous.id}`}>
                        <a>
                           <Icon name='arrowBack' size='2rem' color='#F1EAFF' />
                        </a>
                     </Link>

                     {canComment && (
                        <Link href={`/posts/commentary/new?VERSE_ID=${verseContent.id}`}>
                           <a>
                              <Icon name='comment' size='2rem' color='#F1EAFF' />
                           </a>
                        </Link>
                     )}

                     <Link href={`/explore?VERSE_ID=${verseContent.next.id}`}>
                        <a>
                           <Icon name='arrowForth' size='2rem' color='#F1EAFF' />
                        </a>
                     </Link>
                  </div>
               )}
            </div>
         )}
         {loading === "error" && (
            <div className={`${styles.card} ${styles.loadinCard}`}>
               <div className={styles.title}>
                  <Header
                     text='There was an error'
                     type={3}
                     size='main'
                     align='center'
                     lineHieght='.9'
                  />
               </div>
               <div className={styles.error}>
                  <ResourceNotFoundError />
               </div>
            </div>
         )}
      </div>
   );
});
