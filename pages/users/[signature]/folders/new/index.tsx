import React from "react";
import { FolderEditor } from "../../../../../components/templates/content/folder_editor";
import { UseIsAuth } from "../../../../../hooks/use_check_auth";
import styles from "../../../../page_global.module.css";
import Head from "next/head";
import HeadContent from "../../../../../SEO/head_content";

const New = () => {
   return (
      <UseIsAuth redirect='/login'>
         <Head key='folder-new'>
            <HeadContent title='New folder' />
         </Head>
         <div className={styles.mainWrapper}>
            <FolderEditor />
         </div>
      </UseIsAuth>
   );
};

export default New;
