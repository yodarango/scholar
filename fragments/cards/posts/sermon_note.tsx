import Link from "next/link";

// styles
import styles from "./sermon_note.module.css";

// comps
import { PostCardHeader } from "../../chunks/post_card_header";
import { Header } from "../../Typography/header";
import { TimeStamp } from "../../chunks/time_stamp";

// types
import { TSermonNote } from "../../../types/posts";

type sermonNotesPostProps = {
   sermonNote: TSermonNote;
   cta: {
      handleShowRatePost: React.MouseEventHandler<HTMLDivElement>;
      handleShowPostOptions: React.MouseEventHandler<HTMLDivElement>;
      handleShowPostComments: React.MouseEventHandler<HTMLDivElement>;
      handleShowCategoryMeta: (categoryId: string) => void;
   };
};

export const SermonNote = ({ sermonNote, cta }: sermonNotesPostProps) => {
   const categoryId = sermonNote.category_tags.split(" ")[0].replace("#", "");
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.header}>
            <PostCardHeader
               cta={{
                  handleShowPostOptions: cta.handleShowPostOptions,
                  handleShowCategoryMeta: cta.handleShowCategoryMeta
               }}
               withCategoryTag={categoryId}
               userAuthority={sermonNote.creator.authority_level}
               username={sermonNote.creator.signature}
               userId={sermonNote.creator.ID}
               avatar={sermonNote.creator.avatar}
            />
         </div>

         <Link href={sermonNote.file_url}>
            <a>
               <div className={styles.title}>
                  <Header type={3} text={sermonNote.title} size='main' lineHieght='1.2em' />
               </div>
            </a>
         </Link>

         <div className={styles.timeStamp}>
            <TimeStamp
               colorId={categoryId}
               quiet={false}
               time={sermonNote.date}
               niceTime={sermonNote.posted_on}
            />
         </div>
      </div>
   );
};
