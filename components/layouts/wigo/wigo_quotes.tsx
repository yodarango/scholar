/**************************************************************************************** 
-  A display of quotes for the WIGO page. This should only pull the last 20 quotes and 
   redirected to quotes page if "see all" is clicked
****************************************************************************************/
import { useState, useEffect } from "react";

// components
import { QuoteOneLineCarrousel } from "../scrollers/user_content/quote_one_line_carrousel";
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// style
import styles from "./wigo_quotes.module.css";

// helpers
import { handleGetQuotesIn24 } from "../../../helpers/functions/posts/quote_get";

// types
import { TQuote } from "../../../types/posts";

export const WigoQuotes = () => {
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

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Quotes' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/quote"} />
            </div>
         </div>
         {loading === "done" && quotes && (
            <div className={styles.carrousel}>
               <QuoteOneLineCarrousel quotes={quotes} />
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
