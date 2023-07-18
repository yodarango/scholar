import Head from "next/head";
import { TrustedUserApplication } from "../components/templates/users/trusted_user_application";
import styles from "./page_global.module.css";
import HeadContent from "../SEO/head_content";

const UserVerification = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='user-verification'>
            <HeadContent title='User verification' />
         </Head>
         <TrustedUserApplication />
      </div>
   );
};

export default UserVerification;
