import Head from "next/head";
import { FastFacts } from "../../../components/layouts/wigo/fast_facts";
import { AllFastFacts } from "../../../components/templates/content/fast_facts";
import styles from "../../../page_global.module.css";
import HeadContent from "../../../SEO/head_content";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='fast-facts'>
            <HeadContent title='Fast facts' />
         </Head>
         <AllFastFacts />
         <div className='spacer-page-bottom'></div>
      </div>
   );
};

export default Index;
