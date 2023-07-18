// components
import { useRouter } from "next/router";
import { PrimaryStackHeader } from "../../../components/layouts/stacks/headers/primary_stack_header";
import { ArticlesAll } from "../../../components/templates/content/articles_all";

// styles
import styles from "./index.module.css";
import Head from "next/head";
import HeadContent from "../../../SEO/head_content";

const Index = () => {
   const router = useRouter();
   return (
      <div className={styles.mainWrapper}>
         <Head key='all-articles-page'>
            <HeadContent title='All articles' />
         </Head>
         <PrimaryStackHeader title='Articles' cta={{ handleClose: () => router.push("/") }} />
         <div className={styles.posts}>
            <ArticlesAll />
         </div>
      </div>
   );
};

export default Index;
