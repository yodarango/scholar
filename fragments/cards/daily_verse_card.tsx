/********************************************************************************************* 
   //! not able to load in stories due to the useRouter hook by next
-  This component loads a specific verse by calling the verse-id in the router. If no verse-id 
   value is found in the router, however, a default verse will be returned by the helper
   function making the call.
-  The Component listens to the router change, therefore a new verse will load each  time the
   router query changes
*********************************************************************************************/

// core
import { useState, useEffect } from "react";
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
import { fetchBibleVerseWDefault } from "../../helpers/APIs/fetch_bible_verse_with_default";

type dailyVerseProps = {
   versionId: string;
};

export const DailyVerseCard = ({ versionId }: dailyVerseProps) => {
   // -------------------------- hooks --------------------
   const [verseContent, setverseContent] = useState<TverseContent | null>(null);
   const [loading, setloading] = useState<string>("loading");

   // ----------------- make the call to the API on useEffect and router.isReady
   const getVerseDate = async () => {
      const verseId = router.query["verse-id"];

      const verseContent = await fetchBibleVerseWDefault(verseId);

      if (!verseContent) {
         setverseContent(null);
         setloading("error");
      } else {
         setverseContent(verseContent);
         setloading("done");
      }
   };

   const router = useRouter();
   useEffect(() => {
      if (router.isReady) {
         getVerseDate();
      }
   }, [router.isReady, router.query]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "loading" && <h1>Loading</h1>}
         {verseContent && loading === "done" && (
            <div className={styles.card}>
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
         {loading === "error" && <h1>There was ab error</h1>}
         {/* {loading === "error" && <CardsLazyLoading amount={1} compClass={styles.dailyVerseCard} />} */}
         {/* {err && <ResourceNotFoundError />}  */}
      </div>
   );
};
