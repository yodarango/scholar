import { useRouter } from "next/router";

// components
import { CommentariesAll } from "../../../components/templates/content/commentaries_all";
import { PrimaryStackHeader } from "../../../components/layouts/stacks/headers/primary_stack_header";

// styles
import styles from "./index.module.css";
import Head from "next/head";
import HeadContent from "../../../SEO/head_content";

const Index = () => {
   const router = useRouter();

   return (
      <div className={styles.mainWrapper}>
         <Head key='all-commentaries-page'>
            <HeadContent title='All commentaries' />
         </Head>
         <PrimaryStackHeader
            title='Commentaries'
            icon='comment'
            cta={{ handleClose: () => router.push("/") }}
         />
         <div className={styles.posts}>
            <CommentariesAll />
         </div>
      </div>
   );
};

export default Index;
