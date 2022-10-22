/**************************************************************************************** 
- Makes a bible verse image out of a randomly chosen bible verse and image.
   - The image src and the verse ID get passed to the parent via the cta's so that the 
     image can be downloaded, commented on, etc
****************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//styles
import styles from "./daily_verse_image.module.css";

// helpers
import { setDailyVerseCache } from "../../../helpers/APIs/set_daily_verse_cache";
import { TBibleVerse } from "../../../types/bible_api";

type TDailyVerseImageProps = {
   versionId?: string;
   cta: {
      handleSendImgSrc: (src: string) => void;
      handleSendVerseId: (verseId: string) => void;
   };
};

export const DailyVerseImage = ({
   versionId = "de4e12af7f28f599-02",
   cta
}: TDailyVerseImageProps) => {
   //  router
   const router = useRouter();

   //  state
   const [verse, setVerse] = useState<null | TBibleVerse>(null);

   // get a new verse
   const getVerse = async () => {
      const dailyVerse = await setDailyVerseCache(versionId);
      setVerse(dailyVerse.data);

      // send the verseId to the parent
      cta.handleSendVerseId(dailyVerse.data.id);
   };

   useEffect(() => {
      if (router.isReady) {
         getVerse();
         // send the image to the parent
         cta.handleSendImgSrc(
            `sm_logo.png` /*`/images/daily_verse_backgrounds/${randomImg}.jpeg`*/
         );
      }
   }, [router.isReady]);

   //    Random image number
   const randomImg = Math.floor(Math.random() * 31);
   // Random font class
   const fontClass = Math.floor(Math.random() * 3);

   return (
      <div className={`${styles.mainWrapper}`}>
         <h1
            className={`${styles.text} ${
               fontClass === 0
                  ? styles.fontOne
                  : fontClass === 1
                  ? styles.fontTwo
                  : styles.fontThree
            }`}>
            {verse && verse.content}
         </h1>
         <p className={styles.reference}>{verse && verse.reference}</p>
         <div className={styles.img}>
            <img
               src={`sm_logo.png` /*`/images/daily_verse_backgrounds/${randomImg}.jpeg`*/}
               alt='bible verse with background'
            />
         </div>
      </div>
   );
};
