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
   const [buttonActive, setbuttonActive] = useState<number>(0);
   const [filterURl, setfilterURl] = useState<string | string[] | null>("");

   // get router info
   useEffect(() => {
      if (router.isReady) {
         if (router.query["verse-id"]) {
            const verseId = router.query["verse-id"];
            setfilterURl(`test?verse-id=${verseId}&`);
         } else {
            setfilterURl(`test?`);
         }
      }
   }, [router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.all}>
            <Secondary
               type={buttonActive === 1 ? "4" : "3"}
               title='General'
               icon='🌎'
               fullWidth
               url={`${filterURl}filter=0`}
            />
         </div>
         <div className={styles.trusted}>
            <Secondary
               type={buttonActive === 2 ? "4" : "3"}
               title='Trusted'
               icon='⭐️'
               fullWidth
               url={`${filterURl}filter=1`}
            />
         </div>
         <div className={styles.classic}>
            <Secondary
               type={buttonActive === 3 ? "4" : "3"}
               title='Classic'
               icon='🎩'
               fullWidth
               url={`${filterURl}filter=2`}
            />
         </div>
      </div>
   );
};
