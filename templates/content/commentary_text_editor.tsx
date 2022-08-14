import { useState, useReducer, Reducer } from "react";

// components
import { TextEditor } from "../../layouts/text_editor";
import { TextEditorVerseSelection } from "../../fragments/text_editor_verse_selection";

// styles
import styles from "./commentary_text_editor.module.css";

// helpers
import {
   handlePostCommentary,
   ThandlePostCommentary
} from "../../helpers/functions/posts/commentary_post";
import { Bible, TBible } from "../../data/bible";
import { TBibleVerse } from "../../types/bible_api";

type TCommentaryTextEditorProps = {
   userId: string;
   username: string;
   avatar: string;
   userAuthority: number;
   verseId?: string;
   verseCitation?: string;
   body?: string;
   postImage?: string;
   postPostedOnDate?: string;
   postCreatedDate?: string;
   postCategory?: string;
   postReferences?: string[];
   postPrivacy?: boolean;
};

export const CommentaryTextEditor = ({
   userId,
   username,
   avatar,
   userAuthority,
   verseId = "",
   verseCitation = "",
   body = "",
   postImage = "",
   postPostedOnDate = "",
   postCreatedDate = "",
   postCategory = "",
   postReferences = [],
   postPrivacy = false
}: TCommentaryTextEditorProps) => {
   // state
   // postReferencedVerses do not update on reducer changing
   const [postReferencedVerses, setpostReferencedVerses] = useState<string[]>(postReferences);

   const post: ThandlePostCommentary = {
      categoryTag: postCategory,
      body,
      referencedVerses: postReferences,
      isPrivate: postPrivacy,
      verseId: verseId,
      verseCitation: verseCitation,
      postImage: postImage
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
            return { ...state, isPrivate: action.payload };

         case "referencedVersesRemove":
            return { ...state, referencedVerses: action.payload };

         case "postImage":
            return { ...state, postImage: action.payload };

         // why am I returning the data from a nested child rather than frmo the bottom"handlePost' function below?
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

   // handle the selection of a verse from the ScripturePicker component and also
   // if postImage does not exist, get the corresponding image based on the router verseId
   const handleVerseData = (verse: TBibleVerse) => {
      dispatch({ type: "verseData", payload: verse });

      // get the corresponding image
      const book = Bible.filter((book: TBible) => book.bookId === verse.bookId);
      dispatch({ type: "postImage", payload: book[0].image });
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.verseSelection}>
            <TextEditorVerseSelection
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
                  handlePost
               }}
            />
         </div>
      </div>
   );
};
