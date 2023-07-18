import { useRouter } from "next/router";
import { FolderList } from "../../../../components/layouts/stacks/folders_list";
import styles from "../index.module.css";
import Head from "next/head";
import HeadContent from "../../../../SEO/head_content";

const Index = () => {
   const router = useRouter();
   const { signature } = router.query;
   let userId = signature ? signature.toString().replaceAll("[", "").replaceAll("]", "") : "@me";

   return (
      <div className={styles.mainWrapper}>
         <Head key='all-folders'>
            <HeadContent title='All folder' />
         </Head>
         <FolderList
            includeBulkAction={true}
            cta={{ handleClose: () => router.push(`/users/${userId}`) }}
         />
      </div>
   );
};
export default Index;
