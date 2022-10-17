// components
import { SearchInputWCat } from "../../fragments/search_input_w_cat";
import { SermonNotesGrid } from "../../layouts/scrollers/user_content/sermon_notes_grid";

// styles
import styles from "./quotes_all.module.css";

export const SermonNotesAll = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.searchFilter}>
            <div className={styles.search}>
               <SearchInputWCat placeHolder='Search anything...' />
            </div>
         </div>
         <div className={styles.postsWrapper}>
            <SermonNotesGrid />
         </div>
      </div>
   );
};
