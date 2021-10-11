// ************************** PURPOSE **************************** //
// *** This page component will fetch all the watch found ******** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/watch page, and returnng to ********* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// graphQl
import { gql } from "@apollo/client";
import client from "../../../apollo-client";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import WatchCarrousel from "../../../layouts/library-individual-pages/watch-carrousel";
import LibraryFilterPreachers from "../../../fragments/buttons/library-filter-preachers";

// styles
import libraryWatchStyles from "../../../styles/pages/library/watch/LibraryWatch.module.css";

// types
import { watchProps } from "../../../fragments/library-items/watch";
import NavigationMenu from "../../../layouts/navigation-menu";

type watchPageProps = {
   watch: watchProps[];
};

const Watch = ({ watch }: watchPageProps) => {
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
   return (
      <>
         <div className={`${libraryWatchStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"WATCH"} />
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
            {watch && <WatchCarrousel watch={watch} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, alphOrd, dateOrd, category, userId, title, id } = context.query;

   const { data } = await client.query({
      query: gql`
         query (
            $skip: String
            $category: String
            $alphOrd: String
            $dateOrd: String
            $userId: ID
            $title: String
            $id: ID
         ) {
            sermons(
               skip: $skip
               category: $category
               alphOrd: $alphOrd
               dateOrd: $dateOrd
               userId: $userId
               id: $id
               title: $title
            ) {
               id
               title
               thumbnail
               sermonUrl
               categoryTags
               tagColors
               description
               currentRanking
               userId
               user {
                  fullName
                  avatar
               }
            }
         }
      `,
      variables: { skip, alphOrd, dateOrd, category, userId, title, id }
   });

   return {
      props: {
         watch: data.sermons
      }
   };
};

export default Watch;
