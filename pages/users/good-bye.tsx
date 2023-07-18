import Head from "next/head";
import { GoodByeTemplate } from "../../components/templates/users/goodbye";
import styles from "../page_global.module.css";
import HeadContent from "../../SEO/head_content";

const GoodBye = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='goodby'>
            <HeadContent title='Goodbye' />
         </Head>
         <GoodByeTemplate />
      </div>
   );
};

export default GoodBye;
