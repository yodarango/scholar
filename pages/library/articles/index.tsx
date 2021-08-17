// ************************** PURPOSE **************************** //
// *** This page component will fetch all the articles found ***** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/authors page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import LibraryFilter from "../../../fragments/buttons/library-filter";
import ArticlesCarrousel from "../../../layouts/library-individual-pages/articles-carrousel";

// styles
import libraryArticlesPageStyles from "../../../styles/pages/library/sermon-notes/LibrarySermons.module.css";

// types
import { articleProps } from "../../../fragments/library-items/article";

type articlePageProps = {
   articles: articleProps[];
};

const Articles = ({ articles }: articlePageProps) => {
   return (
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
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getStaticProps: GetStaticProps = async () => {
   const data = await fetch("https://scholar-be.herokuapp.com/library");
   const parsedData = await data.json();

   return {
      props: {
         articles: parsedData.articles,
         revalidate: 60 * 50 * 24 //everyday
      }
   };
};

export default Articles;
