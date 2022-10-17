// ************************** PURPOSE **************************** //
// *** This page component will fetch all the congregations ****** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/congregations page, and returnng **** //
// *** to same page with the userId and content type in the ****** //
// *** congregationProps ***************************************** //

// core
import { useRef, useState, useEffect } from "react";
import Head from "next/head";
//import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import HeadContent from "../../../SEO/head-content";
import Image from "next/image";

// graphql
import client from "../../../apollo-client";
import { GET_LOCATIONS } from "../../../graphql/library/locations";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import CongregationCarrousel from "../../../layouts/library-individual-pages/congregation-carrousel";
import SkipContent from "../../../fragments/buttons/pagination";
import CardsLazyLoading from "../../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../../../fragments/chunks/error_resource_not_found";

// styles
import libraryCongregationsStyles from "../../../styles/pages/library/locations/LibraryCongregations.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// types
import { congregationProps } from "../../../fragments/library-items/congregation";
import NavigationMenu from "../../../layouts/navigation_main";

// type congregationPageProps = {
//    congregations: congregationProps[];
// };

const Congregations = () => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");

   // ============ capitalize and push the new query to router to searh by title ======
   const router = useRouter();
   let newInput: any = "";
   const handleInputSearchReq = (string: string) => {
      if (string) {
         const singleWords = string.split(" ");
         newInput = singleWords.map((word) => word[0].toUpperCase() + word.substring(1));
         // if array has multiple items make it one word, therwords the search will be messed up ====
         const replaceComma = newInput.toString();
         newInput = replaceComma.replace(",", " ");
      }

      router.replace({ pathname: router.pathname, query: { area: newInput } });
   };

   // ====== reference to get input value ======
   const searchInputValue = useRef<HTMLInputElement>(null);

   // get the inital data
   const [initialDataState, setInitialDataState] = useState<congregationProps[] | null>(null);
   const getInitialData = async () => {
      try {
         let { skip, id, area } = router.query;
         const { data } = await client.query({
            query: GET_LOCATIONS,
            variables: {
               skip,
               id,
               area
            }
         });

         setInitialDataState(data.congregations);
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
         <div className={`${libraryCongregationsStyles.mainWrapper}`}>
            <Header currPage={"LOCATIONS"} />
            {initialDataState && (
               <SkipContent wrapperMaxWidth={"1050px"} content={initialDataState.length} />
            )}
            <div className='x-large-spacer'></div>
            <LibraryMenu
               includeCategory={false}
               includeContent={true}
               includeSearch={false}
               contentButtonIcon={"⛪"}
               currentSlectedContentPage={{ congregations: "#f2f2f2" }}
            />
            <div className={`${libraryCongregationsStyles.searchWapper}`}>
               <input
                  type='text'
                  maxLength={40}
                  className={`${libraryCongregationsStyles.search} std-input`}
                  placeholder='Name, City, or State '
                  ref={searchInputValue}
               />
               <span
                  className={`${libraryCongregationsStyles.magnifyingGlass} std-button`}
                  onClick={() => {
                     searchInputValue.current
                        ? handleInputSearchReq(searchInputValue.current.value.trim())
                        : null;
                  }}>
                  🔎
               </span>
            </div>
            {initialDataState && loadingState == "done" && (
               <CongregationCarrousel congregation={initialDataState} />
            )}
            {loadingState == "loading" && (
               <CardsLazyLoading
                  amount={16}
                  compClass={`${cardsLazyLoadingStyles.libraySquareCont} ${cardsLazyLoadingStyles.libraryLocations}`}
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
//    let { skip, id, area } = context.query;
//    const { data } = await client.query({
//       query: GET_LOCATIONS,
//       variables: {
//          skip,
//          id,
//          area
//       }
//    });

//    return {
//       props: {
//          congregations: data.congregations
//       }
//    };
// };

export default Congregations;
