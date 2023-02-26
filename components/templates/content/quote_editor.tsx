import { useRouter } from "next/router";
import { Reducer, useReducer, useState } from "react";

// components
import { QuoteEditorTextEditor } from "../../layouts/quote_editor";
import { QuoteEditorActions } from "../../layouts/quote_editor_actions";
import { CloseContent } from "../../fragments/buttons/close_content";

// styles
import styles from "./quote_editor.module.css";
import {
   handlePostContent,
   REQUEST_TYPE_IS_EDIT_QUOTE
} from "../../../helpers/functions/posts/content_post";
import Portal from "../../hoc/potal";
import { Notification } from "../../fragments/popups/notification";

type TQuoteEditorProps = {
   ID?: string;
   renderClose: boolean;
   categoryId?: string;
   background?: string;
   quote?: string;
   author?: string;
   requestType: string;
};

type TquoteObj = {
   ID?: string;
   category_tags: string;
   body: string;
   background: string;
   author: string;
};

export const QuoteEditor = ({
   renderClose,
   categoryId = "",
   background = "",
   quote = "",
   author = "",
   requestType,
   ID
}: TQuoteEditorProps) => {
   // states
   const [quoteBackground, setquoteBackground] = useState<string>(background);
   const [loading, setloading] = useState<string>("done");
   const [notification, setnotification] =
      useState<null | { title: string; body: string; type: string }>(null);

   // router
   const router = useRouter();

   // reducer
   const quoteObj: TquoteObj = {
      ID,
      category_tags: categoryId,
      body: quote,
      background,
      author
   };

   let darkText: boolean =
      background === "quote-bkg--5" ||
      background === "quote-bkg--11" ||
      background === "quote-bkg--12" ||
      background === "quote-bkg--13" ||
      background === "quote-bkg--20";

   function reducer(state: TquoteObj, action: any) {
      switch (action.type) {
         case "category":
            return { ...state, category_tags: action.payload };
         case "body":
            return { ...state, body: action.payload };
         case "background":
            setquoteBackground(action.payload);
            return { ...state, background: action.payload };
         case "author":
            return { ...state, author: action.payload };
      }
   }

   const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, quoteObj);

   // handle the saving the post to the DB
   const handlePost = async () => {
      setloading("loading");
      const post = await handlePostContent(state, "Quote", requestType);

      if (post?.error) {
         setnotification({ title: post?.error.title, body: post?.error.body, type: "4" });
         setloading("done");
      } else if (post?.success) {
         setnotification({ title: post?.success.title, body: post?.success?.body, type: "2" });
         setloading("disabled");
      }
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
         <div className={styles.mainWrapper} id={quoteBackground}>
            {renderClose && (
               <div className={styles.close}>
                  <CloseContent
                     cta={{ handleClick: () => router.back() }}
                     color={darkText ? "#1e1a29" : "#f1eaff"}
                  />
               </div>
            )}
            <section className={styles.contentWrapper}>
               <div className={styles.editor}>
                  <QuoteEditorTextEditor
                     darkText={darkText}
                     quote={quote}
                     author={author}
                     background={quoteBackground}
                     cta={{
                        handleQuote: (quote: string) => dispatch({ type: "body", payload: quote }),
                        handleAuthor: (author: string) =>
                           dispatch({ type: "author", payload: author })
                     }}
                  />
               </div>
               <div className={styles.actions}>
                  <QuoteEditorActions
                     requestStatus={loading}
                     background={background}
                     categoryId={categoryId}
                     cta={{
                        handleBkg: (background: string | { light: string; dark: string }) =>
                           dispatch({ type: "background", payload: background }),
                        handleCategory: (category: string) =>
                           dispatch({ type: "category", payload: category }),
                        handlePost
                     }}
                  />
               </div>
            </section>
         </div>
      </>
   );
};
