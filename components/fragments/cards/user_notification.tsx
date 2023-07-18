import Link from "next/link";

// components
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "../chunks/icons";

// styles
import styles from "./user_notification.module.css";
import { FONT_COLOR } from "../../../constants/tokens";
import {
   POST_TYPE_ARTICLE,
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE
} from "../../../constants/defaults";

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
               {postType === POST_TYPE_COMMENTARY && (
                  <div className={`${styles.icon}`}>
                     <Icon name='comment' color={FONT_COLOR} size='2rem' />
                  </div>
               )}
               {postType === POST_TYPE_QUOTE && (
                  <div className={`${styles.icon}`}>
                     <Icon name='quote' color={FONT_COLOR} size='2rem' />
                  </div>
               )}
               {postType === POST_TYPE_ARTICLE && (
                  <div className={`${styles.icon}`}>
                     <Icon name='article' color={FONT_COLOR} size='2rem' />
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
