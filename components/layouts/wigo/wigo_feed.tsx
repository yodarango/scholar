import { handleGetAllPosts } from "../../../helpers/functions/posts/content_get";
import {
   CONTENT_LAST_ID,
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE,
   POST_TYPE_ARTICLE
} from "../../../constants/defaults";
import { useState, useEffect, useRef } from "react";
import styles from "./wigo_feed.module.css";
import { Commentary } from "../../fragments/cards/posts/commentary";
import { Quote } from "../../fragments/cards/posts/quote";
import { Article } from "../../fragments/cards/posts/article";
import { TCommentary } from "../../../types/posts";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { Primary } from "../../fragments/buttons/primary";
import { MAX_CONTENT_LOAD_WIGO } from "../../../constants/common";
import { get } from "http";
import { Error } from "../../common/feedback/error";

export const WigoFeed = () => {
   const [posts, setposts] = useState<any[]>([]);
   const [loading, setloading] = useState<string>("first_load");
   const [variables, setvariables] = useState({
      cID: CONTENT_LAST_ID,
      qID: CONTENT_LAST_ID,
      tID: CONTENT_LAST_ID
   });
   const [showLoadMore, setshowLoadMore] = useState<boolean>(false);

   const wrapper = useRef<HTMLDivElement>(null);

   // get the last ID of each post type to fetch more
   const getLastPostID = (posts: any) => {
      const commentaries = posts.filter(
         (c: TCommentary) => c.POST_TYPE === POST_TYPE_COMMENTARY.toString()
      );
      const quotes = posts.filter((c: TCommentary) => c.POST_TYPE === POST_TYPE_QUOTE.toString());
      const thoughts = posts.filter(
         (c: TCommentary) => c.POST_TYPE === POST_TYPE_ARTICLE.toString()
      );

      if (commentaries.length > 0)
         setvariables((prev) => ({ ...prev, cID: commentaries.at(-1).ID }));
      if (quotes.length > 0) setvariables((prev) => ({ ...prev, qID: quotes.at(-1).ID }));
      if (thoughts.length > 0) setvariables((prev) => ({ ...prev, tID: thoughts.at(-1).ID }));
   };

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetAllPosts(variables);
         if (data) {
            setposts((prev) => [...prev, ...data]);
            getLastPostID(data);

            // if there are more posts to load
            if (data.length === MAX_CONTENT_LOAD_WIGO) setshowLoadMore(true);
            else setshowLoadMore(false);

            //! infinite scrolling
            // window.addEventListener("scroll", fetchMoreData);
         }

         setloading(status);
      } catch (error) {
         console.error(error);
         setposts([]);
         setloading("error");
      }
   };

   //TODO: If the server sends an error and does not load any posts when scrolling to the bottom
   //TODO: the app is thrown into a loop of get requests. fix this. Until it is fixed infinite
   //TODO: scrolling is disabled

   // const fetchMoreData = () => {
   //    if (wrapper.current) {
   //       const makeCall = window.scrollY / wrapper.current.clientHeight >= 0.92;

   //       if (makeCall) {
   //          // remove event so it event won't fire every time we scroll
   //          window.removeEventListener("scroll", fetchMoreData);
   //          setloading("loading");

   //          // set timer to make event its called only once
   //          setTimeout(fetchData, 500);
   //       }
   //    }
   // };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className={styles.mainWrapper} ref={wrapper}>
         {loading !== "first_load" &&
            loading !== "loading" &&
            loading !== "error" &&
            posts.map((post, index) => {
               if (post.POST_TYPE === POST_TYPE_COMMENTARY?.toString())
                  return (
                     <div className={`${styles.post}`} key={index}>
                        <Commentary commentary={post} />
                     </div>
                  );
               else if (post.POST_TYPE === POST_TYPE_QUOTE?.toString())
                  return (
                     <div className={styles.post} key={index}>
                        <Quote quote={post} />{" "}
                     </div>
                  );
               else if (post.POST_TYPE === POST_TYPE_ARTICLE?.toString())
                  return (
                     <div className={styles.post} key={index}>
                        <Article thought={post} />{" "}
                     </div>
                  );
            })}

         {showLoadMore && loading !== "error" && (
            <div className={styles.loader}>
               <Primary cta={{ handleClick: () => fetchData() }} title='Load more' type='1' />
            </div>
         )}

         {/* loader */}
         {(loading === "loading" || loading === "first_load") && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}

         {/* error */}
         {loading === "error" && (
            <div className={styles.loader}>
               <Error />
            </div>
         )}
      </div>
   );
};
