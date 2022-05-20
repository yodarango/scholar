// ************************** PURPOSE **************************** //
// *** This page component will fetch all the watch found ******** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/watch page, and returnng to ********* //
// *** same page with the userId and content type in the query *** //

// core
import { useState, useEffect } from "react";
import Head from "next/head";
//import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

// graphQl
import client from "../../../apollo-client";
import { GET_SERMONS } from "../../../graphql/library/sermons";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import WatchCarrousel from "../../../layouts/library-individual-pages/watch-carrousel";
import LibraryFilterPreachers from "../../../fragments/buttons/library-filter-preachers";
import CardsLazyLoading from "../../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../../../layouts/resource-not-found-error";

// styles
import libraryWatchStyles from "../../../styles/pages/library/watch/LibraryWatch.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// types
import { watchProps } from "../../../fragments/library-items/watch";
import NavigationMenu from "../../../layouts/navigation-menu";
import SkipContent from "../../../fragments/buttons/skipContent";

// type watchPageProps = {
//    watch: watchProps[];
// };

const Watch = () => {
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

      router.replace({ pathname: router.pathname, query: { title: newInput } });
   };

   // get the inital data
   const [initialDataState, setInitialDataState] = useState<watchProps[]>([]);
   const getInitialData = async () => {
      try {
         let { skip, alphOrd, dateOrd, category, userId, title, id } = router.query;
         const { data } = await client.query({
            query: GET_SERMONS,
            variables: { skip, alphOrd, dateOrd, category, userId, title, id }
         });

         setInitialDataState(data.sermons);
         setLoadingState("done");
      } catch (error) {
         console.log(error);
         setLoadingState("error");
         setInitialDataState([]);
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
            <meta name='keyword' content='tags' />
         </Head>
         <div className={`${libraryWatchStyles.mainWrapper}`}>
            <Header currPage={"WATCH"} />
            {initialDataState.length > 19 && (
               <SkipContent wrapperMaxWidth={"1050px"} content={initialDataState} />
            )}
            <div className='x-large-spacer'></div>
            <LibraryMenu
               handleInputSearchReq={handleInputSearchReq}
               includeCategory={true}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"📺"}
               currentSlectedContentPage={{ watch: "#f2f2f2" }}
            />
            <LibraryFilterPreachers />
            {initialDataState && loadingState === "done" && (
               <WatchCarrousel watch={initialDataState} />
            )}
            {loadingState == "loading" && (
               <CardsLazyLoading amount={16} compClass={cardsLazyLoadingStyles.libraySquareCont} />
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
//    let { skip, alphOrd, dateOrd, category, userId, title, id } = context.query;

//    const { data } = await client.query({
//       query: GET_SERMONS,
//       variables: { skip, alphOrd, dateOrd, category, userId, title, id }
//    });

//    return {
//       props: {
//          watch: data.sermons
//       }
//    };
// };

export default Watch;
