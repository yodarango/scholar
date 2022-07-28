// ************************** PURPOSE **************************** //
// *** This page component will fetch all the books found ******** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/books page, and returnng to ********* //
// *** same page with the userId and content type in the query *** //

// core
import { useState, useEffect } from "react";
import Head from "next/head";
//import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import HeadContent from "../../../layouts/head-content";
import Image from "next/image";

// graphql
import client from "../../../apollo-client";
import { GET_BOOKS } from "../../../graphql/library/books";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import BooksCarrousel from "../../../layouts/library-individual-pages/books-carrousel";
import SkipContent from "../../../fragments/buttons/pagination";
import CardsLazyLoading from "../../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../../../fragments/chunks/error_resource_not_found";

// styles
import libraryBooksStyles from "../../../styles/pages/library/books/LibraryBooks.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// types
import { bookProps } from "../../../fragments/library-items/book";
import NavigationMenu from "../../../layouts/navigation-menu";

// type booksPageProps = {
//    books: bookProps[];
// };

const Books = () => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");
   // ============ capitalize and push the new query to router to searh by title ======
   const router = useRouter();
   let newInput: any = "";
   const handleInputSearchReq = (string: string) => {
      if (string) {
         const singleWords = string.split(" ");
         newInput = singleWords.map((word) => word[0].toUpperCase() + word.substring(1));
      }

      router.replace({ pathname: router.pathname, query: { title: newInput } });
   };

   // get the inital data
   const [initialDataState, setInitialDataState] = useState<bookProps[] | null>(null);
   const getInitialData = async () => {
      try {
         let { skip, category, title, author } = router.query;
         const { data } = await client.query({
            query: GET_BOOKS,
            variables: { skip, category, author, title }
         });
         setInitialDataState(data.books);
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
         <div className={`${libraryBooksStyles.mainWrapper}`}>
            <Header currPage={"BOOKS"} />
            {initialDataState && (
               <SkipContent wrapperMaxWidth={"1050px"} content={initialDataState.length} />
            )}
            <div className='x-large-spacer'></div>
            <LibraryMenu
               handleInputSearchReq={handleInputSearchReq}
               includeCategory={true}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"📚"}
               currentSlectedContentPage={{ books: "#f2f2f2" }}
            />
            {initialDataState && loadingState == "done" && (
               <BooksCarrousel books={initialDataState} />
            )}
            {loadingState == "loading" && (
               <CardsLazyLoading amount={16} compClass={cardsLazyLoadingStyles.librayBooks} />
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
//    let { skip, category, title, author } = context.query;

//    const { data } = await client.query({
//       query: GET_BOOKS,
//       variables: { skip, category, author, title }
//    });

//    return {
//       props: {
//          books: data.books
//       }
//    };
// };

export default Books;
