import Head from "next/head";
import { ViewQuote } from "../../../components/templates/posts/view_quote";
import styles from "./index.module.css";
import HeadContent from "../../../SEO/head_content";

const Index = () => {
   return (
      <div className={styles.singleQuoteMainWrapper}>
         <Head key='single-quote-page'>
            <HeadContent title='Quote' />
         </Head>
         <ViewQuote />
      </div>
   );
};
export default Index;
