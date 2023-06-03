/********************************************************************************************
-  EDIT functionality
      the relationship among this component and it children and the children to each other is 
      kind of weird. Might be able to ix it in the future. For now:
         1. The parent (this comp) passes the postId to the PostCommentsWrapper > 
         2. PostCommentsWrapper contains the "Edit" button that triggers the "handleEdit()" >
         3. handleEdit contains the current body and ID of the comment being edited
         4. handleEdit sets those values in a state which are passed to the PostCommentTextArea
         5. PostCommentTextArea does the editing and posting using the body and ID props
         6. the "post" function calls the callback to add the edited comp to PostCommentsWrapper
         by passing the curren "post" value and the boolean isEditPost
********************************************************************************************/
import { useEffect, useState } from "react";

// comps
import { PostCommentsWrapper } from "../scrollers/user_content/post_comments_wrapper";
import { PrimaryStack } from "./templates/primary_stack";
import { PostCommentTextArea } from "../../fragments/inputs/post_comment_text_area";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./post_coments.module.css";

// types
import { EnumContentType } from "../../../types/enums";

type TPostCommentsProps = {
   postId: string | number;
   userId: string | number;
   contentType: EnumContentType;
   cta: {
      handleClose: () => void;
      handlePost: () => any;
      handleEditPost?: () => void;
      handleDelete: () => void;
   };
};

export const PostComments = ({ postId, userId, contentType, cta }: TPostCommentsProps) => {
   const [post, setpost] = useState<any>(null);
   const [isEditPost, setisEditPost] = useState<number>(0);
   const [editPost, seteditPost] = useState<{ ID: string; body: string } | null>(null);

   // pass the body down to text area body once edit option has been clicked
   //no allowing edits for now 👍
   // const handleEdit = (ID: string, body: string) => {
   //    seteditPost({ ID, body });
   // };

   // reset everything once the comment has been edited
   const finishEdit = () => {
      setisEditPost(isEditPost + 1);
      seteditPost(null);
   };

   return (
      <PrimaryStack title={"Comments"} cta={{ handleClose: cta.handleClose }}>
         <div className={styles.mainWrapper}>
            <div className={styles.postComments}>
               <PostCommentsWrapper
                  cta={{ handleDelete: cta.handleDelete /*handleEdit*/ }}
                  postId={postId}
                  contentType={contentType}
                  newPost={post}
                  isEditPost={isEditPost}
               />
            </div>
            <div className={styles.textArea}>
               <PostCommentTextArea
                  postId={postId}
                  userId={userId}
                  contentType={contentType}
                  canCancel={!(editPost === null || editPost === undefined)}
                  editPost={editPost ? { ID: editPost.ID, body: editPost.body } : null}
                  cta={{
                     handleValue: (post) => setpost(post),
                     handlePost: cta.handlePost,
                     handleEdit: finishEdit,
                     handleCancel: () => seteditPost(null)
                  }}
               />
            </div>
         </div>
      </PrimaryStack>
   );
};
