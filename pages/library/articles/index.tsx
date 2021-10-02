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
   return (
      <>
         <div className={`${libraryArticlesPageStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"ARTICLES"} />
            <div className='x-large-spacer'></div>
            <LibraryMenu
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
   let { skip, category } = context.query;
   if (!skip) {
      skip = "0";
   }
   if (!category) {
      category = "";
   }
   console.log(skip, category);
   const { data } = await client.query({
      query: gql`
         query ($skip: String!, $category: String!) {
            articles(skip: $skip, category: $category) {
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
      variables: { skip: skip, category: category }
   });

   return {
      props: {
         articles: data.articles
      }
   };
};

export default Articles;
