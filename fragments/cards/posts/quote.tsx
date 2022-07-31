// components
import { QuoteCardHeader } from "../../chunks/quote_card_header";
import { Parragraph } from "../../Typography/parragraph";
import { Header } from "../../Typography/header";
import { PostReactions } from "../../post_reactions";

// styles
import styles from "./quote.module.css";

//types
import { TQuote } from "../../../types/posts";

export type TQuoteProps = {
   quote: TQuote;
   cta: {
      handleShowPostComments: () => void;
      handleShowRatePost: () => void;
      handleShowPostOptions: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const Quote = ({ quote, cta }: TQuoteProps) => {
   return (
      <div className={styles.mainWrapper} id={quote.background}>
         {/* ------------------------------ header ----------------------- */}
         <div className={styles.header}>
            <QuoteCardHeader
               userId={quote.creator.ID}
               cta={{ handleShowPostOptions: cta.handleShowPostOptions }}
               userAuthority={quote.creator.authority_level}
               avatar={quote.creator.avatar}
            />
         </div>

         {/* ------------------------------ body ----------------------- */}
         <div className={styles.body}>
            <Header type={3} size='xxsmall' text={quote.body} />
            <div className={styles.author}>
               <Parragraph size='xxsmall' text={`—	${quote.creator.signature}`} align='right' />
            </div>
         </div>

         <div className={styles.footer}>
            <PostReactions
               cta={{
                  handleShowPostComments: cta.handleShowPostComments,
                  handleShowRatePost: cta.handleShowRatePost
               }}
               postRating={{
                  totalCount: quote.approvals[0].total_count,
                  averageCount: quote.approvals[0].average_count
               }}
               totalComments={quote.comments[0].total_count}
            />
         </div>
      </div>
   );
};
