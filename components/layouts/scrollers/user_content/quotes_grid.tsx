/**************************************************************************************** 
-  Displays a grid of quotes
****************************************************************************************/
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { GridPrimary } from "../grid_primary";
import { Quote } from "../../../fragments/cards/posts/quote";
import { Primary } from "../../../fragments/buttons/primary";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";
import { handleGetQuote, TgetQuoteVariables } from "../../../../helpers/functions/posts/quote_get";

// styles
import styles from "./quotes_grid.module.css";

// types
import { TQuote } from "../../../../types/posts";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";

type TQuotesGrid = {
   isSelf?: boolean;
};
export const QuotesGrid = ({ isSelf }: TQuotesGrid) => {
   // router
   const router = useRouter();

   // components
   const [quotes, setquotes] = useState<TQuote[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);

   const [queryVariables, setqueryVariables] = useState<TgetQuoteVariables>({
      last_id: CONTENT_LAST_ID,
      isSelf: isSelf
   });

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: any, isLoadMore: boolean) => {
      if (isLoadMore) {
         setshowloadMore(false);
         setsmallLoader(true);
      } else {
         setloading("loading");
      }

      if (variables?.category) variables.category_tags = variables.category;
      try {
         const { data, status } = await handleGetQuote(variables);
         if (data) {
            setquotes(data);
            data.length > 0 &&
               setqueryVariables({
                  ...queryVariables,
                  last_id: data[data.length - 1].ID
               });

            data.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
         }

         setloading(status);
         setsmallLoader(false);
      } catch (error) {
         console.error(error);
         setquotes([]);
         setloading("error");
      }
   };

   /***********************************************************************
    * since this renders only when the router changes or on initial render,
    * we want to always fetch the initial CONTENT_LAST_ID 🕊
    * ******************************************************
    * */

   useEffect(() => {
      if (router.isReady)
         fetchData({ last_id: CONTENT_LAST_ID, isSelf: isSelf, ...router.query }, false);
   }, [router.isReady, router.query]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && quotes && (
            <div className={styles.gridWrapper}>
               <GridPrimary>
                  {quotes?.map((quote: TQuote, index: number) => (
                     <div data-test={quote.ID} key={index} className={styles.child}>
                        <Quote
                           type={1}
                           cta={{
                              handleDelete: () => {}
                           }}
                           quote={quote}
                        />
                     </div>
                  ))}
               </GridPrimary>

               {showloadMore && (
                  <div className={styles.loadMore}>
                     <Primary
                        title='Load more'
                        type='1'
                        cta={{
                           handleClick: () => fetchData(queryVariables, true)
                        }}
                     />
                  </div>
               )}

               {smallLoader && (
                  <div className={styles.smallLoader}>
                     <SmallLoader />
                  </div>
               )}
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </div>
   );
};
