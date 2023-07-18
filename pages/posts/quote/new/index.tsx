// components
import { QuoteEditor } from "../../../../components/templates/content/quote_editor";
import { REQUEST_TYPE_IS_NEW_QUOTE } from "../../../../helpers/functions/posts/content_post";
import { UseIsAuth } from "../../../../hooks/use_check_auth";

// styles
import styles from "./index.module.css";
import global from "../../../page_global.module.css";
import Head from "next/head";
import HeadContent from "../../../../SEO/head_content";

const Index = () => {
   return (
      <UseIsAuth redirect='/login'>
         <Head key='new-quote-page'>
            <HeadContent title='Let your imagination fly high' />
         </Head>
         <div className={`${styles.mainWrapper} ${global.mainWrapper}`}>
            <QuoteEditor requestType={REQUEST_TYPE_IS_NEW_QUOTE} renderClose={true} />
         </div>
      </UseIsAuth>
   );
};

export default Index;
