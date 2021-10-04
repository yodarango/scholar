// ************************** PURPOSE **************************** //
// *** This page component will fetch all the sermon-notes ******* //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/authors page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

// graphql
import { gql } from "@apollo/client";
import client from "../../../apollo-client";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, alphOrd, dateOrd, category } = context.query;
   !skip ? (skip = "0") : null;
   !category ? (category = "") : null;
   !alphOrd ? (alphOrd = "") : null;
   !dateOrd ? (dateOrd = "") : null;
   const { data } = await client.query({
      query: gql`
         query ($skip: String!, $category: String!, $alphOrd: String!, $dateOrd: String!) {
            sermonNotes(skip: $skip, category: $category, alphOrd: $alphOrd, dateOrd: $dateOrd) {
               id
               title
               userId
               categoryTags
               tagColors
               currentRanking
               fileUrl
               user {
                  fullName
                  avatar
               }
            }
         }
      `,
      variables: { skip, category, alphOrd, dateOrd }
   });
   return {
      props: {
         sermons: data.sermonNotes
      }
   };
};
export default Sermons;
