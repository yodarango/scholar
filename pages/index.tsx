// components
import Head from "next/head";
import HeadContent from "../SEO/head_content";
import { Wigo } from "../components/templates/wigo";

// styles
import styles from "./page_global.module.css";

const Index = () => {
   return (
      <main className={styles.mainWrapper}>
         <Head>
            <HeadContent />
         </Head>
         <Wigo />
         <div className='spacer-page-bottom'></div>
      </main>
   );
};

export default Index;
