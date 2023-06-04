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
import styles from "./thought.module.css";

// types
import { TThought } from "../../../../types/posts";
import { POST_TYPE_THOUGHT, THO_DEFAULT_IMG_PLACEHOLDER } from "../../../../constants/defaults";
import { EnumContentType } from "../../../../types/enums";
import { useDeleteContent } from "../../../../helpers/functions/posts/content_delete";
import Portal from "../../../hoc/potal";
import { Notification } from "../../popups/notification";
import { errorMessages } from "../../../../data/error_messages";

type TThoughtProps = {
   thought: TThought;

   cta?: {
      handleDelete: (id: string | number) => void;
   };
};

export const Thought = ({ cta, thought }: TThoughtProps) => {
   const [isDeleted, setisDeleted] = useState<boolean>(false);
   const [notification, setNotification] = useState(false);
   const [postImage, setPostImage] = useState<string>(thought.post_image);

   // parse the Category ID
   const categoryId = thought?.category_tags.split(" ")[0].replace("#", "");

   const { handleDelete, data } = useDeleteContent();

   useEffect(() => {
      if (data && data.ID) {
         setisDeleted(true);
      } else {
         setNotification(false);
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
                        handleDelete: (id: number | string) => handleDelete(id, POST_TYPE_THOUGHT)
                     }}
                     postType='thought'
                     contentType={EnumContentType.thought}
                     username={thought?.creator?.signature}
                     userAuthority={thought?.creator?.authority_level}
                     avatar={thought?.creator?.avatar}
                     userId={thought?.creator?.ID}
                     postId={thought?.ID}
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
               <Link href={`/posts/thought/${thought?.ID}`}>
                  <a>
                     <div className={styles.image}>
                        <Image
                           src={postImage}
                           layout='fill'
                           alt='post thumbnail'
                           onError={() => setPostImage(THO_DEFAULT_IMG_PLACEHOLDER)}
                        />
                     </div>

                     {/* -------------------- post header and desc ------------ */}
                     <div className={styles.titleDesc}>
                        <Header type={3} size='small' lineHieght='1.2em' text={thought?.title} />
                        <Parragraph text={thought?.body} size='small' lineHieght='1.2em' />
                     </div>
                  </a>
               </Link>

               {/* -------------------- post footer ------------ */}
               <div className={styles.footer}>
                  <div className={styles.reactions}>
                     <PostReactions
                        postId={thought?.ID}
                        userId={thought?.creator?.ID}
                        contentType={3}
                        totalComments={thought?.comments?.total_count}
                        postRating={{
                           totalCount: thought?.approvals?.total_count,
                           averageCount: thought?.approvals?.average_count
                        }}
                     />
                  </div>

                  <div className={styles.timeStamp}>
                     <TimeStamp
                        colorId={categoryId}
                        quiet={false}
                        time={thought?.created_date}
                        niceTime={thought?.posted_on}
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
