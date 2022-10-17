// components
import { SearchInputWCat } from "../../fragments/search_input_w_cat";
import { ThoughtsGrid } from "../../layouts/scrollers/user_content/thoughts_grid";

// styles
import styles from "./quotes_all.module.css";

export const ThoughtsAll = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.searchFilter}>
            <div className={styles.search}>
               <SearchInputWCat placeHolder='Search anything...' />
            </div>
         </div>
         <div className={styles.postsWrapper}>
            <ThoughtsGrid />
         </div>
      </div>
   );
};
