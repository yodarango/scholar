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
import {
   COM_DEFAULT_IMG_PLACEHOLDER,
   LIGHT_COMMENT_BACKGROUNDS
} from "../../../../constants/defaults";
import { EnumContentType } from "../../../../types/enums";
import { FONT_COLOR, PRIMARY_COLOR } from "../../../../constants/tokens";

type TCommentaryProps = {
   customWidth?: boolean;
   commentary: TCommentary;
   cta: {
      handleDelete: (id: string) => void;
   };
};

export const Commentary = ({ commentary, cta, customWidth = false }: TCommentaryProps) => {
   // parse the raw category coming from the DB
   const categoryIdNormalized = commentary?.category_tags.split(" ")[0].replace("#", "");
   const categoryId = `category-${categoryIdNormalized}`;

   const isLightBkg = LIGHT_COMMENT_BACKGROUNDS.includes(categoryIdNormalized);

   return (
      <div
         className={`${styles.mainWrapper} ${customWidth && styles.mainWrapperCustomWidth}`}
         id={categoryId}>
         {/* ---------------- header -------------- */}
         <div className={styles.header}>
            <PostCardHeader
               cta={{ handleDelete: cta.handleDelete }}
               userAuthority={commentary?.creator?.authority_level}
               username={commentary?.creator?.signature}
               avatar={commentary?.creator?.avatar}
               userId={commentary?.creator?.ID}
               postId={commentary?.ID}
               postType='commentary'
               contentType={EnumContentType.commentary}
               fontColor={isLightBkg ? PRIMARY_COLOR : undefined}
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
                     color={isLightBkg ? PRIMARY_COLOR : FONT_COLOR}
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
                  iconColor={isLightBkg ? PRIMARY_COLOR : undefined}
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
                  quiet={isLightBkg}
                  time={commentary?.created_date}
                  niceTime={commentary?.posted_on}
               />
            </div>
         </div>
      </div>
   );
};
