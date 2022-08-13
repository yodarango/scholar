import { useState, useReducer, Reducer } from "react";

// components
import { TextEditor } from "../../layouts/text_editor";

// styles
import styles from "./full_text_editor.module.css";

// helpers
import { handlePostCommentary } from "../../helpers/functions/posts/commentary_post";

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

type TPost = {
   category: string;
   body: string;
   referencedVerses: string[];
   isPrivate: boolean;
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
   const post = {
      category: postCategory,
      body,
      referencedVerses: postReferences,
      isPrivate: postPrivacy
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
      }
   }

   const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, post);

   // handle the saving the post to the DB
   const handlePost = async () => {
      const body = await handlePostCommentary();
      console.log(state);
   };

   return (
      <div className={styles.mainWrapper}>
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
               handlePost
            }}
         />
      </div>
   );
};
