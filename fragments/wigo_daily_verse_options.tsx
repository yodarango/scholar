// comps
import { IconButton } from "./buttons/icon_button";

// styles
import styles from "./wigo_daily_verse_options.module.css";

type TWigoDailyVerseOptionsProps = {};

export const WigoDailyVerseOptions = ({}: TWigoDailyVerseOptionsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div>
            <IconButton
               cta={() => console.log("download image")}
               icon='cloudDownload'
               backgroundColor='1'
            />
         </div>

         <div>
            <IconButton icon='read' backgroundColor='1' link='/read' />
         </div>

         <div>
            <IconButton
               cta={() => console.log("comment one verse")}
               icon='comment'
               backgroundColor='1'
            />
         </div>
      </div>
   );
};
