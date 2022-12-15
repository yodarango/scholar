import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

// components
import { SeePostInfo } from "../../fragments/chunks/see_post_info";
import { PostReactions } from "../../fragments/post_reactions";
import { Parragraph } from "../../fragments/Typography/parragraph";

// styles
import styles from "./view_quote.module.css";

// helpers | types
import { handleGetQuote } from "../../../helpers/functions/posts/quote_get";
import { TQuote } from "../../../types/posts";
import { useEffect } from "react";

export const ViewQuote = () => {
   const router = useRouter();
   const ID = router?.query && router?.query.ID ? router?.query.ID : "10";

   const [quote, setquote] = useState<TQuote | null>(null);

   const getData = async (ID: any) => {
      try {
         const { data } = await handleGetQuote({ ID });
         console.log(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getData({ ID });
   }, []);

   return (
      <></>
      //   <div
      //      className={`${styles.mainWrapper} ${type === 1 && styles.mainWrapperWide}`}
      //      id={quote?.background}>
      //      <Link href={`/posts/quote/${quote.ID}`}>
      //         <a className={styles.clickableArea}></a>
      //      </Link>
      //      {/*  header  */}
      //      <div className={styles.header}>
      //         {/* <QuoteCardHeader
      //            cta={{ handleDelete: cta.handleDelete }}
      //            postId={quote?.ID}
      //            userId={quote?.creator?.ID}
      //            userAuthority={quote?.creator?.authority_level}
      //            avatar={quote?.creator?.avatar}
      //         /> */}
      //         <div className={styles.postInfo}>
      //            <SeePostInfo
      //               cta={{ handleClickOnAvatar() {} }}
      //               userAuthority={userAuthority}
      //               userId={userId}
      //               username={username}
      //               avatar={avatar}
      //               postPostedOnDate={postPostedOnDate}
      //               postCreatedDate={postCreatedDate}
      //            />
      //         </div>
      //      </div>

      //      {/*  body  */}
      //      <div className={`${styles.body} ${type === 1 && styles.bodyWide}`}>
      //         <Header type={3} size={type === 1 ? "main" : "xxsmall"} text={quote?.body} />
      //         <div className={styles.author}>
      //            <Parragraph
      //               size={type === 1 ? "small" : "xxsmall"}
      //               text={`—	${quote.creator?.signature}`}
      //               align='right'
      //            />
      //         </div>
      //      </div>

      //      <div className={styles.footer}>
      //         <PostReactions
      //            postId={quote?.ID}
      //            contentType={1}
      //            postRating={{
      //               totalCount: quote?.approvals?.total_count,
      //               averageCount: quote?.approvals?.average_count
      //            }}
      //            totalComments={quote?.comments?.total_count}
      //         />
      //      </div>
      //   </div>
   );
};
