// components
import { GridPrimary } from "../../layouts/scrollers/grid_primary";
import { CommentariesGrid } from "../../layouts/scrollers/user_content/commentaries_grid";

// styles
import styles from "./commentaries_all.module.css";

// types
import { TCommentary } from "../../../types/posts";
import { CommentaryFilter } from "../../fragments/commentary_filter";
import { SearchInputWCat } from "../../fragments/search_input_w_cat";

type TIndexProps = {
   commentaries: TCommentary[];
};
export const CommentariesAll = ({ commentaries }: TIndexProps) => {
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
