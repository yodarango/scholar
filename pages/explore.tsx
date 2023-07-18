import Head from "next/head";
import { VerseByVerse } from "../components/templates/verse_by_verse";
import styles from "./page_global.module.css";
import HeadContent from "../SEO/head_content";

const Index = () => {
   return (
      <main className={styles.mainWrapper}>
         <Head key='explore-page'>
            <HeadContent title='Explore' />
         </Head>
         <VerseByVerse />
         <div className='spacer-page-bottom'></div>
      </main>
   );
};

export default Index;
