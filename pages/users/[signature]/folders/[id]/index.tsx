import React, { useEffect, useState } from "react";
import { PostsInFolder } from "../../../../../components/templates/folders/posts_in_folder";
import styles from "../../../../page_global.module.css";
import HeadContent from "../../../../../SEO/head_content";
import Head from "next/head";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='folder-single'>
            <HeadContent title='Folder' />
         </Head>
         <PostsInFolder />
      </div>
   );
};

export default Index;
