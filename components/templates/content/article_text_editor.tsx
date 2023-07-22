import { useState, useReducer, Reducer, useEffect } from "react";
import { useRouter } from "next/router";

// components
import { TextEditor } from "../../layouts/text_editor";
import { TextEditorTopInfo } from "../../fragments/text_editor_top_info";
import Portal from "../../hoc/potal";
import { Notification } from "../../fragments/popups/notification";

// styles
import styles from "./article_text_editor.module.css";

// helpers
import {
   handlePostContent,
   THandlePostContent
} from "../../../helpers/functions/posts/content_post";
import { getRandomQuote } from "../../../helpers/get_random_quote";

// helpers
import { MM_DD_YYYY } from "../../../helpers/Time/dateFormats";
import { POST_TYPE_ARTICLE } from "../../../constants/defaults";
import { Icon } from "../../fragments/chunks/icons";

type TArticleTextEditorProps = {
   ID?: string; // if the id is not passed the the editor will create new post
   userId: string;
   username: string;
   avatar: string;
   userAuthority: number;
   body?: string;
   titleDefaultValue?: string;
   postImage?: string;
   postPostedOnDate?: string;
   postCreatedDate?: string;
   postCategory?: string;
   postReferences?: string[];
   postPrivacy?: boolean;
   requestType: string;
};

export const ArticleTextEditor = ({
   ID,
   userId,
   username,
   avatar,
   userAuthority,
   body = "",
   titleDefaultValue = "",
   requestType,
   postImage = "",
   postPostedOnDate = "",
   postCreatedDate = "",
   postCategory = "",
   postReferences = []
}: TArticleTextEditorProps) => {
   // state
   // postReferencedVerses do not update on reducer changing
   const [notification, setnotification] =
      useState<null | {
         title: string;
         body: string;
         type: string;
      }>(null);
   const [loading, setloading] = useState("done");
   const [hiddenView, setHiddenView] = useState<boolean>(false);
   const postDate = { created: `${new Date()}`, posted: MM_DD_YYYY("/") };

   const post: any = {
      ID: ID,
      category_tags: postCategory,
      body,
      title: titleDefaultValue,
      referenced_verses: [postReferences],
      post_image: postImage
   };

   const router = useRouter();
   // reducer
   function reducer(state: any, action: any) {
      switch (action.type) {
         case "category":
            return { ...state, category_tags: action.payload };

         case "body":
            return { ...state, body: action.payload };

         case "title":
            return { ...state, title: action.payload };

         case "referencedVerses":
            return { ...state, referenced_verses: [...state.referenced_verses, action.payload] };

         case "isPrivate":
            return { ...state, is_private: action.payload };

         case "referencedVersesRemove":
            return { ...state, referenced_verses: action.payload };

         case "postImage":
            return { ...state, post_image: action.payload };

         // why am I returning the data from a nested child rather than from the bottom"handlePost' function below?
         // Because why waste more network when the data is already in the client
         case "verseData":
            return {
               ...state,
               VERSE_ID: action.payload.id,
               verse_citation: action.payload.reference
            };
      }
   }

   const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, post);

   // handle the saving the post to the DB
   const handlePost = async () => {
      setloading("loading");

      const post = await handlePostContent(state, "Article", requestType);

      if (post?.error) {
         setnotification({ title: post?.error.title, body: post?.error.body, type: "4" });
         setloading("done");
      } else if (post?.success) {
         setloading("disabled");
         setnotification({ title: post?.success.title, body: post?.success?.body, type: "2" });
      }
   };

   // handle the selection of a verse from the ScripturePicker component and also
   // if postImage does not exist, get the corresponding image based on the router verseId
   const handleImageBkgSelection = (url: string) => {
      dispatch({ type: "postImage", payload: url });
   };

   return (
      <>
         <Portal>
            {notification && (
               <Notification
                  title={notification.title}
                  body={notification.body}
                  type={notification.type}
                  cta={{
                     handleClose: () =>
                        notification.type === "2"
                           ? (window.location.href = "/")
                           : setnotification(null)
                  }}
               />
            )}
         </Portal>
         <div className={styles.mainWrapper}>
            <div className={`${styles.topInfo} ${hiddenView ? styles.isHidden : ""}`}>
               {!hiddenView && (
                  <TextEditorTopInfo
                     userAuthority={userAuthority}
                     userId={userId}
                     username={username}
                     avatar={avatar}
                     postImgBkg={postImage}
                     postPostedOnDate={postPostedOnDate}
                     postCreatedDate={postCreatedDate}
                     postCategory={state.category_tags}
                     cta={{
                        handleCloseModal: () => router.back(),
                        handleImageBkgSelection
                     }}
                  />
               )}
               <div
                  className={`${styles.hideVerseView} ${hiddenView ? styles.isHidden : ""} `}
                  onClick={() => setHiddenView(!hiddenView)}>
                  <div>
                     <Icon name='arrowTop' />
                  </div>
               </div>
            </div>
            <div className={`${styles.textEditor}  ${hiddenView ? styles.isHidden : ""}`}>
               <TextEditor
                  includeIsPrivate={false}
                  bodyPlaceHolder={getRandomQuote(1)}
                  withTitle={true}
                  titleMaxL={150}
                  titleDefaultValue={state.title}
                  titlePlaceHolder='Post Title'
                  body={body}
                  postImage={postImage || state.post_image}
                  userAuthority={userAuthority}
                  userId={userId}
                  username={username}
                  avatar={avatar}
                  contentType={POST_TYPE_ARTICLE}
                  postPostedOnDate={postPostedOnDate || postDate.posted}
                  postCreatedDate={postCreatedDate || postDate.created}
                  postCategory={state.category_tags}
                  postReferences={state.referenced_verses}
                  requestStatus={loading}
                  cta={{
                     handleCategorySelection: (category) =>
                        dispatch({ type: "category", payload: category }),
                     handlePrivacySelection: (privacy) =>
                        dispatch({ type: "isPrivate", payload: privacy }),
                     handleBody: (body) => dispatch({ type: "body", payload: body }),
                     handleReferencedVerses: (verses) =>
                        dispatch({ type: "referencedVersesRemove", payload: verses }),
                     handleRefVerseSelection: (verse) => {
                        dispatch({ type: "referencedVerses", payload: verse });
                     },
                     handleTitleValue: (title) => dispatch({ type: "title", payload: title }),
                     handlePost
                  }}
               />
            </div>
         </div>
      </>
   );
};
