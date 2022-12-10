/**********************************************************************************************************
-  Renders a large text body with a header that contains the user's information. 
-  The stack is composed of several small components, which can be rendered optionally by simply passing the
   corresponding props
**********************************************************************************************************/
import { useState } from "react";
import ReactMarkdown from "react-markdown";

// comps
import { BringUpHiddenBottom } from "../../fragments/buttons/bring_up_hidden_bottom";
import { CloseContent } from "../../fragments/buttons/close_content";
import { IconButton } from "../../fragments/buttons/icon_button";
import { Primary } from "../../fragments/buttons/primary";
import { SeePostInfo } from "../../fragments/chunks/see_post_info";
import { TextAreaPrimary } from "../../fragments/inputs/text_area_primary";
import { Header } from "../../fragments/Typography/header";
import { VerseRefTagWrapper } from "../../fragments/verse_ref_tag_wrapper";

// styles
import styles from "./with_text_content_stack.module.css";

type TPrimaryStackprops = {
   title: string;
   body: string | null;
   postImage: string;
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   textAreaHeight?: string;
   textAreaMaxHeight?: string;
   textAreaMaxLength?: number;
   postPostedOnDate?: string;
   postCreatedDate?: string;
   postCategory?: string;
   postReferences?: string[];
   withEdit?: boolean;
   noResize?: boolean;
   cta: {
      handleCloseModal: () => void;
      handleSubmit?: () => any;
      handleBodyValue?: (value: string) => void;
   };
};

export const WithTextContentStack = ({
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
   textAreaHeight,
   textAreaMaxHeight,
   textAreaMaxLength = 500,
   withEdit,
   noResize,
   postReferences
}: TPrimaryStackprops) => {
   // state
   const [showVerseReferences, setshowVerseReferences] = useState(false);
   const [contentWrapperClass, setcontentWrapperClass] =
      useState(""); /* adds a new class to content holder*/
   const [isEditable, setIsEditable] = useState(false);

   // toggle the classes and state of the referenced verses
   const handleShowVerseRefs = () => {
      !showVerseReferences ? setshowVerseReferences(true) : setshowVerseReferences(false);
      !showVerseReferences
         ? setcontentWrapperClass(styles.contentHolderShrink)
         : setcontentWrapperClass("");
   };

   return (
      <div className={styles.mainWrapper}>
         {/* header */}
         <div className={styles.imgBkg} style={{ backgroundImage: `url(${postImage})` }}>
            <div className={styles.topLayerColorBkg}></div>
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: cta.handleCloseModal }} />
            </div>

            {withEdit && (
               <div className={styles.edit}>
                  <IconButton
                     icon='edit'
                     cta={{ handleClick: () => setIsEditable(!isEditable) }}
                     backgroundColor={isEditable ? "2" : "1"}
                     iconColor='#F1EAFF'
                  />
               </div>
            )}

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
               />
            </div>
         </div>

         {/* subwrapper where content is held */}
         <div className={styles.subWrapper}>
            <div className={styles.title}>
               <Header text={title} size='l' type={2} />
            </div>
            {!isEditable && (
               <div className={`${contentWrapperClass} ${styles.contentHolder}`}>
                  <ReactMarkdown>{body ? body : ""}</ReactMarkdown>
               </div>
            )}
            {cta.handleBodyValue && isEditable && cta.handleSubmit && (
               <div className={styles.text}>
                  <TextAreaPrimary
                     noResize={noResize}
                     transparent
                     border='bottom'
                     defaultValue={body ? body : ""}
                     maxLength={textAreaMaxLength}
                     maxHeight={textAreaMaxHeight}
                     placeHolder='Tell others about you'
                     height={textAreaHeight}
                     cta={{ handleCurrentValue: cta.handleBodyValue }}
                  />
                  <div className={styles.button}>
                     <Primary type='1' title='Save' cta={{ handleClick: cta.handleSubmit }} />
                  </div>
               </div>
            )}

            {/* references  */}
            {postReferences && (
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
            )}
         </div>
      </div>
   );
};
