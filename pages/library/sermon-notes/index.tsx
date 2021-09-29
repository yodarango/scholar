// ************************** PURPOSE **************************** //
// *** This page component will fetch all the sermon-notes ******* //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/authors page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import SermonCarrousel from "../../../layouts/library-individual-pages/sermons-carrousel";
import LibraryFilter from "../../../fragments/buttons/library-filter";

// styles
import librarySermonsPageStyles from "../../../styles/pages/library/sermon-notes/LibrarySermons.module.css";

// types
import { sermonProps } from "../../../fragments/library-items/sermon";
import NavigationMenu from "../../../layouts/navigation-menu";

type sermonsPageProps = {
   sermons: sermonProps[];
};
const Sermons = ({ sermons }: sermonsPageProps) => {
   return (
      <>
         <div className={`${librarySermonsPageStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"SERMONS"} />
            <div className='x-large-spacer '></div>
            <LibraryMenu
               includeCategory={true}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"🗣️"}
               currentSlectedContentPage={{ sermons: "#f2f2f2" }}
            />
            <LibraryFilter params={`sermon-notes`} />
            {sermons && <SermonCarrousel sermon={sermons} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getStaticProps: GetStaticProps = async () => {
   const data = await fetch("https://scholar-be.herokuapp.com/library/");
   const parsedData = await data.json();

   return {
      props: {
         sermons: parsedData.sermons,
         revalidate: 60 * 50 * 24 //everyday
      }
   };
};
export default Sermons;
