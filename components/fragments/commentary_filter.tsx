import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// comps
import { Secondary } from "./buttons/secondary";

//styles
import styles from "./commentary_filter.module.css";

export const CommentaryFilter = () => {
   // router
   const router = useRouter();

   // state
   const [buttonActive, setbuttonActive] = useState<string | string[] | null>("0");
   const [filterURl, setfilterURl] = useState<string | string[] | null>(null);

   ///get router info
   useEffect(() => {
      if (router.isReady) {
         if (router.query["verse-id"]) {
            const verseId = router.query["verse-id"];
            setfilterURl(`?verse-id=${verseId}&`);
         } else {
            setfilterURl(`?`);
         }

         if (router.query["filter"]) {
            setbuttonActive(router.query["filter"]);
         } else {
            setbuttonActive("0");
         }
      }
   }, [router.isReady, router.query]);

   return (
      <div className={styles.mainWrapper}>
         {filterURl && (
            <>
               <div className={styles.all}>
                  <Secondary
                     type={buttonActive === "0" ? "4" : "3"}
                     title='General'
                     icon='🌎'
                     fullWidth
                     cta={{ hand }}
                  />
               </div>
               <div className={styles.trusted}>
                  <Secondary
                     type={buttonActive === "1" ? "4" : "3"}
                     title='Trusted'
                     icon='⭐️'
                     fullWidth
                     url={`${filterURl}filter=1`}
                  />
               </div>
               <div className={styles.classic}>
                  <Secondary
                     type={buttonActive === "2" ? "4" : "3"}
                     title='Classic'
                     icon='🎩'
                     fullWidth
                     url={`${filterURl}filter=2`}
                  />
               </div>
            </>
         )}
      </div>
   );
};
