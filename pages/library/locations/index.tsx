// ************************** PURPOSE **************************** //
// *** This page component will fetch all the congregations ****** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/congregations page, and returnng **** //
// *** to same page with the userId and content type in the ****** //
// *** congregationProps ***************************************** //

// core
import React, { useRef } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// graphql
import { gql } from "@apollo/client";
import client from "../../../apollo-client";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import CongregationCarrousel from "../../../layouts/library-individual-pages/congregation-carrousel";

// styles
import libraryCongregationsStyles from "../../../styles/pages/library/locations/LibraryCongregations.module.css";

// types
import { congregationProps } from "../../../fragments/library-items/congregation";
import NavigationMenu from "../../../layouts/navigation-menu";

type congregationPageProps = {
   congregations: congregationProps[];
};

const Congregations = ({ congregations }: congregationPageProps) => {
   // ============ capitalize and push the new query to router to searh by title ======
   const router = useRouter();
   let newInput: any = "";
   const handleInputSearchReq = (string: string) => {
      if (string) {
         const singleWords = string.split(" ");
         newInput = singleWords.map((word) => word[0].toUpperCase() + word.substr(1));
         console.log(newInput);
      }

      router.replace({ pathname: router.pathname, query: { area: newInput } });
   };

   // ====== reference to get input value ======
   const searchInputValue = useRef<HTMLInputElement>(null);
   return (
      <>
         <div className={`${libraryCongregationsStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"CONGREGATIONS"} />
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
                        ? handleInputSearchReq(searchInputValue.current.value)
                        : null;
                  }}>
                  🔎
               </span>
            </div>
            {congregations && <CongregationCarrousel congregation={congregations} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, id, area } = context.query;
   const { data } = await client.query({
      query: gql`
         query ($skip: String, $id: ID, $area: String) {
            congregations(skip: $skip, id: $id, area: $area) {
               id
               address
               city
               state
               fullState
               zip
               country
               location
               logo
               name
               organization
               schedule
               website
               iFrame
            }
         }
      `,
      variables: {
         skip,
         id,
         area
      }
   });
   console.log(area);
   return {
      props: {
         congregations: data.congregations
      }
   };
};

export default Congregations;
