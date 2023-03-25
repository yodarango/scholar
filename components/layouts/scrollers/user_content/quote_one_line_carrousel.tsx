/**************************************************************************************** 
-  Renders commentaries on a a one line carrousel and if no quotes are passed then 
   the local fetch is called. 
-  PROP: Commentaries: the optional props that if passed does not trigger the local fetch
-  PROP: loadingState: the state of the outside call. If not paused it defaults to "loading"
-  PROP: userID is passed the function is called for a particular user
****************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { Quote } from "../../../fragments/cards/posts/quote";

// styles
import styles from "./quote_one_line_carrousel.module.css";

// types
import { TQuote } from "../../../../types/posts";
import { handleGetQuote, TgetQuoteVariables } from "../../../../helpers/functions/posts/quote_get";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";

type TQuoteOneLineCarrouselProps = {
   loadingState?: string;
   quotes?: TQuote[];
   userID?: string | number;
   isSelf?: boolean;
};
export const QuoteOneLineCarrousel = ({
   quotes,
   userID,
   loadingState = "loading",
   isSelf
}: TQuoteOneLineCarrouselProps) => {
   // state
   const [quotesArr, setquotesArr] = useState<TQuote[] | undefined>(quotes);
   const [loading, setloading] = useState<string>(loadingState);

   const handleDelete = (id: string | number) => {
      const updatedArr = quotesArr?.filter((quote) => quote.ID !== id);
      setquotesArr(updatedArr);
   };

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
      if (!quotes) {
         fetchData({ USER_ID: userID, last_id: CONTENT_LAST_ID, isSelf: isSelf });
      } else {
         setquotesArr(quotes);
         setloading(loadingState);
      }
   }, [loadingState]);

   return (
      <div className={styles.mainWrapper}>
         {
            <div className={styles.carrousel}>
               {quotesArr?.map((quote: TQuote, index: number) => (
                  <div className={styles.quote} key={index}>
                     <Quote quote={quote} cta={{ handleDelete }} />
                  </div>
               ))}
            </div>
         }
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && <div className={styles.error}>{/* #NEEDS GRAPHICS */}</div>}
      </div>
   );
};
