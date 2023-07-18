import Head from "next/head";
import { ViewArticle } from "../../../components/templates/posts/view_article";
import styles from "../../page_global.module.css";
import HeadContent from "../../../SEO/head_content";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='article-single-page'>
            <HeadContent title='Article' />
         </Head>
         <ViewArticle />
      </div>
   );
};
export default Index;
