import { handleGetAllPosts } from "../../../helpers/functions/posts/content_get";
import {
   CONTENT_LAST_ID,
   POST_TYPE_COMMENTARY,
   POST_TYPE_QUOTE,
   POST_TYPE_THOUGHT
} from "../../../constants/defaults";
import { useState, useEffect } from "react";
import styles from "./wigo_feed.module.css";
import { Commentary } from "../../fragments/cards/posts/commentary";
import { Quote } from "../../fragments/cards/posts/quote";
import { Thought } from "../../fragments/cards/posts/thought";

export const WigoFeed = () => {
   const [posts, setposts] = useState<any[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [variables, setvariables] = useState({ last_id: CONTENT_LAST_ID });

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetAllPosts(variables.last_id);
         data && setposts(data);

         setloading(status);
      } catch (error) {
         console.error(error);
         setposts([]);
         setloading("error");
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = (id: string) => {};
   return (
      <div className={styles.mainWrapper}>
         {posts.map((post) => {
            if (post.POST_TYPE === POST_TYPE_COMMENTARY?.toString())
               return (
                  <div className={styles.post}>
                     <Commentary commentary={post} cta={{ handleDelete }} />
                  </div>
               );
            else if (post.POST_TYPE === POST_TYPE_QUOTE?.toString())
               return (
                  <div className={styles.post}>
                     <Quote quote={post} cta={{ handleDelete }} />{" "}
                  </div>
               );
            else if (post.POST_TYPE === POST_TYPE_THOUGHT?.toString())
               return (
                  <div className={styles.post}>
                     <Thought thought={post} cta={{ handleDelete }} />{" "}
                  </div>
               );
         })}
      </div>
   );
};
