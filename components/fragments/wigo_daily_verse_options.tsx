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
   return (
      <div className={styles.mainWrapper}>
         {imgSrc && (
            <div>
               <IconButton
                  cta={{ handleClick: () => downloadImage(imgSrc) }}
                  icon='cloudDownload'
                  backgroundColor='1'
               />
            </div>
         )}

         <div>
            <IconButton icon='read' backgroundColor='1' link={`/read?VERSE_ID=${verseId}`} />
         </div>

         <div>
            <IconButton
               link={`/posts/commentary/new?VERSE_ID?${verseId}`}
               icon='comment'
               backgroundColor='1'
            />
         </div>
      </div>
   );
};
