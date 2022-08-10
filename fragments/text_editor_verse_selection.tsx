// TODO: implement verse selection

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// comps
import { Header } from "./Typography/header";
import { Parragraph } from "./Typography/parragraph";
import { Primary } from "./buttons/primary";

// styles
import styles from "./text_editor_verse_selection.module.css";

// helpers
import { fetchBibleVerse } from "../helpers/APIs/fetch_bible_verse";
// types
import { TBibleVerse } from "../types/bible_api";
import { RoundLoader } from "./chunks/round_loader";
import { ResourceNotFoundError } from "./chunks/error_resource_not_found";

export const TextEditorVerseSelection = () => {
   const [buttonTitle, setbuttonTitle] = useState<string>("");
   const [verseData, setverseData] = useState<null | TBibleVerse>(null);
   const [loading, setLoading] = useState<string>("loading");

   // router
   const router = useRouter();

   // call the bible verse
   const fetchVerse = async (verseId: string | undefined | string[]) => {
      const verse = await fetchBibleVerse(verseId);

      if (verse !== null) {
         setLoading("done");
      } else {
         setLoading("error");
      }

      setverseData(verse);
   };

   // fetch data on render
   useEffect(() => {
      const verseId: string | undefined | string[] = router.query["verse-id"];

      if (router.isReady && router.query["verse-id"]) {
         fetchVerse(verseId);
         setbuttonTitle("Change scripture");
      } else {
         setverseData(null);
         setbuttonTitle("Select scripture");
         setLoading("done");
      }
   }, [router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         {/* content */}
         {verseData && loading === "done" && (
            <>
               <div className={styles.title}>
                  <Header type={2} text={verseData.reference} size='main' quiet={true} />
               </div>

               <div className={styles.verse}>
                  <Parragraph size='main' text={verseData.content} />
               </div>
            </>
         )}

         {/* loader */}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {/* error */}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
         <div>
            <Primary type='2' title={buttonTitle} cta={{ handleClick: () => {} }} />
         </div>
      </div>
   );
};
