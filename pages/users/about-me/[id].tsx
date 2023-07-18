import Head from "next/head";
import { WithTextContentStack } from "../../../components/layouts/stacks/with_text_content_stack";
import { AboutMeTemplate } from "../../../components/templates/users/about_me";

// styles
import styles from "./index.module.css";
import HeadContent from "../../../SEO/head_content";

const AboutMe = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='folder-single'>
            <HeadContent title='Folder' />
         </Head>
         <AboutMeTemplate />
      </div>
   );
};

export default AboutMe;
