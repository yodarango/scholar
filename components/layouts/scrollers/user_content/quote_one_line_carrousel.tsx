import { useState } from "react";

// comps
import { Quote } from "../../../fragments/cards/posts/quote";

// styles
import styles from "./quote_one_line_carrousel.module.css";

// types
import { TQuote } from "../../../../types/posts";

type TQuoteOneLineCarrouselProps = {
   quotes: TQuote[];
};
export const QuoteOneLineCarrousel = ({ quotes }: TQuoteOneLineCarrouselProps) => {
   // state
   const [quotesArr, setquotesArr] = useState<TQuote[]>(quotes);

   const handleDelete = (id: string) => {
      const updatedArr = quotes.filter((quote) => quote.ID !== id);
      setquotesArr(updatedArr);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.carrousel}>
            {quotesArr.map((quote: TQuote, index: number) => (
               <div className={styles.commentary} key={index}>
                  <Quote quote={quote} cta={{ handleDelete }} />
               </div>
            ))}
         </div>
      </div>
   );
};
