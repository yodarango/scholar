/**********************************************************************************************************
-  Background layer that acts as a layover "page" on top of whatever contnent is calling it.
   It allows users to preview their content without having to naviate to another page and thus they do not
   have to lose their data in the post editor.
-  This component is used more specifically for the thought and comentary posts although it might get reused 
   in other components in the future
**********************************************************************************************************/
import { useState } from "react";
import ReactMarkdown from "react-markdown";

// comps
import { BringUpHiddenBottom } from "../../fragments/buttons/bring_up_hidden_bottom";
import { CloseContent } from "../../fragments/buttons/close_content";
import { SeePostInfo } from "../../fragments/chunks/see_post_info";
import { Header } from "../../fragments/Typography/header";
import { VerseRefTagWrapper } from "../../fragments/verse_ref_tag_wrapper";

// styles
import styles from "./preview_thought_commentary_stack.module.css";

type TPrimaryStackprops = {
   title: string;
   body: string | null;
   postImage: string;
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate: string;
   postCreatedDate: string;
   postCategory: string;
   postReferences: string[];
   cta: {
      handleCloseModal: () => void;
   };
};

export const PreviewThoughtCommentaryStack = ({
   title,
   body,
   cta,
   postImage,
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory,
   postReferences
}: TPrimaryStackprops) => {
   // state
   const [showVerseReferences, setshowVerseReferences] = useState(false);
   const [contentWrapperClass, setcontentWrapperClass] =
      useState(""); /* adds a new class to content holder*/

   // toggle the classes and state of the referenced verses
   const handleShowVerseRefs = () => {
      !showVerseReferences ? setshowVerseReferences(true) : setshowVerseReferences(false);
      !showVerseReferences
         ? setcontentWrapperClass(styles.contentHolderShrink)
         : setcontentWrapperClass("");
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.imgBkg} style={{ backgroundImage: `url(${postImage})` }}>
            <div className={styles.topLayerColorBkg}></div>
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: cta.handleCloseModal }} />
            </div>

            {/*  post info */}
            <div className={styles.postInfo}>
               <SeePostInfo
                  cta={{ handleClickOnAvatar() {} }}
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

         {/* subwrapper where content is held */}
         <div className={styles.subWrapper}>
            <Header text={title} size='l' type={2} />
            <div className={`${contentWrapperClass} ${styles.contentHolder}`}>
               <ReactMarkdown>{body ? body : ""}</ReactMarkdown>
            </div>

            {/* references  */}
            <div className={styles.referencesWrapper}>
               <div>
                  <BringUpHiddenBottom
                     cta={{
                        handleClick: () => handleShowVerseRefs()
                     }}
                  />
               </div>
               {showVerseReferences && (
                  <div className={styles.references}>
                     <VerseRefTagWrapper refs={postReferences} />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
