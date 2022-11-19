/***********************************************************************************************
-   Search that can handle search by string or by category. This is useful for posts searching
-   If the cta prop is passed then it return the values chosen by the user, otherwise it handles
    the search here by passing values to the router query
-  The component takes in initial values for the category and the search props but also an 
   initialValInComp which sets it in the component.
- "serachValTitle" sets the name of the query value. defaults to "body"
***********************************************************************************************/

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components
import { CategoryTag } from "./chunks/category_tag";
import { SearchInput } from "./inputs/search_input";

// styles
import styles from "./search_input_w_cat.module.css";

type TSearchInputWCatProps = {
   placeHolder: string;
   searchValTitle?: string;
   initialValInComp?: boolean;
   initialValSearch?: any;
   initialValCat?: any;
   cta?: {
      handleSearch?: (value: string) => void;
      handleCategory?: (cat: string) => void;
   };
};

export const SearchInputWCat = ({
   placeHolder,
   searchValTitle = "body",
   initialValInComp,
   initialValSearch = "",
   initialValCat = "",
   cta
}: TSearchInputWCatProps) => {
   // router
   const router = useRouter();

   const [initialValues, setInitialValues] = useState<{ cat: any; sea: any }>({
      cat: initialValCat,
      sea: initialValSearch
   });

   const handleSearch = (body: string) => {
      router.push({
         pathname: router.pathname,
         query: { ...router.query, [searchValTitle]: body }
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

   // set the initial value
   useEffect(() => {
      if (router.isReady && initialValInComp) {
         setInitialValues({ cat: router?.query?.category_tags, sea: router?.query?.body });
      }
   }, [router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.search}>
            <SearchInput
               initialValue={initialValues.sea}
               placeholder={placeHolder}
               maxL={50}
               cta={{ handleOnChange: cta?.handleSearch ? cta.handleSearch : handleSearch }}
            />
         </div>
         <div className={styles.category}>
            <CategoryTag
               initiaValue={initialValues.cat}
               informativeOnly={false}
               cta={{ handleSelection: cta?.handleCategory ? cta?.handleCategory : handleCategory }}
            />
         </div>
      </div>
   );
};
