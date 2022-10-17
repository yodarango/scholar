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
import { TComment } from "../../types/posts_contnet";
import { EnumContentType } from "../../types/enums";

// data
import { ServerErrors } from "../../data/server_errors";

type TPostCommentsProps = {
   postId: string;
   contentType: EnumContentType;
   cta: {
      handleValue: (value: string) => void;
      handleClose: () => void;
   };
};

export const PostComments = ({ cta }: TPostCommentsProps) => {
   // state
   const [postComments, setpostComments] = useState<TComment[]>([]);
   const [loading, setloading] = useState<string>("loading");

   const getPostComments = async () => {
      //setloading("loading");
      //implement a switch statement to call the right helper based on the ID and type passed
   };

   useEffect(() => {
      getPostComments();
   }, []);
   return (
      <PrimaryStack title={"Comments"} cta={{ handleClose: cta.handleClose }}>
         <>
            {loading === "done" && (
               <div className={styles.mainWrapper}>
                  <div className={styles.postComments}>
                     <PostCommentsWrapper postComments={postComments} />
                  </div>
                  <div className={styles.textArea}>
                     <PostCommentTextArea cta={{ handleValue: cta.handleValue }} />
                  </div>
               </div>
            )}
            {loading === "loading" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
            {loading === "error" && (
               <div className={styles.loader}>
                  <ResourceNotFoundError text={ServerErrors.postComments.text} />
               </div>
            )}
         </>
      </PrimaryStack>
   );
};
