// comps
import { Icon } from "./chunks/icons";
import { PostReactions } from "./post_reactions";

// styles
import styles from "./quote_reactions.module.css";

export const QuoteReactions = () => {
   return (
      <div className={styles.mainWrapper}>
         <PostReactions />
         <div className={styles.ellipsis} onClick={() => console.log("open more options in story")}>
            <Icon name='ellipsisH' size='2rem' color='#F1EAFF' />
         </div>
      </div>
   );
};
