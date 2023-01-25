import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { WithTextContentStack } from "../../layouts/stacks/with_text_content_stack";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// types
import { TThought } from "../../../types/posts";
import { handleGetThoughts } from "../../../helpers/functions/posts/thought_get";

// styles
import styles from "./view_thought.module.css";

export const ViewThought = () => {
   const router = useRouter();
   const ID = router?.query && router?.query.id ? router?.query.id : "1";

   const [thought, setthought] = useState<TThought | null>(null);
   const [loading, setloading] = useState<string>("loading");

   const getData = async (variables: any) => {
      try {
         const { data, status } = await handleGetThoughts(variables);
         if (data) setthought(data[0]);

         setloading(status);
      } catch (error) {
         setloading("error");
         console.error(error);
      }
   };

   useEffect(() => {
      if (router.isReady) getData({ ID });
   }, [router.isReady]);

   // post references
   const postReferneces: any =
      thought?.referenced_verses && thought.referenced_verses.length > 0
         ? thought.referenced_verses
         : [];

   return (
      <>
         {thought && (
            <div className={styles.mainWrapper}>
               <WithTextContentStack
                  title={thought.title}
                  postReferences={postReferneces}
                  body={thought.body}
                  cta={{ handleCloseModal: () => router.back() }}
                  postImage={thought.post_image}
                  userAuthority={thought.creator.authority_level}
                  userId={thought.creator.ID}
                  username={thought.creator.signature}
                  avatar={thought.creator.avatar}
                  postPostedOnDate={thought.posted_on}
                  postCreatedDate={thought.created_date}
                  postCategory={thought.category_tags}
               />
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
