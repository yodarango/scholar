import Link from "next/link";

// components
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "../chunks/icons";

// styles
import styles from "./user_notification.module.css";

// types
import { TUserNotification } from "../../types/account";

export const UserNotifications = ({ body, postType, postId }: TUserNotification) => {
   const type =
      postType === 0
         ? "commentary"
         : postType === 1
         ? "quote"
         : postType === 2
         ? "thought"
         : "sermon-note";

   return (
      <Link href={`/posts/${type}/${postId}`}>
         <a>
            <div className={styles.mainWrapper}>
               {postType === 0 && (
                  <div className={`${styles.icon}`}>
                     <Icon name='comment' color='#F1EAFF' size='2rem' />
                  </div>
               )}
               {postType === 1 && (
                  <div className={`${styles.icon}`}>
                     <Icon name='quote' color='#F1EAFF' size='2rem' />
                  </div>
               )}
               {postType === 2 && (
                  <div className={`${styles.icon}`}>
                     <Icon name='think' color='#F1EAFF' size='2rem' />
                  </div>
               )}
               {postType === 3 && (
                  <div className={`${styles.icon}`}>
                     <Icon name='folder' color='#F1EAFF' size='2rem' />
                  </div>
               )}
               <Parragraph text={body} size='xsmall' />
            </div>
         </a>
      </Link>
   );
};
