import { useState, useReducer, Reducer } from "react";
import { useRouter } from "next/router";

// components
import { TextEditor } from "../../layouts/text_editor";
import { TextEditorVerseSelection } from "../../fragments/text_editor_verse_selection";
import Portal from "../../hoc/potal";
import { Notification } from "../../fragments/popups/notification";

// styles
import styles from "./commentary_text_editor.module.css";

// helpers
import {
   handlePostCommentary,
   ThandlePostCommentary
} from "../../../helpers/functions/posts/commentary_post";
import { Bible, TBible } from "../../../data/bible";
import { TBibleVerse } from "../../../types/bible_api";

type TCommentaryTextEditorProps = {
   userId: string;
   username: string;
   avatar: string;
   userAuthority: number;
   verseId?: string;
   verseCitation?: string;
   verseContent?: string;
   body?: string;
   postImage?: string;
   postPostedOnDate?: string;
   postCreatedDate?: string;
   postCategory?: string;
   postReferences?: string[];
   postPrivacy?: boolean;
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
   userId,
   username,
   avatar,
   userAuthority,
   verseId = "",
   verseCitation = "",
   verseContent = "",
   body = "",
   postImage = "",
   postPostedOnDate = "",
   postCreatedDate = "",
   postCategory = "",
   postReferences = [],
   postPrivacy = false,
   readyData,
   cta
}: TCommentaryTextEditorProps) => {
   // router
   const router = useRouter();

   // state
   // postReferencedVerses do not update on reducer changing
   const [postReferencedVerses, setpostReferencedVerses] = useState<string[]>(postReferences);
   const [notification, setnotification] =
      useState<null | { title: string; body: string; type: string }>(null);
   const [loading, setloading] = useState("done");

   const post: ThandlePostCommentary = {
      categoryTag: postCategory,
      body,
      referencedVerses: postReferencedVerses,
      isPrivate: postPrivacy,
      verseId: verseId,
      verseCitation: verseCitation,
      postImage: postImage
   };

   // reducer
   function reducer(state: any, action: any) {
      console.log(state);
      switch (action.type) {
         case "category":
            return { ...state, categoryTag: action.payload };

         case "body":
            return { ...state, body: action.payload };

         case "referencedVerses":
            return { ...state, referencedVerses: [...state.referencedVerses, action.payload] };

         case "isPrivate":
            return { ...state, isPrivate: action.payload };

         case "referencedVersesRemove":
            return { ...state, referencedVerses: action.payload };

         case "postImage":
            return { ...state, postImage: action.payload };

         // why am I returning the data from a nested child rather than from the bottom "handlePost' function below?
         // Because why waste more network when the data is already in the client
         case "verseData":
            return {
               ...state,
               verseId: action.payload.id,
               verseCitation: action.payload.reference
            };
      }
   }

   const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, post);

   // handle the saving the post to the DB
   const handlePost = async () => {
      setloading("loading");
      const post = await handlePostCommentary(state);
      if (post?.error) {
         setnotification({ title: post?.error.title, body: post?.error.body, type: "4" });
      } else if (post?.success) {
         setnotification({ title: post?.success.title, body: post?.success?.body, type: "2" });
      }
      setloading("done");
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
         <Portal>
            {notification && (
               <Notification
                  title={notification.title}
                  body={notification.body}
                  type={notification.type}
                  cta={{
                     handleClose: () =>
                        notification.type === "2"
                           ? (window.location.href = "/posts/commentary/new")
                           : setnotification(null)
                  }}
               />
            )}
         </Portal>
         <div className={styles.mainWrapper}>
            <div className={styles.verseSelection}>
               <TextEditorVerseSelection
                  readyData={readyData}
                  cta={{
                     handleVerseData
                  }}
               />
            </div>
            <div className={styles.textEditor}>
               <TextEditor
                  body={body}
                  postImage={postImage}
                  userAuthority={userAuthority}
                  userId={userId}
                  username={username}
                  avatar={avatar}
                  postPostedOnDate={postPostedOnDate}
                  postCreatedDate={postCreatedDate}
                  postCategory={postCategory}
                  postReferences={state.referencedVerses}
                  postPrivacy={postPrivacy}
                  requestStatus={loading}
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
                     handleCloseModal: cta?.handleCloseModal,
                     handlePost
                  }}
               />
            </div>
         </div>
      </>
   );
};
