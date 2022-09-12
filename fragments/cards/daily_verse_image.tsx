import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//styles
import styles from "./daily_verse_image.module.css";

// helpers
import { setDailyVerseCache } from "../../helpers/APIs/set_daily_verse_cache";
import { TBibleVerse } from "../../types/bible_api";

type TDailyVerseImageProps = {
   versionId?: string;
};

export const DailyVerseImage = ({ versionId = "de4e12af7f28f599-02" }: TDailyVerseImageProps) => {
   //  router
   const router = useRouter();

   //  state
   const [verse, setVerse] = useState<null | TBibleVerse>(null);

   // get a new verse
   const getVerse = async () => {
      const dailyVerse = await setDailyVerseCache(versionId);
      console.log(dailyVerse);
      setVerse(dailyVerse.data);
   };

   useEffect(() => {
      if (router.isReady) {
         getVerse();
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
               src={`/images/daily_verse_backgrounds/${randomImg}.jpeg`}
               alt='bible verse with background'
            />
         </div>
      </div>
   );
};
