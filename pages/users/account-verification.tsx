// comps
import Head from "next/head";
import { AccountVerification } from "../../components/templates/account/account_verification";

// styles
import styles from "../page_global.module.css";
import HeadContent from "../../SEO/head_content";

const AccountVerificationPage = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='account-verification'>
            <HeadContent title='Account verification' />
         </Head>
         <AccountVerification />
      </div>
   );
};

export default AccountVerificationPage;
