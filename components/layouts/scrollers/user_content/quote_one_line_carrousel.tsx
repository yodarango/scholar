import { useState, useEffect } from "react";

// comps
import { Quote } from "../../../fragments/cards/posts/quote";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./commentaries_one_line_carrousel.module.css";

//helpers
import { TQuote } from "../../../../types/posts";
import { handleGetQuotesIn24 } from "../../../../helpers/functions/posts/quote_get";

export const QuoteOneLineCarrousel = () => {
   const [quotes, setquotes] = useState<TQuote[]>([]);
   const [loading, setloading] = useState<string>("loading");

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetQuotesIn24();
         data && setquotes(data.quote_in_24);
         setloading(status);
      } catch (error) {
         console.error(error);
         setquotes([]);
         setloading("error");
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = (id: string) => {
      const updatedArr = quotes.filter((quote) => quote.ID !== id);
      setquotes(updatedArr);
   };

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && quotes && (
            <div className={styles.carrousel}>
               {quotes.map((quote: TQuote, index: number) => (
                  <div className={styles.commentary} key={index}>
                     <Quote quote={quote} cta={{ handleDelete }} />
                  </div>
               ))}
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
