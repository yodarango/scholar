import { useRouter } from "next/router";
import { Reducer, useReducer, useState } from "react";

// components
import { QuoteEditorTextEditor } from "../../layouts/quote_editor";
import { QuoteEditorActions } from "../../layouts/quote_editor_actions";
import { CloseContent } from "../../fragments/buttons/close_content";

// styles
import styles from "./quote_editor.module.css";
import { handlePostContent } from "../../../helpers/functions/posts/content_post";
import Portal from "../../hoc/potal";
import { Notification } from "../../fragments/popups/notification";

type TQuoteEditorProps = {
   renderClose: boolean;
   categoryId?: string;
   background?: string;
   quote?: string;
   author?: string;
};

type TquoteObj = {
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
   author = ""
}: TQuoteEditorProps) => {
   // states
   const [quoteBackground, setquoteBackground] = useState<string>("");
   const [loading, setloading] = useState<string>("done");
   const [notification, setnotification] =
      useState<null | { title: string; body: string; type: string }>(null);

   // router
   const router = useRouter();

   // reducer
   const quoteObj: TquoteObj = {
      category_tags: categoryId,
      body: quote,
      background,
      author
   };

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
      const post = await handlePostContent(state, "Quote");

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
                           ? (window.location.href = "/posts/quote/new")
                           : setnotification(null)
                  }}
               />
            )}
         </Portal>
         <div className={styles.mainWrapper} id={quoteBackground}>
            {renderClose && (
               <div className={styles.close}>
                  <CloseContent cta={{ handleClick: () => router.push("/posts/quote/new") }} />
               </div>
            )}
            <section className={styles.contentWrapper}>
               <div className={styles.editor}>
                  <QuoteEditorTextEditor
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
