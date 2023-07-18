// comps
import Head from "next/head";
import { Profile } from "../../../components/templates/account/profile";
import { UseIsAuth } from "../../../hooks/use_check_auth";

// styles
import styles from "./index.module.css";
import HeadContent from "../../../SEO/head_content";

const Me = () => {
   return (
      <UseIsAuth redirect='/login'>
         <Head key='user-single'>
            <HeadContent title='Folder' />
         </Head>
         <div className={styles.mainWrapper}>
            <Profile username='user' />
         </div>
      </UseIsAuth>
   );
};
export default Me;
