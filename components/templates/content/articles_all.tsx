// components
import { SearchInputWCat } from "../../fragments/search_input_w_cat";
import { ArticlesGrid } from "../../layouts/scrollers/user_content/articles_grid";

// styles
import styles from "./quotes_all.module.css";

export const ArticlesAll = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.searchFilter}>
            <div className={styles.search}>
               <SearchInputWCat initialValInComp={true} placeHolder='Search anything...' />
            </div>
         </div>
         <div className={styles.postsWrapper}>
            <ArticlesGrid />
         </div>
      </div>
   );
};
