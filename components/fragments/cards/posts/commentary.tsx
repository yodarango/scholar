import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// comps
import { PostCardHeader } from "../../chunks/post_card_header";
import { Parragraph } from "../../Typography/parragraph";
import { PostReactions } from "../../post_reactions";
import { TimeStamp } from "../../chunks/time_stamp";

// styles
import styles from "./commentary.module.css";

// types
import { TCommentary } from "../../../../types/posts";
import { COM_DEFAULT_IMG_PLACEHOLDER, POST_TYPE_COMMENTARY } from "../../../../constants/defaults";
import { EnumContentType } from "../../../../types/enums";

import { deleteContent } from "../../../../helpers/functions/posts/content_delete";
import Portal from "../../../hoc/potal";
import { Notification } from "../../popups/notification";
import { errorMessages } from "../../../../data/error_messages";

type TCommentaryProps = {
   customWidth?: boolean;
   commentary: TCommentary;
};

export const Commentary = ({ commentary, customWidth = false }: TCommentaryProps) => {
   const [isDeleted, setisDeleted] = useState<boolean>(false);
   const [notification, setNotification] = useState(false);

   // parse the raw category coming from the DB
   const categoryIdNormalized = commentary?.category_tags.split(" ")[0].replace("#", "");
   const categoryId = `category-${categoryIdNormalized}--card`;

   const handleDelete = async (id: string | number) => {
      try {
         const isDeleted = await deleteContent(id, POST_TYPE_COMMENTARY);

         if (isDeleted && isDeleted.ID) {
            setisDeleted(true);
         } else {
            setNotification(true);
         }
      } catch (error) {
         console.error(error);
      }
   };

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
            <div
               className={`${styles.mainWrapper} ${customWidth && styles.mainWrapperCustomWidth}`}
               id={categoryId}>
               {/* ---------------- header -------------- */}
               <div className={styles.header}>
                  <PostCardHeader
                     cta={{ handleDelete }}
                     userAuthority={commentary?.creator?.authority_level}
                     username={commentary?.creator?.signature}
                     avatar={commentary?.creator?.avatar}
                     userId={commentary?.creator?.ID}
                     postId={commentary?.ID}
                     postType='commentary'
                     contentType={EnumContentType.commentary}
                  />
               </div>

               {/* ----------------- post thumbnail ----------- */}
               <Link href={`/posts/commentary/${commentary?.ID}`}>
                  <a>
                     <div className={styles.image}>
                        <Image
                           src={
                              commentary?.post_image
                                 ? commentary?.post_image
                                 : COM_DEFAULT_IMG_PLACEHOLDER
                           }
                           layout='fill'
                           alt='background cover for a book of the bible'
                        />
                     </div>

                     {/* ----------------- verse reference ---------------- */}
                     <div className={styles.reference}>
                        <Parragraph
                           text={commentary?.verse_citation}
                           size='small'
                           lineHieght='.9em'
                        />
                     </div>
                  </a>
               </Link>
               {/* -------------------- post footer ------------ */}
               <div className={styles.footer}>
                  <div className={styles.reactions}>
                     <PostReactions
                        contentType={1}
                        postId={commentary?.ID}
                        userId={commentary?.creator?.ID}
                        totalComments={commentary?.comments?.total_count}
                        postRating={{
                           totalCount: commentary?.approvals?.total_count,
                           averageCount: commentary?.approvals?.average_count
                        }}
                     />
                  </div>
                  <div className={styles.timeStamp}>
                     <TimeStamp
                        colorId={categoryId}
                        time={commentary?.created_date}
                        niceTime={commentary?.posted_on}
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
