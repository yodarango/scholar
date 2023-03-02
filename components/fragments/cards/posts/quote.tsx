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
import { deleteContent } from "../../../../helpers/functions/posts/content_delete";
import { useState } from "react";
import Portal from "../../../hoc/potal";
import { Notification } from "../../popups/notification";
import { errorMessages } from "../../../../data/error_messages";

export type TQuoteProps = {
   quote: TQuote;
   type?: number;
};

export const Quote = ({ quote, type = 0 }: TQuoteProps) => {
   const [isDeleted, setisDeleted] = useState<boolean>(false);
   const [notification, setNotification] = useState(false);

   let darkContext: boolean = LIGHT_QUOTE_BACKGROUNDS.includes(quote.background);

   const actionsColor = darkContext ? "#2a2438" : "#F1EAFF";

   const handleDelete = async (id: string | number) => {
      try {
         const isDeleted = await deleteContent(id, POST_TYPE_QUOTE);
         if (isDeleted && isDeleted.ID) {
            setisDeleted(true);
         } else {
            setNotification(true);
         }
      } catch (error) {
         console.error(error);
      }
   };

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
               className={`${styles.mainWrapper} ${type === 1 && styles.mainWrapperWide}`}
               id={quote?.background}>
               <Link href={`/posts/quote/${quote.ID}`}>
                  <a className={styles.clickableArea}></a>
               </Link>
               {/* ------------------------------ header ----------------------- */}
               <div className={styles.header}>
                  <QuoteCardHeader
                     dark={darkContext}
                     contentType={EnumContentType.quote}
                     cta={{ handleDelete }}
                     postId={quote?.ID}
                     userId={quote?.creator?.ID}
                     userAuthority={quote?.creator?.authority_level}
                     avatar={quote?.creator?.avatar}
                  />
               </div>

               {/* ------------------------------ body ----------------------- */}
               <div className={`${styles.body} ${type === 1 && styles.bodyWide}`}>
                  <Header
                     color={darkContext ? "#2a2438" : "#f1eaff"}
                     type={3}
                     size={type === 1 ? "main" : "xxsmall"}
                     text={quote?.body}
                     align='center'
                  />
                  <div className={styles.author}>
                     <Parragraph
                        color={darkContext ? "#2a2438" : "#f1eaff"}
                        size={type === 1 ? "small" : "xxsmall"}
                        text={`—	${quote.creator?.signature}`}
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
