import { useState, useReducer, Reducer } from "react";

// components
import { TextEditor } from "../../layouts/text_editor";
import { TextEditorTopInfo } from "../../fragments/text_editor_top_info";

// styles
import styles from "./thought_text_editor.module.css";

// helpers
import { THandlePostThought } from "../../helpers/functions/posts/thought_post";
import { Bible, TBible } from "../../data/bible";
import { TBibleVerse } from "../../types/bible_api";

type TThoughtTextEditorProps = {
   userId: string;
   username: string;
   avatar: string;
   userAuthority: number;
   body?: string;
   title?: string;
   titleDefaultValue: string;
   postImage?: string;
   postPostedOnDate?: string;
   postCreatedDate?: string;
   postCategory?: string;
   postReferences?: string[];
   postPrivacy?: boolean;
};

export const ThoughtTextEditor = ({
   userId,
   username,
   avatar,
   userAuthority,
   body = "",
   title = "",
   titleDefaultValue = "",
   postImage = "",
   postPostedOnDate = "",
   postCreatedDate = "",
   postCategory = "",
   postReferences = [],
   postPrivacy = false
}: TThoughtTextEditorProps) => {
   // state
   // postReferencedVerses do not update on reducer changing
   const [postReferencedVerses, setpostReferencedVerses] = useState<string[]>(postReferences);

   const post: THandlePostThought = {
      categoryTag: postCategory,
      body,
      title,
      referencedVerses: postReferences,
      postImage: postImage
   };

   // reducer
   function reducer(state: any, action: any) {
      switch (action.type) {
         case "category":
            return { ...state, category: action.payload };

         case "body":
            return { ...state, body: action.payload };

         case "title":
            return { ...state, title: action.payload };

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
         <div className={styles.topInfo}>
            <TextEditorTopInfo
               userAuthority={1}
               userId='123'
               username='username'
               avatar='img/avatars/default.png'
               postPostedOnDate='12/12/12 12:00'
               postCreatedDate='12/12/12 12:00'
               postCategory='PPL'
               cta={{
                  handleCloseModal: () => {},
                  handleImageBkgSelection: (url: string) => {}
               }}
            />
         </div>
         <div className={styles.textEditor}>
            <TextEditor
               withTitle={true}
               titleMaxL={150}
               titleDefaultValue={titleDefaultValue}
               titlePlaceHolder='Post Title'
               renderClose={false}
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
                  handleTitleValue: (title) => dispatch({ type: "title", payload: title }),
                  handlePost
               }}
            />
         </div>
      </div>
   );
};
