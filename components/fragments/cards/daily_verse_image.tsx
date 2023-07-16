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
import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";

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
   const [fontStyles, setFontStyles] = useState<string>("");
   const [randomImg, setRandomImg] = useState<number>(0);

   // get a new verse
   const getVerse = async () => {
      const dailyVerse = await setDailyVerseCache(versionId);
      setVerse(dailyVerse?.data);

      // send the verseId to the parent
      cta.handleSendVerseId(dailyVerse?.data?.id);
   };

   useEffect(() => {
      if (router.isReady) {
         getVerse();
         // send the image to the parent
         cta.handleSendImgSrc(`/images/daily_verse_backgrounds/${randomImg}.jpeg`);
      }
   }, [router.isReady]);

   useEffect(() => {
      // choose image based on random number
      const randomImg = Math.floor(Math.random() * 31);
      setRandomImg(randomImg);
      // Random font class
      const fontClass = Math.floor(Math.random() * 3);
      // get the right font class
      const fontStyles =
         fontClass === 0 ? styles.fontOne : fontClass === 1 ? styles.fontTwo : styles.fontThree;
      setFontStyles(fontStyles);
   }, []);

   // I was not happy with the fancy fonts so I commented them out
   return (
      <>
         {fontStyles && (
            <div className={`${styles.mainWrapper}`}>
               <div className={styles.textContainer}>
                  {/* <h1 className={`${styles.text} ${fontStyles}`}>{verse && verse.content}</h1> */}
                  <Header
                     className={styles.text}
                     type={3}
                     size='main'
                     text={verse?.content || ""}
                     align='center'
                  />
                  {/* <p className={styles.reference}>{verse && verse.reference}</p> */}
                  <Parragraph
                     className={styles.reference}
                     text={verse?.reference || ""}
                     align='center'
                     size='small'
                  />
               </div>
               <div className={styles.img}>
                  <div className={styles.imgBgOverlay}></div>
                  <img
                     src={`/images/daily_verse_backgrounds/${randomImg}.jpeg`}
                     alt='bible verse with background'
                  />
               </div>
            </div>
         )}
      </>
   );
};
