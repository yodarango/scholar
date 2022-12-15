/******************************************************************************************** 
-  This components loads all the available options for the text editor. 
-  Since "referenced verses" are only allowed in commentaries type only for now the button is 
   optionally rendered through a "showReferences" prop
-  This component returns 4 callbacks:
   -  verse chosen
   -  category chosen
   -  privacy chosen
   -  post to db
*********************************************************************************************/

import { useState } from "react";

//comps
import { IconButton } from "../fragments/buttons/icon_button";
import { Primary } from "../fragments/buttons/primary";
import { Secondary } from "../fragments/buttons/secondary";
import { CategoryTag } from "../fragments/chunks/category_tag";
import { TextEditorFormating } from "../fragments/text_editor_formating";
import { Parragraph } from "../fragments/Typography/parragraph";
import { PrimaryStack } from "./stacks/templates/primary_stack";
import { BibleBooksWrapper } from "./scrollers/bible_books_wrapper";
import { NotificationFade } from "../fragments/popups/notification_fade";

// styles
import styles from "./text_editor_actions.module.css";

// helpers
import Portal from "../hoc/potal";

// data
import { notificationMessages } from "../../data/notification_messages";
import { WithTextContentStack } from "./stacks/with_text_content_stack";

type TTextEditorFormatterActionsProps = {
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
   postPrivacy: boolean;
   postButtonTitle?: string;
   cta: {
      handleRefVerseSelection: (id: string) => void;
      handlePrivacySelection: (privacy: boolean) => void;
      handleCategorySelection: (id: string) => void;
      handlePost: (post?: any) => void;
   };
};

export const TextEditorActions = ({
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
   postReferences,
   postPrivacy,
   postButtonTitle = "Post"
}: TTextEditorFormatterActionsProps) => {
   // state
   const [postIsPrivate, setpostIsPrivate] = useState<boolean>(postPrivacy);
   const [showNotificationFadePopUp, setshowNotificationFadePopUp] = useState<number>(0);
   const [showChooseScriptureModal, setshowChooseScriptureModal] = useState<boolean>(false);
   const [showPostPreview, setshowPostPreview] = useState<boolean>(false);

   // handle the referenced verse selection by clossing modal and calling cta.handleRefVerseSelection
   const handlerefVerseSelection = (id: string) => {
      setshowNotificationFadePopUp(showNotificationFadePopUp + 1);
      cta.handleRefVerseSelection(id);
   };

   // handle preview of the post
   const handlePreview = () => {
      setshowPostPreview(true);
   };
   return (
      <>
         {/* portals */}
         <Portal>
            {showChooseScriptureModal && (
               <div className={styles.bibleBooksStack}>
                  <PrimaryStack
                     title='Select scripture'
                     cta={{ handleClose: () => setshowChooseScriptureModal(false) }}>
                     <BibleBooksWrapper
                        stopAtChapterId={true}
                        versionId='de4e12af7f28f599-02'
                        stopAtVerse={false}
                        stopAtChapter={false}
                        cta={{ handleChoice: handlerefVerseSelection }}
                     />
                  </PrimaryStack>
               </div>
            )}
            {showNotificationFadePopUp > 0 && (
               <div className={styles.notificationFade}>
                  <NotificationFade
                     render={showNotificationFadePopUp}
                     body={notificationMessages.selectNewScriptureSuccess.body}
                     type='2'
                  />
               </div>
            )}

            {showPostPreview && (
               <WithTextContentStack
                  title={title}
                  postReferences={postReferences}
                  body={body}
                  cta={{ handleCloseModal: () => setshowPostPreview(false) }}
                  postImage={postImage}
                  userAuthority={userAuthority}
                  userId={userId}
                  username={username}
                  avatar={avatar}
                  postPostedOnDate={postPostedOnDate}
                  postCreatedDate={postCreatedDate}
                  postCategory={postCategory}
               />
            )}
         </Portal>

         {/* content  rendered on load*/}
         <div className={styles.mainWrapper}>
            <div className={styles.textEditorFormatter}>
               <TextEditorFormating />
            </div>

            <div className={styles.preview}>
               <IconButton icon='eye' backgroundColor='1' cta={{ handleClick: handlePreview }} />
            </div>

            <div className={styles.reference}>
               <Secondary
                  title='Reference'
                  icon='📖'
                  cta={{
                     handleClick: () => setshowChooseScriptureModal(true)
                  }}
                  type='1'
               />
            </div>

            <div className={styles.privacy}>
               {postIsPrivate && (
                  <>
                     <div className={styles.sideText}>
                        <Parragraph text='Private' quiet={true} size='xsmall' bold={true} />
                     </div>
                     <IconButton
                        icon='lockClosed'
                        backgroundColor='2'
                        cta={{
                           handleClick: () => (
                              setpostIsPrivate(false), cta.handlePrivacySelection(false)
                           )
                        }}
                     />
                  </>
               )}
               {!postIsPrivate && (
                  <>
                     <div className={styles.sideText}>
                        <Parragraph text='Public' quiet={true} size='xsmall' bold={true} />
                     </div>
                     <IconButton
                        icon='lockOpen'
                        backgroundColor='1'
                        cta={{
                           handleClick: () => (
                              setpostIsPrivate(true), cta.handlePrivacySelection(true)
                           )
                        }}
                     />
                  </>
               )}
            </div>

            <div className={styles.category}>
               <div className={styles.sideText}>
                  <Parragraph text={"Category"} quiet={true} size='xsmall' bold={true} />
               </div>
               <CategoryTag
                  id={postCategory}
                  informativeOnly={false}
                  cta={{ handleSelection: (id) => cta.handleCategorySelection(id) }}
               />
            </div>

            <div className={styles.post}>
               <Primary type='1' title={postButtonTitle} cta={{ handleClick: cta.handlePost }} />
            </div>
         </div>
      </>
   );
};
