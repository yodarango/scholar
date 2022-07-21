import { Parragraph } from "../Typography/parragraph";
import styles from "./bible_version_scrpture.module.css";

type TBibleVersionScriptureProps = {
   version: string;
   scriptureRef: string;
};

export const BibleVersionScripture = ({ version, scriptureRef }: TBibleVersionScriptureProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.optionsWrapper}>
            <div className={`${styles.version} ${styles.option}`} onClick={}>
               <Parragraph text={version} size='small' align='left' quiet={true} />
            </div>
            <div className={`${styles.scriptureRef}  ${styles.option}`} onClick={}>
               <Parragraph text={scriptureRef} size='small' align='left' quiet={true} />
            </div>
         </div>
      </div>
   );
};
