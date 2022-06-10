// ************************** PURPOSE **************************** //
// *** This page component will fetch all the podcasts found ***** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/podcast page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import { useEffect, useState } from "react";
import Head from "next/head";
//import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import HeadContent from "../../../layouts/head-content";
import Image from "next/image";

// graphQl
import client from "../../../apollo-client";
import { GET_PODCASTS } from "../../../graphql/library/podcasts";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import LibraryFilterPodcast from "../../../fragments/buttons/library-filter-podcast";
import PodcastCarrousel from "../../../layouts/library-individual-pages/podcast-carrousel";
import SkipContent from "../../../fragments/buttons/skipContent";
import NavigationMenu from "../../../layouts/navigation-menu";
import CardsLazyLoading from "../../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../../../layouts/resource-not-found-error";

// styles
import libraryPodcastStyles from "../../../styles/pages/library/podcasts/LibraryPodcasts.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// types
import { podcastsProps } from "../../../fragments/library-items/podcast";

// type podcastPageProps = {
//    podcast: podcastsProps[];
// };

const Podcast = () => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");
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

   // get the inital data
   const [initialDataState, setInitialDataState] = useState<podcastsProps[] | null>(null);
   const getInitialData = async () => {
      try {
         let { skip, alphOrd, dateOrd, userId, podcastName, id } = router.query;
         const { data } = await client.query({
            query: GET_PODCASTS,
            variables: { skip, alphOrd, dateOrd, userId, podcastName, id }
         });

         setInitialDataState(data.podcasts);
         setLoadingState("done");
      } catch (error) {
         console.log(error);
         setLoadingState("error");
         setInitialDataState(null);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         setLoadingState("loading");
         getInitialData();
      }

      return () => {
         setInitialDataState([]);
      };
   }, [router.query]);
   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         <div className={`${libraryPodcastStyles.mainWrapper}`}>
            <Header currPage={"PODCASTS"} />
            {initialDataState && <SkipContent wrapperMaxWidth={"1050px"} content={100} />}
            <div className='x-large-spacer'></div>
            <LibraryMenu
               handleInputSearchReq={handleInputSearchReq}
               includeCategory={false}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"🎧"}
               currentSlectedContentPage={{ podcasts: "#f2f2f2" }}
            />
            <LibraryFilterPodcast includeCreator={false} />
            {initialDataState && loadingState == "done" && (
               <PodcastCarrousel podcast={initialDataState} />
            )}
            {loadingState == "loading" && (
               <CardsLazyLoading
                  amount={16}
                  compClass={`${cardsLazyLoadingStyles.libraySquareCont} ${cardsLazyLoadingStyles.libraryPodcast}`}
               />
            )}
            {loadingState === "error" && <ResourceNotFoundError />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
// export const getServerSideProps: GetServerSideProps = async (context) => {
//    let { skip, alphOrd, dateOrd, userId, podcastName, id } = context.query;
//    const { data } = await client.query({
//       query: GET_PODCASTS,
//       variables: { skip, alphOrd, dateOrd, userId, podcastName, id }
//    });

//    //console.log(data);
//    return {
//       props: {
//          podcast: data.podcasts
//       }
//    };
// };
export default Podcast;
