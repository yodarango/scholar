// comps
import { Parragraph } from "../Typography/parragraph";

// style
import styles from "./notification_sticker.module.css";

type TNotificationStickerProps = {
   type: string;
   text: string;
};

export const NotificationSticker = ({ type, text }: TNotificationStickerProps) => {
   return (
      <>
         {type === "1" && (
            <div className={`${styles.mainWrapper} ${styles.informative}`}>
               <div className={styles.message}>
                  <Parragraph text={text} size='xsmall' />
               </div>
            </div>
         )}

         {type === "2" && (
            <div className={`${styles.mainWrapper} ${styles.informativeQuiet}`}>
               <div className={styles.message}>
                  <Parragraph text={text} size='xsmall' />
               </div>
            </div>
         )}

         {type === "3" && (
            <div className={`${styles.mainWrapper} ${styles.success}`}>
               <div className={styles.message}>
                  <Parragraph text={text} size='xsmall' />
               </div>
            </div>
         )}

         {type === "4" && (
            <div className={`${styles.mainWrapper} ${styles.warning}`}>
               <div className={styles.message}>
                  <Parragraph text={text} size='xsmall' color='#38304B' />
               </div>
            </div>
         )}

         {type === "5" && (
            <div className={`${styles.mainWrapper} ${styles.danger}`}>
               <div className={styles.message}>
                  <Parragraph text={text} size='xsmall' />
               </div>
            </div>
         )}
      </>
   );
};
