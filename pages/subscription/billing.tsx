// components
import Head from "next/head";
import HeadContent from "../../SEO/head_content";
import { BillingTemplate } from "../../components/templates/subscription/billing";
import { CloseContent } from "../../components/fragments/buttons/close_content";

// comps
import styles from "../page_global.module.css";

const Billing = () => {
   return (
      <>
         <Head key='billing-page'>
            <HeadContent title='Billing' />
         </Head>
         <div className={styles.mainWrapper}>
            <div className={styles.close}>
               <CloseContent href='/users/@me' />
            </div>
            <BillingTemplate />
         </div>
      </>
   );
};

export default Billing;
