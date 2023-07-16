// comps
import { IconButton } from "./buttons/icon_button";

// styles
import styles from "./wigo_daily_verse_options.module.css";

//helpers
import { downloadImage } from "../../helpers/content/download_image";

type TWigoDailyVerseOptionsProps = {
   imgSrc: string;
   verseId: string;
};

export const WigoDailyVerseOptions = ({
   imgSrc = `sm_logo.png`,
   verseId
}: TWigoDailyVerseOptionsProps) => {
   let chapterId = verseId ? verseId.split(".") : "GEN.1";
   chapterId = `${chapterId[0]}.${chapterId[1]}`;

   return (
      <div className={styles.mainWrapper}>
         {/* removing this option for now */}
         {/* {imgSrc && (
            <div>
               <IconButton
                  cta={{ handleClick: () => downloadImage(imgSrc) }}
                  icon='cloudDownload'
                  backgroundColor='1'
               />
            </div>
         )} */}

         <div>
            <IconButton
               iconSize='3rem'
               icon='read'
               backgroundColor='1'
               link={`/read/@me/?chapter-id=${chapterId}`}
            />
         </div>

         <div>
            <IconButton
               iconSize='3rem'
               link={`/posts/commentary/new?VERSE_ID=${verseId}`}
               icon='comment'
               backgroundColor='1'
            />
         </div>
      </div>
   );
};
