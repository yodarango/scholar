//! #COMEBACK Component not able to be tested in stories since it includes router and having trouble setting it up with Storybook
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components
import { BibleLanguage } from "../../fragments/buttons/bible_language";
import {
   BibleVersionScripture,
   TBiblePreferences
} from "../../fragments/buttons/bible_version_scripture";

// styles
import styles from "./Bible_preferences.module.css";

export const BiblePreferences = () => {
   // ---------------- router -----------------
   const router = useRouter();
   // -------------------------------- states -----------------------
   const [BiblePreferences, setBiblePreferences] = useState<TBiblePreferences | null>(null);

   const getLocalStorage = () => {
      if (localStorage.getItem("reading-preferences")) {
         const prefs = localStorage.getitem("reading-preferences");
         let parsedPrefs: TBiblePreferences = JSON.parse(prefs);

         // set the new values
         setBiblePreferences(parsedPrefs);
      } else {
         const newBibleprefs: TBiblePreferences = {
            versionId: "english",
            versionName: "KJV",
            bibleLanguage: "english",
            scriptureRef: "John 1"
         };
         localStorage.setItem("reading-preferences", JSON.stringify(newBibleprefs));
         setBiblePreferences(newBibleprefs);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         getLocalStorage();
      }
   }, [router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         {BiblePreferences && (
            <>
               <div>
                  <BibleLanguage
                     cta={(lang: string) => console.log(lang)}
                     language={BiblePreferences.bibleLanguage}
                  />
               </div>
               <div>
                  <BibleVersionScripture
                     cta={(content) => console.log(content)}
                     BiblePreferences={BiblePreferences}
                  />
               </div>
            </>
         )}
      </div>
   );
};
