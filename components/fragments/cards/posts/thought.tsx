/****************************************************************************************************************
-  post type that gets all its data to display from the parent but should be responsible for it own data update
 *****************************************************************************************************************/

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
import { THO_DEFAULT_IMG_PLACEHOLDER } from "../../../../constants/defaults";
import { EnumContentType } from "../../../../types/enums";

type TThoughtProps = {
   thought: TThought;
   cta: {
      handleDelete: (id: string) => void;
   };
};

export const Thought = ({ thought, cta }: TThoughtProps) => {
   // parse the Category ID
   const categoryId = thought?.category_tags.split(" ")[0].replace("#", "");

   return (
      <div className={`${styles.mainWrapper}`}>
         {/* -------------------- post header ------------ */}
         <div className={styles.header}>
            <PostCardHeader
               cta={{ handleDelete: cta.handleDelete }}
               postType='thought'
               contentType={EnumContentType.thought}
               username={thought?.creator?.signature}
               userAuthority={thought?.creator?.authority_level}
               avatar={thought?.creator?.avatar}
               userId={thought?.creator?.ID}
               postId={thought?.ID}
               withCategoryTag={categoryId}
            />
         </div>

         {/* -------------------- post image ------------ */}
         <Link href={`/posts/thought/${thought?.ID}`}>
            <a>
               <div className={styles.image}>
                  <Image
                     src={thought?.post_image ? thought?.post_image : THO_DEFAULT_IMG_PLACEHOLDER}
                     layout='fill'
                     alt='post thumbnail'
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
   );
};
