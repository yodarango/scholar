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
import { TThought } from "../../../types/posts";

type TThoughtProps = {
   thought: TThought;
};

export const Thought = ({ thought }: TThoughtProps) => {
   // state
   const [modalToShow, setModalToShow] = useState<number>(0);

   // parse the Category ID
   const categoryId = thought.category_tags.split(" ")[0].replace("#", "");

   return (
      <div className={`${styles.mainWrapper}`}>
         {/* -------------------- post header ------------ */}
         <div className={styles.header}>
            <PostCardHeader
               username={thought.creator.signature}
               userAuthority={thought.creator.authority_level}
               avatar={thought.creator.avatar}
               userId={thought.creator.ID}
               postId={thought.ID}
               withCategoryTag={categoryId}
            />
         </div>

         {/* -------------------- post image ------------ */}
         <Link href={`/posts/thoughts/${thought.ID}`}>
            <a>
               <div className={styles.image}>
                  <Image src={thought.postImage} layout='fill' alt='post thumbnail' />
               </div>

               {/* -------------------- post header and desc ------------ */}
               <div className={styles.titleDesc}>
                  <Header type={3} size='small' lineHieght='1.2em' text={thought.title} />
                  <Parragraph text={thought.body} size='small' lineHieght='1.2em' />
               </div>
            </a>
         </Link>

         {/* -------------------- post footer ------------ */}
         <div className={styles.footer}>
            <div className={styles.reactions}>
               <PostReactions
                  totalComments={thought.comments[0].total_count}
                  postRating={{
                     totalCount: thought.approvals.length,
                     averageCount: thought.approvals.length
                  }}
               />
            </div>

            <div className={styles.timeStamp}>
               <TimeStamp
                  colorId={categoryId}
                  quiet={false}
                  time={thought.date}
                  niceTime={thought.posted_on}
               />
            </div>
         </div>
      </div>
   );
};
