/**************************************************************************************** 
-  Renders commentaries on a a one line carrousel and if no quotes are passed then 
   the local fetch is called. 
-  PROP: Commentaries: the optional props that if passed does not trigger the local fetch
-  PROP: loadingState: the state of the outside call. If not paused it defaults to "loading"
-  PROP: userID is passed the function is called for a particular user
****************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { Quote } from "../../../fragments/cards/posts/quote";

// styles
import styles from "./quote_one_line_carrousel.module.css";

// types
import { TQuote } from "../../../../types/posts";
import { handleGetQuote, TgetQuoteVariables } from "../../../../helpers/functions/posts/quote_get";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";
import { Empty } from "../../../common/feedback/empty";
import { Error } from "../../../common/feedback/error";

type TQuoteOneLineCarrouselProps = {
   loadingState?: string;
   quotes?: TQuote[];
   userID?: string | number;
};
export const QuoteOneLineCarrousel = ({
   quotes,
   userID,
   loadingState = "loading"
}: TQuoteOneLineCarrouselProps) => {
   const router = useRouter();
   // state
   const [quotesArr, setquotesArr] = useState<TQuote[] | undefined>(quotes);
   const [loading, setloading] = useState<string>(loadingState);

   // fetch data
   const fetchData = async (variables: TgetQuoteVariables) => {
      try {
         const { data, status } = await handleGetQuote(variables);

         data && setquotesArr(data);
         setloading(status);
      } catch (error) {
         console.error(error);
         setquotesArr([]);
         setloading("error");
      }
   };

   useEffect(() => {
      if (router.isReady) {
         const USER_ID =
            router?.query?.signature === "@me" ? undefined : (router?.query?.signature as string);
         if (!router?.query?.view) {
            if (!quotes) {
               fetchData({
                  USER_ID: userID ? userID : USER_ID,
                  last_id: CONTENT_LAST_ID
               });
            } else {
               setquotesArr(quotes);
               setloading(loadingState);
            }
         }
      }
   }, [loadingState, router.isReady]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.carrousel}>
               {quotesArr?.map((quote: TQuote, index: number) => (
                  // <div className={styles.quote} key={index}>
                  <Quote quote={quote} key={index} className={styles.quote} />
                  // </div>
               ))}
            </div>
         )}
         {loading == "done" && quotesArr?.length === 0 && (
            <div className={styles.loader}>
               <Empty />
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <Error />
            </div>
         )}
      </div>
   );
};
