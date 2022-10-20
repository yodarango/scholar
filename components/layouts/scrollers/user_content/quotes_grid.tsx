import { useEffect, useState } from "react";

// comps
import { GridPrimary } from "../grid_primary";
import { Quote } from "../../../fragments/cards/posts/quote";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TQuote } from "../../../../types/posts";

type TQuotesGridProps = {
   filters?: {
      tag?: string;
   };
};
export const QuotesGrid = ({ filters }: TQuotesGridProps) => {
   const [quotes, setquotes] = useState<TQuote[]>([]);

   // fetch commentaris based on ID
   useEffect(() => {
      setquotes(
         [...Array(20)].map(() => ({
            ID: "1",
            body: "This is my post",
            category_tags: "#CYN #BLK",
            author: "myusername",
            background: "quote-bkg--5",
            posted_on: "12/24/2022",
            date: "07/07/2022 02:00",
            total_count: 5,
            creator: {
               ID: "1",
               signature: "Myusername",
               authority_level: 1,
               approval_rating: 100,
               avatar: "/images/logo.png"
            },
            comments: [{ total_count: 20 }],
            approvals: [
               {
                  total_count: 5,
                  average_count: 5
               }
            ]
         }))
      );
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.gridWrapper}>
            <GridPrimary>
               {quotes.map((quote: TQuote, index: number) => (
                  <div key={index} className={styles.child}>
                     <Quote
                        type={1}
                        cta={{
                           handleDelete(id: string) {
                              console.log(id);
                           }
                        }}
                        quote={quote}
                     />
                  </div>
               ))}
            </GridPrimary>
         </div>
      </div>
   );
};
