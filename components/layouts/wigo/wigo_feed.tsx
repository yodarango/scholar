import { handleGetAllPosts } from "../../../helpers/functions/posts/content_get";
import {
   CONTENT_LAST_ID,
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE,
   POST_TYPE_THOUGHT
} from "../../../constants/defaults";
import { useState, useEffect, useRef } from "react";
import styles from "./wigo_feed.module.css";
import { Commentary } from "../../fragments/cards/posts/commentary";
import { Quote } from "../../fragments/cards/posts/quote";
import { Thought } from "../../fragments/cards/posts/thought";
import { TCommentary } from "../../../types/posts";
import { RoundLoader } from "../../fragments/chunks/round_loader";

export const WigoFeed = () => {
   const [posts, setposts] = useState<any[]>([]);
   const [loading, setloading] = useState<string>("first_load");
   const [variables, setvariables] = useState({
      cID: CONTENT_LAST_ID,
      qID: CONTENT_LAST_ID,
      tID: CONTENT_LAST_ID
   });

   const wrapper = useRef<HTMLDivElement>(null);

   // get the last ID of each post type to fetch more
   const getLastPostID = (posts: any) => {
      const commentaries = posts.filter(
         (c: TCommentary) => c.POST_TYPE === POST_TYPE_COMMENTARY.toString()
      );
      const quotes = posts.filter((c: TCommentary) => c.POST_TYPE === POST_TYPE_QUOTE.toString());
      const thoughts = posts.filter(
         (c: TCommentary) => c.POST_TYPE === POST_TYPE_THOUGHT.toString()
      );

      const vars = {
         cID: variables.cID,
         qID: variables.qID,
         tID: variables.tID
      };

      if (commentaries.length > 0) variables.cID = commentaries.at(-1).ID;
      if (quotes.length > 0) variables.qID = quotes.at(-1).ID;
      if (thoughts.length > 0) variables.tID = thoughts.at(-1).ID;

      return vars;
   };

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetAllPosts(variables);
         if (data) {
            setposts((prev) => [...prev, ...data]);
            setvariables(getLastPostID(data));

            window.addEventListener("scroll", fetchMoreData);
         }

         setloading(status);
      } catch (error) {
         console.error(error);
         setposts([]);
         setloading("error");
      }
   };

   const fetchMoreData = () => {
      if (wrapper.current) {
         const makeCall = window.scrollY / wrapper.current.clientHeight >= 0.92;

         if (makeCall) {
            // remove event so it event won't fire every time we scroll
            window.removeEventListener("scroll", fetchMoreData);
            setloading("loading");

            // set timer to make event its called only once
            setTimeout(fetchData, 500);
         }
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = (id: string) => {};
   return (
      <div className={styles.mainWrapper} ref={wrapper}>
         {loading !== "first_load" &&
            posts.map((post, index) => {
               if (post.POST_TYPE === POST_TYPE_COMMENTARY?.toString())
                  return (
                     <div className={styles.post} key={index}>
                        <Commentary commentary={post} cta={{ handleDelete }} />
                     </div>
                  );
               else if (post.POST_TYPE === POST_TYPE_QUOTE?.toString())
                  return (
                     <div className={styles.post} key={index}>
                        <Quote quote={post} cta={{ handleDelete }} />{" "}
                     </div>
                  );
               else if (post.POST_TYPE === POST_TYPE_THOUGHT?.toString())
                  return (
                     <div className={styles.post} key={index}>
                        <Thought thought={post} cta={{ handleDelete }} />{" "}
                     </div>
                  );
            })}

         {/* loader */}
         {(loading === "loading" || loading === "first_load") && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
      </div>
   );
};
