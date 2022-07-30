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
import { TCommentary } from "../../../types/posts";

type TCommentaryProps = {
   commentary: TCommentary;
   cta: {
      handleShowRatePost: React.MouseEventHandler<HTMLDivElement>;
      handleShowPostOptions: React.MouseEventHandler<HTMLDivElement>;
      handleShowPostComments: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const Commentary = ({ commentary, cta }: TCommentaryProps) => {
   const categoryId = `category-${commentary.category_tags.split(" ")[0].replace("#", "")}`;

   return (
      <div className={`${styles.mainWrapper}`} id={categoryId}>
         {/* ---------------- header -------------- */}
         <div className={styles.header}>
            <PostCardHeader
               userAuthority={commentary.creator.authority_level}
               username={commentary.creator.signature}
               avatar={commentary.creator.avatar}
               userId={commentary.creator.ID}
               cta={{ handleShowPostOptions: cta.handleShowPostOptions }}
            />
         </div>

         {/* ----------------- post thumbnail ----------- */}
         <Link href={`/posts/commentary/${commentary.ID}`}>
            <a>
               <div className={styles.image}>
                  <Image
                     src={commentary.postImage}
                     layout='fill'
                     alt='background cover for a book of the bible'
                  />
               </div>

               {/* ----------------- verse reference ---------------- */}
               <div className={styles.reference}>
                  <Parragraph text={commentary.verse_citation} size='small' lineHieght='.9em' />
               </div>
            </a>
         </Link>
         {/* -------------------- post footer ------------ */}
         <div className={styles.footer}>
            <div className={styles.reactions}>
               <PostReactions
                  cta={{
                     handleShowPostComments: cta.handleShowPostComments,
                     handleShowRatePost: cta.handleShowRatePost
                  }}
                  totalComments={commentary.comments[0].total_count}
                  postRating={{
                     totalCount: commentary.approvals.length,
                     averageCount: commentary.approvals.length
                  }}
               />
            </div>
            <div className={styles.timeStamp}>
               <TimeStamp
                  colorId={categoryId}
                  quiet={false}
                  time={commentary.date}
                  niceTime={commentary.posted_on}
               />
            </div>
         </div>
      </div>
   );
};
