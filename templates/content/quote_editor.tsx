import { Reducer, useReducer } from "react";
import { QuoteEditor as TextEditor } from "../../layouts/quote_editor";
import { QuoteEditorActions } from "../../layouts/quote_editor_actions";

import styles from "./quote_editor.module.css";

type TQuoteEditorProps = {
   categoryId?: string;
   background?: string;
   quote?: string;
   author?: string;
   cta: {
      handleBkgChange: (value: string) => void;
   };
};

type TquoteObj = {
   category_tags: string;
   body: string;
   background: string;
   author: string;
};

export const QuoteEditor = ({
   categoryId = "",
   background = "",
   quote = "",
   author = "",
   cta
}: TQuoteEditorProps) => {
   // reducer
   const quoteObj: TquoteObj = {
      category_tags: categoryId,
      body: quote,
      background,
      author
   };

   function reducer(state: TquoteObj, action: any) {
      console.log(state);
      switch (action.type) {
         case "category":
            return { ...state, category_tags: action.payload };
         case "body":
            return { ...state, body: action.payload };
         case "background":
            cta.handleBkgChange(action.payload);
            return { ...state, background: action.payload };
         case "author":
            return { ...state, author: action.payload };
         // default:
         //    throw new Error();
      }
   }

   const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, quoteObj);

   // handle post to DB
   const handlePost = async () => {
      // implement it
   };
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.editor}>
            <TextEditor
               cta={{
                  handleQuote: (quote: string) => dispatch({ type: "body", payload: quote }),
                  handleAuthor: (author: string) => dispatch({ type: "author", payload: author })
               }}
            />
         </div>
         <div className={styles.actions}>
            <QuoteEditorActions
               cta={{
                  handleBkg: (background: string | { light: string; dark: string }) =>
                     dispatch({ type: "background", payload: background }),
                  handleCategory: (category: string) =>
                     dispatch({ type: "category", payload: category }),
                  handlePost
               }}
            />
         </div>
      </div>
   );
};
