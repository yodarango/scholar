import { useState } from "react";

// comps
import { Quote } from "../../../fragments/cards/posts/quote";

// styles
import styles from "./commentaries_one_line_carrousel.module.css";

//helpers
import { TCommentary, TQuote } from "../../../types/posts";

type TCommentaryOneLineCarrouselProps = {
   quotes: TQuote[];
};

export const QuoteOneLineCarrousel = ({ quotes }: TCommentaryOneLineCarrouselProps) => {
   // state
   const [quoteArr, setquoteArr] = useState<TQuote[]>(quotes);
   // will only run if the post was deleted successfully

   const handleDelete = (id: string) => {
      const updatedArr = quoteArr.filter((quote) => quote.ID !== id);
      setquoteArr(updatedArr);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.carrousel}>
            {quoteArr.map((quote: TQuote, index: number) => (
               <div className={styles.commentary} key={index}>
                  <Quote quote={quote} cta={{ handleDelete }} />
               </div>
            ))}
         </div>
      </div>
   );
};
