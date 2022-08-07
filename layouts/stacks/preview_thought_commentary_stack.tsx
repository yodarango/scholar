/**********************************************************************************************************
-  Background layer that acts as a layover "page" on top of whatever contnent is calling it.
   It allows users to preview their content without having to naviate to another page and thus they do not
   have to lose their data in the post editor.
-  This component is used more specifically for the thought and comentary posts although it might get reused 
   in other components in the future
**********************************************************************************************************/

// comps
import { CloseContent } from "../../fragments/buttons/close_content";
import { IconButton } from "../../fragments/buttons/icon_button";
import { SeePostInfo } from "../../fragments/chunks/see_post_info";
import { VerseRefTagWrapper } from "../../fragments/verse_ref_tag_wrapper";

// styles
import styles from "./preview_thought_commentary_stack.module.css";

type TPrimaryStackprops = {
   content: JSX.Element;
   postImage: string;
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate: string;
   postCreatedDate: string;
   postCategory: string;
   withEditOption: boolean;
   postReferences: string[];
   cta: {
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const PreviewThoughtCommentaryStack = ({
   content,
   cta,
   postImage,
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory,
   withEditOption,
   postReferences
}: TPrimaryStackprops) => {
   // state
   const [showVerseReferences, setshowVerseReferences] = useState(false)
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.imgBkg} style={{ backgroundImage: `url(${postImage})` }}>
            <div className={styles.topLayerColorBkg}></div>
            <div className={styles.close}>
               <CloseContent cta={cta.handleCloseModal} />
            </div>
            {withEditOption && (
               <div className={styles.editOption}>
                  <IconButton
                     backgroundColor='1'
                     custombuttonSize={true}
                     icon='edit'
                     cta={{ handleClick: () => {} }}
                  />
               </div>
            )}
            <div className={styles.postInfo}>
               <SeePostInfo
                  userAuthority={userAuthority}
                  userId={userId}
                  username={username}
                  avatar={avatar}
                  postPostedOnDate={postPostedOnDate}
                  postCreatedDate={postCreatedDate}
                  postCategory={postCategory}
               />
            </div>
         </div>
         <div className={styles.subWrapper}>
            <div className={styles.contentHolder}>{content}</div>
            <div className={styles.references}>
               {showVerseReferences && <VerseRefTagWrapper refs={postReferences} />}
               {!showVerseReferences &&}
            </div>
         </div>
      </div>
   );
};
