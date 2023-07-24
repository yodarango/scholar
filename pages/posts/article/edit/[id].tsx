import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { handleGetArticles } from "../../../../helpers/functions/posts/article_get";

// comps
import { ArticleTextEditor } from "../../../../components/templates/content/article_text_editor";
import { RoundLoader } from "../../../../components/fragments/chunks/round_loader";

// styles
import styles from "./index.module.css";
import global from "../../../page_global.module.css";

// types
import { TArticle } from "../../../../types/posts";
import { REQUEST_TYPE_IS_EDIT_ARTICLE } from "../../../../helpers/functions/posts/content_post";
import { UseIsAuth } from "../../../../hooks/use_check_auth";
import HeadContent from "../../../../SEO/head_content";
import Head from "next/head";

const EditArticle = () => {
   const router = useRouter();
   const ID: any = router?.query && router?.query.id ? router?.query.id : "1";

   const [article, setarticle] = useState<TArticle | null>(null);
   const [loading, setloading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await handleGetArticles({ ID }, true);
         if (data) setarticle(data);

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
      article?.referenced_verses && article.referenced_verses.length > 0
         ? article.referenced_verses
         : [];

   return (
      <UseIsAuth redirect='/login'>
         <Head key='edit-article-page'>
            <HeadContent title='Edit Article' />
         </Head>
         <div className={`${styles.mainWrapper} ${global.mainWrapper}`}>
            {loading === "done" && (
               <ArticleTextEditor
                  requestType={REQUEST_TYPE_IS_EDIT_ARTICLE}
                  ID={article?.ID}
                  body={article?.body}
                  titleDefaultValue={article?.title}
                  postImage={article?.post_image}
                  userAuthority={
                     article?.creator?.authority_level ? article?.creator?.authority_level : 1
                  }
                  userId={article?.creator?.ID ? article?.creator?.ID : "0"}
                  username={article?.creator?.signature ? article.creator?.signature : ""}
                  avatar={article?.creator?.avatar ? article?.creator?.avatar : ""}
                  postPostedOnDate={article?.posted_on}
                  postCreatedDate={article?.created_on}
                  postCategory={article?.category_tags}
                  postReferences={postReferneces}
               />
            )}
            {loading === "loading" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
         </div>
      </UseIsAuth>
   );
};

export default EditArticle;
