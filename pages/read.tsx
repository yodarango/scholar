import React from "react";
import Head from "next/head";

//components
import ReadingCollage from "../layouts/reading-collage";
import Header from "../layouts/header";

// styles
import readStyles from "../styles/pages/Read.module.css";
//import styles from '../styles/pages/Home.module.css';

const Read = () => {
   return (
      <div className={`main-wrapper ${readStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <ReadingCollage />
      </div>
   );
};
export default Read;
