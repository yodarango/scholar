import Head from "next/head";
import { WelcomeTemplate } from "../../components/templates/users/welcome";
import styles from "../page_global.module.css";
import HeadContent from "../../SEO/head_content";

const welcome = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='welcome-page'>
            <HeadContent title='Welcome' />
         </Head>
         <WelcomeTemplate />
         <div className='spacer-page-bottom'></div>
         <div className='spacer-page-bottom'></div>
         <div className='spacer-page-bottom'></div>
         <div className='spacer-page-bottom'></div>
      </div>
   );
};

export default welcome;
