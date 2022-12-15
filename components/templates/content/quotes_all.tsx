import { useRouter } from "next/router";

// components
import { SearchInputWCat } from "../../fragments/search_input_w_cat";
import { QuotesGrid } from "../../layouts/scrollers/user_content/quotes_grid";

// styles
import styles from "./quotes_all.module.css";

export const QuotesAll = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.searchFilter}>
            <div className={styles.search}>
               <SearchInputWCat initialValInComp={true} placeHolder='Search anything...' />
            </div>
         </div>

         <div className={styles.postsWrapper}>
            <QuotesGrid />
         </div>
      </div>
   );
};
