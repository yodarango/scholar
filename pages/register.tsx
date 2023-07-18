import Head from "next/head";
import RegisterTemplate from "../components/templates/users/register";
import { UseIsNotAuth } from "../hooks/use_check_auth";
import styles from "./page_global.module.css";
import HeadContent from "../SEO/head_content";

export default function Register() {
   return (
      <UseIsNotAuth redirect='/users/@me'>
         <Head key='register-page'>
            <HeadContent title='Register' />
         </Head>
         <div className={styles.mainWrapper}>
            <RegisterTemplate />
         </div>
      </UseIsNotAuth>
   );
}
