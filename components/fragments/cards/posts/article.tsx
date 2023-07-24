/****************************************************************************************************************
-  post type that gets all its data to display from the parent but should be responsible for it own data update
 *****************************************************************************************************************/

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// components
import { PostReactions } from "../../post_reactions";
import { TimeStamp } from "../../chunks/time_stamp";
import { PostCardHeader } from "../../chunks/post_card_header";
import { Header } from "../../Typography/header";
import { Parragraph } from "../../Typography/parragraph";

// styles
import styles from "./article.module.css";

// types
import { TArticle } from "../../../../types/posts";
import { POST_TYPE_ARTICLE, THO_DEFAULT_IMG_PLACEHOLDER } from "../../../../constants/defaults";
import { EnumContentType } from "../../../../types/enums";
import { useDeleteContent } from "../../../../helpers/functions/posts/content_delete";
import Portal from "../../../hoc/potal";
import { Notification } from "../../popups/notification";
import { errorMessages } from "../../../../data/error_messages";

type TArticleProps = {
   article: TArticle;

   cta?: {
      handleDelete: (id: string | number) => void;
   };
};

export const Article = ({ cta, article }: TArticleProps) => {
   const [isUsingDefaultImage, setIsUsingDefaultImage] = useState<boolean>(false);
   const [isDeleted, setisDeleted] = useState<boolean>(false);
   const [notification, setNotification] = useState(false);
   const [postImage, setPostImage] = useState<string>(article.post_image);

   // parse the Category ID
   const categoryId = article?.category_tags.split(" ")[0].replace("#", "");

   const { handleDelete, data } = useDeleteContent();

   useEffect(() => {
      if (data && data.ID) {
         setisDeleted(true);
      } else if (data && data.error) {
         setNotification(true);
      }
   }, [data]);

   return (
      <>
         {notification && (
            <Portal>
               <Notification
                  cta={{ handleClose: () => setNotification(false) }}
                  type='4'
                  title={errorMessages.posts.failedToDeletePost.title}
                  body={errorMessages.posts.failedToDeletePost.body}
               />
            </Portal>
         )}
         {!isDeleted && (
            <div className={`${styles.mainWrapper}`}>
               {/* -------------------- post header ------------ */}
               <div className={styles.header}>
                  <PostCardHeader
                     cta={{
                        handleDelete: (id: number | string) => handleDelete(id, POST_TYPE_ARTICLE)
                     }}
                     postType='article'
                     contentType={EnumContentType.article}
                     username={article?.creator?.signature}
                     userAuthority={article?.creator?.authority_level}
                     avatar={article?.creator?.avatar}
                     userId={article?.creator?.ID}
                     postId={article?.ID}
                     withCategoryTag={categoryId}
                     postSettingsOptions={{
                        showShareopton: true,
                        showEditOption: true,
                        showDeleteOption: true,
                        showReportOption: true,
                        showSavetoFolderOption: false
                     }}
                  />
               </div>

               {/* -------------------- post image ------------ */}
               <Link href={`/posts/article/${article?.ID}`}>
                  <a>
                     <div
                        className={`${styles.image} ${isUsingDefaultImage ? styles.noImage : ""}`}>
                        <Image
                           src={postImage}
                           layout='fill'
                           alt='post thumbnail'
                           onError={() => {
                              setIsUsingDefaultImage(true);
                              setPostImage(THO_DEFAULT_IMG_PLACEHOLDER);
                           }}
                        />
                     </div>

                     {/* -------------------- post header and desc ------------ */}
                     <div className={styles.titleDesc}>
                        <Header type={3} size='small' lineHieght='1.2em' text={article?.title} />
                        <Parragraph text={article?.body} size='small' lineHieght='1.2em' />
                     </div>
                  </a>
               </Link>

               {/* -------------------- post footer ------------ */}
               <div className={styles.footer}>
                  <div className={styles.reactions}>
                     <PostReactions
                        postId={article?.ID}
                        userId={article?.creator?.ID}
                        contentType={3}
                        totalComments={article?.comments?.total_count}
                        postRating={{
                           totalCount: article?.approvals?.total_count,
                           averageCount: article?.approvals?.average_count
                        }}
                     />
                  </div>

                  <div className={styles.timeStamp}>
                     <TimeStamp
                        colorId={categoryId}
                        quiet={false}
                        time={article?.created_on}
                        niceTime={article?.posted_on}
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
