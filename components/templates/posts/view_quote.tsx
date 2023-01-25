import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { SeePostInfo } from "../../fragments/chunks/see_post_info";
import { PostReactions } from "../../fragments/post_reactions";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Header } from "../../fragments/Typography/header";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./view_quote.module.css";

// helpers | types
import { handleGetQuote } from "../../../helpers/functions/posts/quote_get";
import { TQuote } from "../../../types/posts";
import { colors } from "../../../styles/tokens";

// constants
import { POST_TYPE_QUOTE } from "../../../constants/defaults";
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

   useEffect(() => {
      if (router.isReady) getData({ ID });
   }, [router.isReady]);

   return (
      <>
         {quote && loading === "done" && (
            <div className={`${styles.mainWrapper}`} id={quote?.background}>
               {/*  header  */}
               <div className={styles.header}>
                  <div className={styles.postInfo}>
                     <SeePostInfo
                        cta={{ handleClickOnAvatar() {} }}
                        customDateColor={colors.font}
                        shadowDateColor={colors.font}
                        customDateFontColor={colors.primary}
                        userAuthority={quote.creator.authority_level}
                        userId={quote.creator.ID}
                        username={quote.creator.signature}
                        avatar={quote.creator.avatar}
                        postPostedOnDate={quote.posted_on}
                        postCreatedDate={quote.created_date}
                     />
                  </div>
               </div>

               {/*  body  */}
               <div className={`${styles.body}`}>
                  <Header type={2} size='xlarge' text={quote?.body} />
                  <div className={styles.author}>
                     <Parragraph size={"small"} text={`—	${quote.author}`} align='right' />
                  </div>
               </div>

               <div className={styles.footer}>
                  <PostReactions
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
               <ResourceNotFoundError />
            </div>
         )}
      </>
   );
};
