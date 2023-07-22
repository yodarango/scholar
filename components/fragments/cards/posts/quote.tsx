import Link from "next/link";

// components
import { QuoteCardHeader } from "../../chunks/quote_card_header";
import { Parragraph } from "../../Typography/parragraph";
import { Header } from "../../Typography/header";
import { PostReactions } from "../../post_reactions";

// styles
import styles from "./quote.module.css";

//types
import { TQuote } from "../../../../types/posts";
import { EnumContentType } from "../../../../types/enums";
import { LIGHT_QUOTE_BACKGROUNDS, POST_TYPE_QUOTE } from "../../../../constants/defaults";
import { useDeleteContent } from "../../../../helpers/functions/posts/content_delete";
import { useEffect, useState } from "react";
import Portal from "../../../hoc/potal";
import { Notification } from "../../popups/notification";
import { errorMessages } from "../../../../data/error_messages";
import { FONT_COLOR, PRIMARY_COLOR } from "../../../../constants/tokens";

export type TQuoteProps = {
   quote: TQuote;
   type?: number;
   className?: string;
};

export const Quote = ({ quote, type = 0, className = "" }: TQuoteProps) => {
   const [isDeleted, setisDeleted] = useState<boolean>(false);
   const [notification, setNotification] = useState(false);

   let darkContext: boolean = LIGHT_QUOTE_BACKGROUNDS.includes(quote.background);

   const actionsColor = darkContext ? PRIMARY_COLOR : FONT_COLOR;

   const { handleDelete, data } = useDeleteContent();

   useEffect(() => {
      if (data && data.ID) {
         setisDeleted(true);
      } else if (data && data.error) {
         setNotification(true);
      }
   }, [data]);

   return (
      <>
         {notification && (
            <Portal>
               <Notification
                  cta={{ handleClose: () => setNotification(false) }}
                  type='4'
                  title={errorMessages.posts.failedToDeletePost.title}
                  body={errorMessages.posts.failedToDeletePost.body}
               />
            </Portal>
         )}
         {!isDeleted && (
            <div
               className={`${styles.mainWrapper} ${
                  type === 1 && styles.mainWrapperWide
               } ${className}`}
               id={quote?.background}>
               <Link href={`/posts/quote/${quote.ID}`}>
                  <a className={styles.clickableArea}></a>
               </Link>
               {/* ------------------------------ header ----------------------- */}
               <div className={styles.header}>
                  <QuoteCardHeader
                     dark={darkContext}
                     contentType={EnumContentType.quote}
                     cta={{
                        handleDelete: (id: string | number) => handleDelete(id, POST_TYPE_QUOTE)
                     }}
                     postId={quote?.ID}
                     userId={quote?.creator?.ID}
                     userAuthority={quote?.creator?.authority_level}
                     avatar={quote?.creator?.avatar}
                  />
               </div>

               {/* ------------------------------ body ----------------------- */}
               <div className={`${styles.body} ${type === 1 && styles.bodyWide}`}>
                  <Header
                     color={darkContext ? PRIMARY_COLOR : FONT_COLOR}
                     type={3}
                     size={type === 1 ? "main" : "small"}
                     text={quote?.body}
                     align='center'
                  />
                  <div className={styles.author}>
                     <Parragraph
                        color={darkContext ? PRIMARY_COLOR : FONT_COLOR}
                        size={type === 1 ? "small" : "xsmall"}
                        text={`—	${quote.author || quote.creator?.signature}`}
                        align='center'
                     />
                  </div>
               </div>

               <div className={styles.footer}>
                  <PostReactions
                     iconColor={actionsColor}
                     postId={quote?.ID}
                     userId={quote?.creator?.ID}
                     contentType={2}
                     postRating={{
                        totalCount: quote?.approvals?.total_count,
                        averageCount: quote?.approvals?.average_count
                     }}
                     totalComments={quote?.comments?.total_count}
                  />
               </div>
            </div>
         )}
      </>
   );
};
