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

type TPostCommentTextAreaProps = {
   postId: string | number;
   userId: string | number;
   contentType: EnumContentType;
   editPost?: { body: string; ID: string } | null;
   cta: {
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
   contentType
}: TPostCommentTextAreaProps) => {
   const [currentInputValue, setcurrentInputValue] = useState<string>("");
   const [resetInput, setresetInput] = useState<number>(0);
   const [displayInput, setdisplayInput] = useState(true);
   const [loading, setloading] = useState("done");

   const handlePostComment = async () => {
      setloading("loading");

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
         cta.handleValue(data);
         setloading("done");
      }

      // send post to parent array
      if (!editPost) cta.handlePost();
      else if (editPost && cta.handleEdit) cta.handleEdit();

      // hide input
      setdisplayInput(false);

      // call useEffect reset
      setresetInput(resetInput + 1);
   };

   // reset input
   useEffect(() => {
      // display again
      setdisplayInput(true);
   }, [resetInput]);

   return (
      <>
         {displayInput && (
            <div className={styles.mainWrapper}>
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
               <div onClick={handlePostComment}>
                  {loading === "loading" && <SmallLoader />}
                  {loading !== "loading" && <IconButton icon='checkmark' backgroundColor='1' />}
               </div>
            </div>
         )}
      </>
   );
};
