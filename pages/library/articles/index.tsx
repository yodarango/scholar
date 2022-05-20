// ************************** PURPOSE **************************** //
// *** This page component will fetch all the articles found ***** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/authors page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import { useState, useEffect } from "react";
import Head from "next/head";
// import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

// graphql
import client from "../../../apollo-client";
import { GET_ARTICLES } from "../../../graphql/library/articles";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import LibraryFilter from "../../../fragments/buttons/library-filter";
import ArticlesCarrousel from "../../../layouts/library-individual-pages/articles-carrousel";
import SkipContent from "../../../fragments/buttons/skipContent";
import CardsLazyLoading from "../../../layouts/cards-lazy-loading";
import NavigationMenu from "../../../layouts/navigation-menu";
import ResourceNotFoundError from "../../../layouts/resource-not-found-error";

// styles
import libraryArticlesPageStyles from "../../../styles/pages/library/sermon-notes/LibrarySermons.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// types
import { articleProps } from "../../../fragments/library-items/article";

// type articlePageProps = {
//    articles: articleProps[];
// };

const Articles = () => {
   // rotuer
   const router = useRouter();

   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");
   // ============ capitalize and push the new query to router to searh by title ======
   let newInput: any = "";
   const handleInputSearchReq = (string: string) => {
      if (string) {
         const singleWords = string.split(" ");
         newInput = singleWords.map((word) => word[0].toUpperCase() + word.substring(1));
      }

      router.replace({ pathname: router.pathname, query: { title: newInput } });
   };

   // get the inital data
   const [initialDataState, setInitialDataState] = useState<articleProps[]>([]);
   const getInitialData = async () => {
      try {
         let { skip, category, alphOrd, dateOrd, userId, title, id } = router.query;
         const { data } = await client.query({
            query: GET_ARTICLES,
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
         setInitialDataState(data.articles);
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
         <div className={`${libraryArticlesPageStyles.mainWrapper}`}>
            <Header currPage={"ARTICLES"} />
            {initialDataState && (
               <SkipContent wrapperMaxWidth={"1050px"} content={initialDataState} />
            )}
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
            {initialDataState && loadingState === "done" && (
               <ArticlesCarrousel articles={initialDataState} />
            )}
            {loadingState == "loading" && (
               <CardsLazyLoading
                  amount={16}
                  compClass={`${cardsLazyLoadingStyles.librayArticles}`}
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
//    let { skip, category, alphOrd, dateOrd, userId, title, id } = context.query;
//    const { data } = await client.query({
//       query: GET_ARTICLES,
//       variables: {
//          skip,
//          category,
//          alphOrd,
//          dateOrd,
//          userId,
//          title,
//          id
//       }
//    });
//    return {
//       props: {
//          articles: data.articles
//       }
//    };
// };

export default Articles;
