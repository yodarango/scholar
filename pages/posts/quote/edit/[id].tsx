import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { QuoteEditor } from "../../../../components/templates/content/quote_editor";

// styles
import styles from "./index.module.css";
import { handleGetQuote } from "../../../../helpers/functions/posts/quote_get";
import { TQuote } from "../../../../types/posts";
import { RoundLoader } from "../../../../components/fragments/chunks/round_loader";
import { REQUEST_TYPE_IS_EDIT_QUOTE } from "../../../../helpers/functions/posts/content_post";
import { UseIsAuth } from "../../../../hooks/use_check_auth";

const Index = () => {
   const router = useRouter();
   const ID: any = router?.query && router?.query.id ? router?.query.id : "1";

   const [quote, setquote] = useState<TQuote | null>(null);
   const [loading, setloading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await handleGetQuote({ ID }, true);
         if (data) setquote(data);

         setloading(status);
      } catch (error) {
         setloading("error");
         console.error(error);
      }
   };

   useEffect(() => {
      if (router.isReady) getData();
   }, [router.isReady]);

   return (
      <UseIsAuth redirect='/login'>
         <div className={styles.mainWrapper}>
            {loading === "done" && (
               <QuoteEditor
                  requestType={REQUEST_TYPE_IS_EDIT_QUOTE}
                  ID={quote?.ID}
                  categoryId={quote?.category_tags}
                  background={quote?.background}
                  quote={quote?.body}
                  author={quote?.author}
                  renderClose={true}
               />
            )}
            {loading === "loading" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
         </div>
      </UseIsAuth>
   );
};

export default Index;
