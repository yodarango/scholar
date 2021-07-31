// core
import React from "react";
import Head from "next/head";

// components
import Header from "../../layouts/header";
import LibraryMenu from "../../fragments/buttons/library-menu";

// styles
import libraryStyles from "../../styles/pages/Library.module.css";
//import styles from '../styles/pages/Home.module.css';

const Library = () => {
   const handleContentRequest = (content: string) => {
      console.log(content);
   };

   return (
      <div className={`${libraryStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"LIBRARY"} />
         <LibraryMenu
            includeCategory={false}
            includeContent={true}
            includeSearch={false}
            contentCta={handleContentRequest}
            contentButtonIcon={"🔥"}
         />
      </div>
   );
};
export default Library;
