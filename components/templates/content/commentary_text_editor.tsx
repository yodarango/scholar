import { useState, useReducer, Reducer } from "react";
import { useRouter } from "next/router";

// components
import { TextEditor } from "../../layouts/text_editor";
import { TextEditorVerseSelection } from "../../fragments/text_editor_verse_selection";
import { Notification } from "../../fragments/popups/notification";
import Portal from "../../hoc/potal";

// styles
import styles from "./commentary_text_editor.module.css";

// helpers
import { Bible, TBible } from "../../../data/bible";
import { TBibleVerse } from "../../../types/bible_api";
import {
   handlePostContent,
   THandlePostContent
} from "../../../helpers/functions/posts/content_post";
import { CloseContent } from "../../fragments/buttons/close_content";

type TCommentaryTextEditorProps = {
   ID?: string;
   userId?: string;
   username?: string;
   avatar?: string;
   userAuthority?: number;
   verseId?: string;
   verseCitation?: string;
   verseContent?: string;
   body?: string;
   folderId?: string | number;
   postImage?: string;
   postPostedOnDate?: string;
   postCreatedDate?: string;
   postCategory?: string;
   postReferences?: string[];
   postPrivacy?: boolean;
   requestType: string;
   includeClose?: boolean;
   withSticker?: boolean;
   closePath?: string;
   sticker?: string;
   readyData?: {
      verseId: string;
      reference: string;
      content: string;
   };
   cta?: {
      handleCloseModal: () => void;
   };
};

export const CommentaryTextEditor = ({
   ID = "",
   userId = "",
   username = "",
   avatar = "",
   userAuthority = 1,
   verseId = "",
   verseCitation = "",
   verseContent = "",
   folderId = "",
   body = "",
   postImage = "",
   postPostedOnDate = "",
   postCreatedDate = "",
   postCategory = "",
   postReferences = [],
   postPrivacy = false,
   readyData,
   includeClose,
   closePath,
   sticker,
   cta,
   withSticker,
   requestType
}: TCommentaryTextEditorProps) => {
   // router
   const router = useRouter();

   // state
   const [notification, setnotification] = useState<null | {
      title: string;
      body: string;
      type: string;
   }>(null);
   const [loading, setloading] = useState("done");

   const post: THandlePostContent = {
      ID,
      category_tags: postCategory,
      body,
      referenced_verses: postReferences,
      is_private: postPrivacy,
      VERSE_ID: verseId,
      FOLDER_ID: folderId,
      verse_citation: verseCitation,
      post_image: postImage,
      sticker
   };

   // reducer
   function reducer(state: any, action: any) {
      switch (action.type) {
         case "category":
            return { ...state, category_tags: action.payload };

         case "body":
            return { ...state, body: action.payload };

         case "referencedVerses":
            return { ...state, referenced_verses: [...state.referenced_verses, action.payload] };

         case "isPrivate":
            return { ...state, is_private: action.payload };

         case "referencedVersesRemove":
            return { ...state, referenced_verses: action.payload };

         case "postImage":
            return { ...state, post_image: action.payload };

         case "folder":
            return { ...state, FOLDER_ID: action.payload };

         case "sticker":
            return { ...state, sticker: action.payload.path };

         // why am I returning the data from a nested child rather than from the bottom "handlePost' function below?
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

      const post = await handlePostContent(state, "Commentary", requestType);

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
   const handleVerseData = (verse: TBibleVerse) => {
      dispatch({ type: "verseData", payload: verse });

      // get the corresponding image
      const book = Bible.filter((book: TBible) => book.bookId === verse.bookId);
      dispatch({ type: "postImage", payload: book[0].image });
   };

   return (
      <>
         {includeClose && !closePath && (
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: () => router.back() }} />
            </div>
         )}
         {includeClose && closePath && (
            <div className={styles.close}>
               <CloseContent href={closePath} />
            </div>
         )}
         <Portal>
            {notification && (
               <Notification
                  title={notification.title}
                  body={notification.body}
                  type={notification.type}
                  cta={{
                     handleClose: () => setnotification(null)
                  }}
               />
            )}
         </Portal>
         <div className={styles.mainWrapper}>
            <div className={styles.verseSelection}>
               <TextEditorVerseSelection
                  readyData={readyData}
                  verseID={verseId}
                  renderButton={true}
                  cta={{
                     handleVerseData
                  }}
               />
            </div>
            <div className={styles.textEditor}>
               <TextEditor
                  body={body}
                  postImage={state.post_image}
                  userAuthority={userAuthority}
                  userId={userId}
                  username={username}
                  avatar={avatar}
                  postPostedOnDate={postPostedOnDate}
                  postCreatedDate={postCreatedDate}
                  postCategory={state.category_tags}
                  postReferences={state.referenced_verses}
                  postPrivacy={postPrivacy}
                  requestStatus={loading}
                  includeFolder={true}
                  folderId={folderId}
                  withSticker={withSticker}
                  sticker={state.sticker}
                  cta={{
                     handleCategorySelection: (category) =>
                        dispatch({ type: "category", payload: category }),
                     handlePrivacySelection: (privacy) =>
                        dispatch({ type: "isPrivate", payload: privacy }),
                     handleBody: (body) => dispatch({ type: "body", payload: body }),
                     handleReferencedVerses: (verses) =>
                        dispatch({ type: "referencedVersesRemove", payload: verses }),
                     handleRefVerseSelection: (verse) =>
                        dispatch({ type: "referencedVerses", payload: verse }),
                     handleFolderSelection: (id) => dispatch({ type: "folder", payload: id }),
                     handleStickerChoice: (sticker) =>
                        dispatch({ type: "sticker", payload: sticker }),
                     handleCloseModal: cta?.handleCloseModal,
                     handlePost
                  }}
               />
            </div>
         </div>
      </>
   );
};
