// components
import { QuoteCardHeader } from "../../chunks/quote_card_header";
import { Parragraph } from "../../Typography/parragraph";
import { Header } from "../../Typography/header";
import { PostReactions } from "../../post_reactions";

// styles
import styles from "./quote.module.css";

//types
import { TQuote } from "../../../../types/posts";

export type TQuoteProps = {
   quote: TQuote;
   type?: number;
   cta: {
      handleDelete: (id: string) => void;
   };
};

export const Quote = ({ quote, cta, type = 0 }: TQuoteProps) => {
   return (
      <div
         className={`${styles.mainWrapper} ${type === 1 && styles.mainWrapperWide}`}
         id={quote?.background}>
         {/* ------------------------------ header ----------------------- */}
         <div className={styles.header}>
            <QuoteCardHeader
               cta={{ handleDelete: cta.handleDelete }}
               postId={quote?.ID}
               userId={quote?.creator?.ID}
               userAuthority={quote?.creator?.authority_level}
               avatar={quote?.creator?.avatar}
            />
         </div>

         {/* ------------------------------ body ----------------------- */}
         <div className={`${styles.body} ${type === 1 && styles.bodyWide}`}>
            <Header type={3} size={type === 1 ? "main" : "xxsmall"} text={quote?.body} />
            <div className={styles.author}>
               <Parragraph
                  size={type === 1 ? "small" : "xxsmall"}
                  text={`—	${quote.creator?.signature}`}
                  align='right'
               />
            </div>
         </div>

         <div className={styles.footer}>
            <PostReactions
               postId={quote?.ID}
               contentType={1}
               postRating={{
                  totalCount: quote?.approvals?.total_count,
                  averageCount: quote?.approvals?.average_count
               }}
               totalComments={quote?.comments?.total_count}
            />
         </div>
      </div>
   );
};
