import Link from "next/link";

// components
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "../chunks/icons";

// styles
import styles from "./user_notification.module.css";
import { FONT_COLOR } from "../../../constants/tokens";

// types

export const UserNotifications = ({ body, postType, postId, isOpen }: any) => {
   const type =
      postType === 0
         ? "commentary"
         : postType === 1
         ? "quote"
         : postType === 2
         ? "article"
         : "sermon-note";

   return (
      <Link href={`/posts/${type}/${postId}`}>
         <a>
            <div className={styles.mainWrapper}>
               {postType === 0 && (
                  <div className={`${styles.icon}`}>
                     <Icon name='comment' color={FONT_COLOR} size='2rem' />
                  </div>
               )}
               {postType === 1 && (
                  <div className={`${styles.icon}`}>
                     <Icon name='quote' color={FONT_COLOR} size='2rem' />
                  </div>
               )}
               {postType === 2 && (
                  <div className={`${styles.icon}`}>
                     <Icon name='think' color={FONT_COLOR} size='2rem' />
                  </div>
               )}
               {postType === 3 && (
                  <div className={`${styles.icon}`}>
                     <Icon name='folder' color={FONT_COLOR} size='2rem' />
                  </div>
               )}
               <Parragraph text={body} size='xsmall' />
               {!isOpen && <span className={styles.unreadTag}></span>}
            </div>
         </a>
      </Link>
   );
};
