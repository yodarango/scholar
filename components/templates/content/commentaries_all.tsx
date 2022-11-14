// components
import { CommentariesGrid } from "../../layouts/scrollers/user_content/commentaries_grid";
import { CommentaryFilter } from "../../fragments/commentary_filter";
import { SearchInputWCat } from "../../fragments/search_input_w_cat";

// styles
import styles from "./commentaries_all.module.css";

export const CommentariesAll = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.searchFilter}>
            <div className={styles.search}>
               <SearchInputWCat placeHolder='Search anything...' />
            </div>
            <div className={styles.filter}>
               <CommentaryFilter />
            </div>
         </div>

         <div className={styles.postsWrapper}>
            <CommentariesGrid />
         </div>
      </div>
   );
};
