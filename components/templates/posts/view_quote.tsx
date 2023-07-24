import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { SeePostInfo } from "../../fragments/chunks/see_post_info";
import { PostReactions } from "../../fragments/post_reactions";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Header } from "../../fragments/Typography/header";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFound } from "../../common/feedback/resource_not_found";

// styles
import styles from "./view_quote.module.css";

// helpers | types
import { handleGetQuote } from "../../../helpers/functions/posts/quote_get";
import { TQuote } from "../../../types/posts";

// constants
import { LIGHT_QUOTE_BACKGROUNDS, POST_TYPE_QUOTE } from "../../../constants/defaults";
import { FONT_COLOR, PRIMARY_COLOR } from "../../../constants/tokens";
import { CloseContent } from "../../fragments/buttons/close_content";

export const ViewQuote = () => {
   const router = useRouter();
   const ID = router?.query && router?.query.id ? router?.query.id : "1";

   const [quote, setquote] = useState<TQuote | null>(null);
   const [loading, setloading] = useState<string>("loading");

   const getData = async (variables: any) => {
      try {
         const { data, status } = await handleGetQuote(variables);
         if (data) setquote(data[0]);
         setloading(status);
      } catch (error) {
         setloading("error");
         console.error(error);
      }
   };

   const darkContext = quote ? LIGHT_QUOTE_BACKGROUNDS.includes(quote.background) : false;

   useEffect(() => {
      if (router.isReady) getData({ ID });
   }, [router.isReady]);

   return (
      <>
         {quote && loading === "done" && (
            <div className={`${styles.mainWrapper}`} id={quote?.background}>
               <div className={styles.closeContent}>
                  <CloseContent
                     color={darkContext ? PRIMARY_COLOR : FONT_COLOR}
                     cta={{ handleClick: () => router.back() }}
                  />
               </div>
               {/*  header  */}
               <div className={styles.header}>
                  <div className={styles.postInfo}>
                     <SeePostInfo
                        dark={darkContext}
                        cta={{ handleClickOnAvatar() {} }}
                        customDateColor={FONT_COLOR}
                        shadowDateColor={FONT_COLOR}
                        customDateFontColor={PRIMARY_COLOR}
                        userAuthority={quote.creator.authority_level}
                        userId={quote.creator.ID}
                        username={quote.creator.signature}
                        avatar={quote.creator.avatar}
                        postPostedOnDate={quote.posted_on}
                        postCreatedDate={quote.created_on}
                     />
                  </div>
               </div>

               {/*  body  */}
               <div className={`${styles.body}`}>
                  <Header
                     type={2}
                     size='xlarge'
                     text={quote?.body}
                     color={darkContext ? PRIMARY_COLOR : FONT_COLOR}
                  />
                  <div className={styles.author}>
                     <Parragraph
                        size={"small"}
                        text={`—	${quote.author || quote.creator.signature}`}
                        align='right'
                        color={darkContext ? PRIMARY_COLOR : FONT_COLOR}
                     />
                  </div>
               </div>

               <div className={styles.footer}>
                  <PostReactions
                     iconColor={darkContext ? PRIMARY_COLOR : FONT_COLOR}
                     userId={quote.creator.ID}
                     postId={quote?.ID}
                     contentType={POST_TYPE_QUOTE}
                     postRating={{
                        totalCount: quote?.approvals?.total_count,
                        averageCount: quote?.approvals?.average_count
                     }}
                     totalComments={quote?.comments?.total_count}
                  />
               </div>
            </div>
         )}
         {/* loader */}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {/* error */}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFound />
            </div>
         )}
      </>
   );
};
