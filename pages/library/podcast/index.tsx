// ************************** PURPOSE **************************** //
// *** This page component will fetch all the podcasts found ***** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/podcast page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import LibraryFilter from "../../../fragments/buttons/library-filter";
import PodcastCarrousel from "../../../layouts/library-individual-pages/podcast-carrousel";

// styles
import libraryPodcastStyles from "../../../styles/pages/library/podcasts/LibraryPodcasts.module.css";

// types
import { podcastsProps } from "../../../fragments/library-items/podcast";

type podcastPageProps = {
   podcast: podcastsProps[];
};

const Podcast = ({ podcast }: podcastPageProps) => {
   return (
      <div className={`${libraryPodcastStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"PODCASTS"} />
         <div className='x-large-spacer'></div>
         <LibraryMenu
            includeCategory={true}
            includeContent={true}
            includeSearch={true}
            contentButtonIcon={"🎧"}
            currentSlectedContentPage={{ podcasts: "#f2f2f2" }}
         />
         <LibraryFilter params={`podcast`} />
         {podcast && <PodcastCarrousel podcast={podcast} />}
      </div>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getStaticProps: GetStaticProps = async () => {
   const data = await fetch("https://scholar-be.herokuapp.com/library");
   const parsedData = await data.json();

   return {
      props: {
         podcast: parsedData.podcast,
         revalidate: 60 * 50 * 24 //everyday
      }
   };
};

export default Podcast;
