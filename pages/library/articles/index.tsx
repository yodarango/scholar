// ************************** PURPOSE **************************** //
// *** This page component will fetch all the articles found ***** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/authors page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// graphql
import { gql } from "@apollo/client";
import client from "../../../apollo-client";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import LibraryFilter from "../../../fragments/buttons/library-filter";
import ArticlesCarrousel from "../../../layouts/library-individual-pages/articles-carrousel";

// styles
import libraryArticlesPageStyles from "../../../styles/pages/library/sermon-notes/LibrarySermons.module.css";

// types
import { articleProps } from "../../../fragments/library-items/article";
import NavigationMenu from "../../../layouts/navigation-menu";

type articlePageProps = {
   articles: articleProps[];
};

const Articles = ({ articles }: articlePageProps) => {
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
         <div className={`${libraryArticlesPageStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"ARTICLES"} />
            <div className='x-large-spacer'></div>
            <LibraryMenu
               handleInputSearchReq={handleInputSearchReq}
               includeCategory={true}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"📃"}
               currentSlectedContentPage={{ articles: "#f2f2f2" }}
            />
            <LibraryFilter params={`articles`} />
            {articles && <ArticlesCarrousel articles={articles} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, category, alphOrd, dateOrd, userId, title, id } = context.query;
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
            articles(
               skip: $skip
               category: $category
               alphOrd: $alphOrd
               dateOrd: $dateOrd
               userId: $userId
               title: $title
               id: $id
            ) {
               id
               title
               fileUrl
               categoryTags
               tagColors
               description
               currentRanking
               userId
               user {
                  fullName
               }
            }
         }
      `,
      variables: {
         skip,
         category,
         alphOrd,
         dateOrd,
         userId,
         title,
         id
      }
   });

   console.log(context.query);
   return {
      props: {
         articles: data.articles
      }
   };
};

export default Articles;
