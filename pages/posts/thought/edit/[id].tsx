import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { handleGetThoughts } from "../../../../helpers/functions/posts/thought_get";

// comps
import { ThoughtTextEditor } from "../../../../components/templates/content/thought_text_editor";
import { RoundLoader } from "../../../../components/fragments/chunks/round_loader";

// styles
import styles from "./index.module.css";

// types
import { TThought } from "../../../../types/posts";
import { REQUEST_TYPE_IS_EDIT_THOUGHT } from "../../../../helpers/functions/posts/content_post";

const EditThought = () => {
   const router = useRouter();
   const ID: any = router?.query && router?.query.id ? router?.query.id : "1";

   const [thought, setthought] = useState<TThought | null>(null);
   const [loading, setloading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await handleGetThoughts({ ID }, true);
         if (data) setthought(data[0]);

         setloading(status);
      } catch (error) {
         setloading("error");
         console.error(error);
      }
   };

   useEffect(() => {
      if (router.isReady) getData();
   }, [router.isReady]);

   // post references
   const postReferneces: any =
      thought?.referenced_verses && thought.referenced_verses.length > 0
         ? thought.referenced_verses
         : [];

   useEffect(() => {
      // get the user data
   }, []);
   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <ThoughtTextEditor
               requestType={REQUEST_TYPE_IS_EDIT_THOUGHT}
               ID={thought?.ID}
               body={thought?.body}
               titleDefaultValue={thought?.title}
               postImage={thought?.post_image}
               userAuthority={
                  thought?.creator?.authority_level ? thought?.creator?.authority_level : 1
               }
               userId={thought?.creator?.ID ? thought?.creator?.ID : "0"}
               username={thought?.creator?.signature ? thought.creator?.signature : ""}
               avatar={thought?.creator?.avatar ? thought?.creator?.avatar : ""}
               postPostedOnDate={thought?.posted_on}
               postCreatedDate={thought?.created_date}
               postCategory={thought?.category_tags}
               postReferences={postReferneces}
            />
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
      </div>
   );
};

export default EditThought;
