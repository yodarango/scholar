// styles
import sermonNotesPostStyles from "../styles/posts/SermonNotesPost.module.css";

export type TsermonPost = {
   ID: string;
   content: string;
   USER_ID: string;
   title: string;
   category_tags: string;
   posted_on: string;
   total_count: number;
   file_url: string;
   creator: {
      ID: string;
      signature: string;
      avatar: string;
      authority_level: string;
      approval_rating: string | number;
   };
};

type sermonNotesPostProps = {
   sermonPost: TsermonPost;
   deleteOption: boolean;
   editOption: boolean;
   reportOption: boolean;
};

const SermonNotesPost = ({ sermonPost }: sermonNotesPostProps) => {
   return (
      <div className={sermonNotesPostStyles.mainWrapper}>
         <div className={sermonNotesPostStyles.reputationWrapper}>
            <div
               className={sermonNotesPostStyles.avatar}
               style={{ backgroundImage: `url(${sermonPost.creator.avatar})` }}></div>
         </div>
         <h3 className={sermonNotesPostStyles.title}>{sermonPost.title}</h3>
         <h4 className={sermonNotesPostStyles.signature}>{sermonPost.creator.signature}</h4>
         <p className={sermonNotesPostStyles.postedOn}>{sermonPost.posted_on}</p>
         <a href={`${sermonPost.file_url}`} className={sermonNotesPostStyles.sermonLink}>
            See sermon notes
         </a>
      </div>
   );
};

export default SermonNotesPost;
