import React from "react";
import { FolderEditor } from "../../../../../components/templates/content/folder_editor";
import styles from "../../../../page_global.module.css";
import Head from "next/head";
import HeadContent from "../../../../../SEO/head_content";

const Edit = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='folder-edit'>
            <HeadContent title='Folder edit' />
         </Head>
         <FolderEditor isEdit />
      </div>
   );
};

export default Edit;
