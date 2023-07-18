import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { WithTextContentStack } from "../../layouts/stacks/with_text_content_stack";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFound } from "../../common/feedback/resource_not_found";

// types
import { TArticle } from "../../../types/posts";
import { handleGetArticles } from "../../../helpers/functions/posts/article_get";

// styles
import styles from "./view_article.module.css";

export const ViewArticle = () => {
   const router = useRouter();
   const ID = router?.query && router?.query.id ? router?.query.id : "1";

   const [article, setarticle] = useState<TArticle | null>(null);
   const [loading, setloading] = useState<string>("loading");

   const getData = async (variables: any) => {
      try {
         const { data, status } = await handleGetArticles(variables);
         if (data) setarticle(data[0]);

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
      article?.referenced_verses && article.referenced_verses.length > 0
         ? article.referenced_verses
         : [];

   return (
      <>
         {article && (
            <div className={styles.mainWrapper}>
               <WithTextContentStack
                  title={article.title}
                  postReferences={postReferneces}
                  body={article.body}
                  cta={{ handleCloseModal: () => router.back() }}
                  postImage={article.post_image}
                  userAuthority={article.creator.authority_level}
                  userId={article.creator.ID}
                  username={article.creator.signature}
                  avatar={article.creator.avatar}
                  postPostedOnDate={article.posted_on}
                  postCreatedDate={article.created_date}
                  postCategory={article.category_tags}
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
               <ResourceNotFound />
            </div>
         )}
      </>
   );
};
