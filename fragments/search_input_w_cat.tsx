/***********************************************************************************************
-   Search that can handle search by string or by category. This is useful for posts searching
-   If the cta prop is passed then it return the values chosen by the user, otherwise it handles
    the search here by passing values to the router query
***********************************************************************************************/

import { CategoryTag } from "./chunks/category_tag";
import { SearchInput } from "./inputs/search_input";
import styles from "./search_input_w_cat.module.css";

type TSearchInputWCatProps = {
   placeHolder: string;
   cta?: {
      handleSearch?: (value: string) => void;
      handleCategory?: (cat: string) => void;
   };
};

export const SearchInputWCat = ({ placeHolder, cta }: TSearchInputWCatProps) => {
   const handleSearch = (value: string) => {
      // handle the search here
      // probably set the value in the router.query
   };

   const handleCategory = (cat: string) => {
      // handle the search here
      // probably set the value in the router.query
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.search}>
            <SearchInput
               placeholder={placeHolder}
               maxL={50}
               cta={{ handleOnChange: cta?.handleSearch ? cta.handleSearch : handleSearch }}
            />
         </div>
         <div className={styles.category}>
            <CategoryTag
               informativeOnly={false}
               cta={{ handleSelection: cta?.handleCategory ? cta?.handleCategory : handleCategory }}
            />
         </div>
      </div>
   );
};
