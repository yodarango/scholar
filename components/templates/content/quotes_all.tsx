import { useRouter } from "next/router";

// components
import { useEffect, useState } from "react";
import { handleGetQuote, TgetQuoteVariables } from "../../../helpers/functions/posts/quote_get";
import { TQuote } from "../../../types/posts";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { SearchInputWCat } from "../../fragments/search_input_w_cat";
import { QuotesGrid } from "../../layouts/scrollers/user_content/quotes_grid";

// styles
import styles from "./quotes_all.module.css";

export const QuotesAll = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.searchFilter}>
            <div className={styles.search}>
               <SearchInputWCat placeHolder='Search anything...' />
            </div>
         </div>

         <div className={styles.postsWrapper}>
            <QuotesGrid />
         </div>
      </div>
   );
};
