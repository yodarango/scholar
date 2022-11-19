// components
import { CommentariesGrid } from "../../layouts/scrollers/user_content/commentaries_grid";
import { CommentaryFilter } from "../../../components/fragments/commentary_filter";
import { SearchInputWCat } from "../../../components/fragments/search_input_w_cat";

// styles
import styles from "./commentaries_all.module.css";

export const CommentariesAll = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.searchFilter}>
            <div className={styles.search}>
               {/* TODO: Add body and category_values initial values from the router query when not
               /empty*/}
               <SearchInputWCat initialValInComp={true} placeHolder='Search anything...' />
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
