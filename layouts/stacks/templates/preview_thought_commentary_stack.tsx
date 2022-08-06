/**********************************************************************************************************
-  Just a simple background layer that acts as a layover "page" on top of whatever contnent is calling it.
   It is usefull in cases where the majority of the data to be rendered has already been loaded and thus is
   cheaper to render this data in the current page without having to navigate away. 
-  It is also useful in instances where the data has not been saved to the DB and the data must not be lost
   as in post createion
-  This component is used more specifically for the thought and comentary posts although it might get reused 
   in other components in the future
**********************************************************************************************************/

// comps
import { CloseContent } from "../../../fragments/buttons/close_content";
import { IconButton } from "../../../fragments/buttons/icon_button";
import { Icon } from "../../../fragments/chunks/icons";
import { SeePostInfo } from "../../../fragments/chunks/see_post_info";

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
   withEditOption
}: TPrimaryStackprops) => {
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
         </div>
      </div>
   );
};
