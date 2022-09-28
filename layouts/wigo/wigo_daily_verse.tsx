import { useState } from "react";

// components
import { DailyVerseImage } from "../../fragments/cards/daily_verse_image";
import { WigoDailyVerseOptions } from "../../fragments/wigo_daily_verse_options";

//styles
import styles from "./wigo_daily_verse.module.css";

export const WigoDailVerse = () => {
   // state
   const [imgSrc, setImgSrc] = useState<string>("");
   const [verseId, setverseId] = useState<string>("");
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.image}>
            <DailyVerseImage
               cta={{
                  handleSendImgSrc: (src: string) => setImgSrc(src),
                  handleSendVerseId: (vId: string) => setverseId(vId)
               }}
            />
         </div>
         <div className={styles.options}>
            <WigoDailyVerseOptions imgSrc={imgSrc} verseId={verseId} />
         </div>
      </div>
   );
};
