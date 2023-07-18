/*******************************************************************************************
-  This component sets the current input value to the parent to post it.
-  The body sent can be a newly written comment or an edit of an already made post 
-  If the body is an edit post the props editPost and isEditPost need to be passed containing 
   the existent comment body and commentID 
********************************************************************************************/
import { useEffect, useState } from "react";

// components
import { IconButton } from "../buttons/icon_button";
import { TextAreaPrimary } from "./text_area_primary";
import { SmallLoader } from "../chunks/small_loader";

// styles
import styles from "./post_comment_text_area.module.css";

// helpers
import { postContentComment } from "../../../helpers/functions/posts/content_post_comment";

// types
import { EnumContentType } from "../../../types/enums";
import { YouNeedToLoginModal } from "../../common/modals/you_need_to_login_modal";
import { POST_TYPE_QUOTE, POST_TYPE_COMMENTARY } from "../../../constants/defaults";
import { Notification } from "../popups/notification";
import { errorMessages } from "../../../data/error_messages";
const {
   posts: { contentComment }
} = errorMessages;

type TPostCommentTextAreaProps = {
   postId: string | number;
   userId: string | number;
   contentType: EnumContentType;
   canCancel?: boolean;
   editPost?: { body: string; ID: string } | null;
   cta: {
      handleCancel?: () => void;
      handlePost: () => void;
      handleEdit?: () => void;
      handleValue: (value: string) => void;
   };
};

export const PostCommentTextArea = ({
   cta,
   postId,
   userId,
   editPost = null,
   canCancel = false,
   contentType
}: TPostCommentTextAreaProps) => {
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [currentInputValue, setcurrentInputValue] = useState<string>("");
   const [resetInput, setresetInput] = useState<number>(0);
   const [displayInput, setdisplayInput] = useState(true);
   const [loading, setloading] = useState("done");
   const [notification, setnotification] =
      useState<{
         title: string;
         body: string;
         type: string;
      } | null>(null);

   const dataType =
      contentType === POST_TYPE_COMMENTARY
         ? "Commentary_Comment"
         : contentType === POST_TYPE_QUOTE
         ? "Quote_Comment"
         : "Article_Comment";

   const handlePostComment = async () => {
      setloading("loading");
      try {
         // post to db and send the value to the parent after success to add it to the comentary array
         const data = await postContentComment(
            {
               ID: editPost?.ID ? editPost?.ID : null,
               USER_ID: userId,
               POST_ID: postId,
               body: currentInputValue
            },
            contentType
         );

         if (data) {
            if (data.__typename === dataType) {
               cta.handleValue(data);
            } else if ((data.__typename = "NotAuthorized")) {
               setOpenModal(true);
            }
         } else {
            setnotification({
               ...contentComment,
               type: "4"
            });
         }

         // send post to parent array
         if (!editPost) cta.handlePost();
         else if (editPost && cta.handleEdit) cta.handleEdit();

         // hide input
         setdisplayInput(false);

         // call useEffect reset
         setresetInput(resetInput + 1);
      } catch (error) {
         console.error(error);
      } finally {
         setloading("done");
      }
   };

   // reset input
   useEffect(() => {
      // display again
      setdisplayInput(true);
   }, [resetInput]);

   return (
      <>
         {notification && (
            <Notification
               title={notification?.title || ""}
               body={notification?.body}
               type={notification?.type || "1"}
               cta={{ handleClose: () => setnotification(null) }}
            />
         )}

         {displayInput && (
            <div className={styles.mainWrapper}>
               <YouNeedToLoginModal open={openModal} onClose={() => setOpenModal(false)} />
               <div className={styles.textArea}>
                  <TextAreaPrimary
                     height='5rem'
                     maxHeight={15}
                     defaultValue={editPost && editPost.body ? editPost.body : ""}
                     placeHolder='Comment...'
                     maxLength={150}
                     cta={{ handleCurrentValue: (value: string) => setcurrentInputValue(value) }}
                  />
               </div>
               <div className={styles.buttonsWrapper}>
                  {loading === "loading" && <SmallLoader />}
                  {loading !== "loading" && canCancel && (
                     <div className={styles.cancelButton}>
                        <IconButton
                           icon='close'
                           iconSize='3rem'
                           strokeWidth='64'
                           backgroundColor='2'
                           cta={{ handleClick: cta.handleCancel ? cta.handleCancel : () => {} }}
                        />
                     </div>
                  )}
                  {loading !== "loading" && (
                     <IconButton
                        icon='checkmark'
                        strokeWidth='64'
                        iconSize='3rem'
                        backgroundColor='1'
                        cta={{ handleClick: handlePostComment }}
                     />
                  )}
               </div>
            </div>
         )}
      </>
   );
};
