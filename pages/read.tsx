// ******************** PURPOSE *********************** //
// *** this page will allow users to read different *** //
// *** versions of the bible in a multiview type ****** //
// *** This page initially makes 4 calls to the ******* //
// *** bible api so that no additinal calls are ******* //
// *** needed once the page is loaded or user flips *** //
// *** views ****************************************** //

// core
import React from "react";
import Head from "next/head";

//components
import ReadingCollage from "../layouts/reading-collage";
import NavigationMenu from "../layouts/navigation-menu";

// styles
import readStyles from "../styles/pages/Read.module.css";

// helpers

// others
const versionId = "de4e12af7f28f599-02";

const Read = () => {
   return (
      <>
         <div className={`main-wrapper ${readStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <ReadingCollage versionId={versionId} />
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};
export default Read;
