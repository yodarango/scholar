// ************************** PURPOSE **************************** //
// *** This page component will fetch all the podcasts found ***** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/podcast page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// graphQl
import client from "../../../apollo-client";
import { GET_PODCASTS } from "../../../graphql/library/podcasts";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import LibraryFilterPodcast from "../../../fragments/buttons/library-filter-podcast";
import PodcastCarrousel from "../../../layouts/library-individual-pages/podcast-carrousel";
import SkipContent from "../../../fragments/buttons/skipContent";

// styles
import libraryPodcastStyles from "../../../styles/pages/library/podcasts/LibraryPodcasts.module.css";

// types
import { podcastsProps } from "../../../fragments/library-items/podcast";
import NavigationMenu from "../../../layouts/navigation-menu";

type podcastPageProps = {
   podcast: podcastsProps[];
};

const Podcast = ({ podcast }: podcastPageProps) => {
   // ============ capitalize and push the new query to router to searh by title ======
   const router = useRouter();
   let newInput: any = "";
   const handleInputSearchReq = (string: string) => {
      if (string) {
         const singleWords = string.split(" ");
         newInput = singleWords.map((word) => word[0].toUpperCase() + word.substr(1));
         console.log(newInput);
      }

      router.replace({ pathname: router.pathname, query: { podcastName: newInput } });
   };
   return (
      <>
         <div className={`${libraryPodcastStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"PODCASTS"} />
            <SkipContent wrapperMaxWidth={"1050px"} content={podcast} />
            <div className='x-large-spacer'></div>
            <LibraryMenu
               handleInputSearchReq={handleInputSearchReq}
               includeCategory={false}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"🎧"}
               currentSlectedContentPage={{ podcasts: "#f2f2f2" }}
            />
            <LibraryFilterPodcast />
            {podcast && <PodcastCarrousel podcast={podcast} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, alphOrd, dateOrd, userId, podcastName, id } = context.query;
   const { data } = await client.query({
      query: GET_PODCASTS,
      variables: { skip, alphOrd, dateOrd, userId, podcastName, id }
   });

   return {
      props: {
         podcast: data.podcasts
      }
   };
};
export default Podcast;
