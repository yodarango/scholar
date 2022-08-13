import { useState, useReducer, Reducer } from "react";

// components
import { TextEditor } from "../../layouts/text_editor";
import { TextEditorVerseSelection } from "../../fragments/text_editor_verse_selection";

// styles
import styles from "./full_text_editor.module.css";

// helpers
import {
   handlePostCommentary,
   ThandlePostCommentary
} from "../../helpers/functions/posts/commentary_post";

type TFullTextEditorProps = {
   body: string;
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
};

export const FullTextEditor = ({
   body,
   postImage,
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory,
   postReferences,
   postPrivacy
}: TFullTextEditorProps) => {
   const post: ThandlePostCommentary = {
      categoryTag: postCategory,
      body,
      referencedVerses: postReferences,
      isPrivate: postPrivacy,
      verseId: "",
      verseCitation: ""
   };

   // reducer
   function reducer(state: any, action: any) {
      switch (action.type) {
         case "category":
            return { ...state, category: action.payload };

         case "body":
            return { ...state, body: action.payload };

         case "referencedVerses":
            return { ...state, referencedVerses: [...state.referencedVerses, action.payload] };

         case "isPrivate":
            return { ...state, category: action.payload };

         case "referencedVersesRemove":
            console.log(action.payload);
            return { ...state, referencedVerses: action.payload };

         // why am i returning the data from a nested child rather than frmo the bottom"handlePost' function below?
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
      //const body = await handlePostCommentary(post);
      console.log(state);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.verseSelection}>
            <TextEditorVerseSelection
               cta={{
                  handleVerseData: (verseData) =>
                     dispatch({ type: "verseData", payload: verseData })
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
               postReferences={postReferences}
               postPrivacy={postPrivacy}
               cta={{
                  handleCategorySelection: (category) =>
                     dispatch({ type: "category", payload: category }),
                  handlePrivacySelection: (privacy) =>
                     dispatch({ type: "isPrivate", payload: privacy }),
                  handleRefVerseSelection: (verse) =>
                     dispatch({ type: "referencedVerses", payload: verse }),
                  handleBody: (body) => dispatch({ type: "body", payload: body }),
                  handlePost,
                  handleReferencedVerses: (verses) =>
                     dispatch({ type: "referencedVersesRemove", payload: verses })
               }}
            />
         </div>
      </div>
   );
};
