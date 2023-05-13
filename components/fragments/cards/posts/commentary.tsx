import { useEffect, useState } from "react";
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

import { useDeleteContent } from "../../../../helpers/functions/posts/content_delete";
import Portal from "../../../hoc/potal";
import { Notification } from "../../popups/notification";
import { errorMessages } from "../../../../data/error_messages";
import { Icon } from "../../chunks/icons";
import { FONT_COLOR } from "../../../../constants/tokens";

type TCommentaryProps = {
   customWidth?: boolean;
   commentary: TCommentary;
};

export const Commentary = ({ commentary, customWidth = false }: TCommentaryProps) => {
   const [isDeleted, setisDeleted] = useState<boolean>(false);
   const [notification, setNotification] = useState(false);
   const [postImage, setpostImage] = useState<string>(
      commentary?.post_image || COM_DEFAULT_IMG_PLACEHOLDER
   );

   // parse the raw category coming from the DB
   const categoryIdNormalized = commentary?.category_tags.split(" ")[0].replace("#", "");
   const categoryId = `category-${categoryIdNormalized}--card`;

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
            <div
               className={`${styles.mainWrapper} ${customWidth && styles.mainWrapperCustomWidth}`}
               id={categoryId}>
               {/* ---------------- header -------------- */}
               <div className={styles.header}>
                  <PostCardHeader
                     cta={{
                        handleDelete: (id: string | number) =>
                           handleDelete(id, POST_TYPE_COMMENTARY)
                     }}
                     userAuthority={commentary?.creator?.authority_level}
                     username={commentary?.creator?.signature}
                     avatar={commentary?.creator?.avatar}
                     userId={commentary?.creator?.ID}
                     postId={commentary?.ID}
                     postType='commentary'
                     contentType={EnumContentType.commentary}
                     folderId={commentary?.folder_id}
                     folderName={commentary?.folder_name}
                  />
               </div>

               {/* ----------------- post thumbnail ----------- */}
               <Link href={`/posts/commentary/${commentary?.ID}`}>
                  <a>
                     <div className={styles.image}>
                        <Image
                           src={postImage}
                           layout='fill'
                           alt='background cover for a book of the bible'
                           onError={() => setpostImage(COM_DEFAULT_IMG_PLACEHOLDER)}
                        />
                        {commentary.is_private && (
                           <div className={styles.imageIcon} id={categoryId}>
                              <Icon name='lockClosed' color={FONT_COLOR} size='15px' />
                           </div>
                        )}
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
