import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//styles
import styles from "./daily_verse_card.module.css";

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
      setVerse(dailyVerse.data);
   };

   useEffect(() => {
      if (router.isReady) {
         getVerse();
      }
   }, [router.isReady]);

   //    Random image number
   const randomImg = Math.floor(Math.random() * 31);
   return (
      <div className={styles.mainWrapper}>
         <h1 className={styles.text}>{verse}</h1>
         <div className={styles.img}>
            <img
               src={`/images/daily_verse_backgrounds/${randomImg}.png`}
               alt='bible verse with background'
            />
         </div>
      </div>
   );
};
