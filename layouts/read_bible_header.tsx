import { BibleLanguage } from "../fragments/buttons/bible_language";
import { BibleVersionScripture } from "../fragments/buttons/bible_version_scripture";
import { ReadBookmark } from "../fragments/chunks/read_bookmark";
import { ReadSettings } from "../fragments/chunks/read_settings";

// styles
import styles from "./read_bible_header.module.css";

type TReadBibleHeaderProps = {
   isChapeterBookmarked: boolean;
   language: string;
};
export const ReadBibleHeader = ({ language, isChapeterBookmarked }: TReadBibleHeaderProps) => {
   return (
      <div className={styles.mainWrpper}>
         <div className={styles.language}>
            <BibleLanguage
               language={language}
               cta={{ handleSelection: (value: string) => console.log(value) }}
            />
         </div>
         <div className={styles.versionScripture}>
            <BibleVersionScripture cta={{ handleSelection: (x) => console.log(x) }} />
         </div>
         <div className={styles.bookmarks}>
            <ReadBookmark
               chapterId='GEN.1'
               bookMarks={["1CO.2", "JHN.3", "MAT.1"]}
               isBookMarked={isChapeterBookmarked}
            />
         </div>
         <div className={styles.settings}>
            <ReadSettings
               cta={{
                  handleFontSelection: (value: string) => console.log(value),
                  handleThemeSelection: (value: string) => console.log(value)
               }}
            />
         </div>
      </div>
   );
};
