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
   quotes?: TQuote[];
   userID?: string;
};
export const QuoteOneLineCarrousel = ({ quotes, userID }: TQuoteOneLineCarrouselProps) => {
   // state
   const [quotesArr, setquotesArr] = useState<TQuote[] | undefined>(quotes);
   const [loading, setloading] = useState<string>("loading");

   const handleDelete = (id: string) => {
      const updatedArr = quotesArr?.filter((quote) => quote.ID !== id);
      setquotesArr(updatedArr);
   };

   // fetch data
   const fetchData = async (variables: TgetQuoteVariables) => {
      try {
         const { data, status } = await handleGetQuote(variables);
         data && setquotesArr(data.quote);
         setloading(status);
         console.log(data);
      } catch (error) {
         console.error(error);
         setquotesArr([]);
         setloading("error");
      }
   };

   useEffect(() => {
      if (!quotes) {
         fetchData({ USER_ID: userID, last_id: CONTENT_LAST_ID });
      }
   }, []);

   return (
      <div className={styles.mainWrapper}>
         {
            <div className={styles.carrousel}>
               {quotesArr?.map((quote: TQuote, index: number) => (
                  <div className={styles.commentary} key={index}>
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
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </div>
   );
};
