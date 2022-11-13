/***********************************************************************************************
-   Search that can handle search by string or by category. This is useful for posts searching
-   If the cta prop is passed then it return the values chosen by the user, otherwise it handles
    the search here by passing values to the router query
***********************************************************************************************/

import { useRouter } from "next/router";

// components
import { CategoryTag } from "./chunks/category_tag";
import { SearchInput } from "./inputs/search_input";

// styles
import styles from "./search_input_w_cat.module.css";

type TSearchInputWCatProps = {
   placeHolder: string;
   cta?: {
      handleSearch?: (value: string) => void;
      handleCategory?: (cat: string) => void;
   };
};

export const SearchInputWCat = ({ placeHolder, cta }: TSearchInputWCatProps) => {
   // router
   const router = useRouter();
   const handleSearch = (body: string) => {
      router.push({
         pathname: router.pathname,
         query: { ...router.query, body }
      });
   };

   const handleCategory = (category_tags: string) => {
      if (category_tags === "*")
         delete router.query.category_tags,
            router.push({
               pathname: router.pathname,
               query: { ...router.query }
            });
      else
         router.push({
            pathname: router.pathname,
            query: { ...router.query, category_tags }
         });
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
