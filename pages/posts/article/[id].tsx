import Head from "next/head";
import { ViewThought } from "../../../components/templates/posts/view_thought";
import styles from "../../page_global.module.css";
import HeadContent from "../../../SEO/head_content";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='article-single-page'>
            <HeadContent title='Article' />
         </Head>
         <ViewThought />
      </div>
   );
};
export default Index;
