import Head from "next/head";
import { PollsTemplate } from "../../../components/templates/content/polls";

// components

// styles
import styles from "../../../page_global.module.css";
import HeadContent from "../../../SEO/head_content";

const Polls = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='polls-page'>
            <HeadContent title='Polls' />
         </Head>
         <PollsTemplate />
      </div>
   );
};

export default Polls;
