// ************************** PURPOSE **************************** //
// *** This page component will fetch all the books found ******** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/books page, and returnng to ********* //
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
import BooksCarrousel from "../../../layouts/library-individual-pages/books-carrousel";

// styles
import libraryBooksStyles from "../../../styles/pages/library/books/LibraryBooks.module.css";

// types
import { bookProps } from "../../../fragments/library-items/book";
import NavigationMenu from "../../../layouts/navigation-menu";

type booksPageProps = {
   books: bookProps[];
};

const Books = ({ books }: booksPageProps) => {
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
         <div className={`${libraryBooksStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"BOOKS"} />
            <div className='x-large-spacer'></div>
            <LibraryMenu
               handleInputSearchReq={handleInputSearchReq}
               includeCategory={true}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"📚"}
               currentSlectedContentPage={{ books: "#f2f2f2" }}
            />
            {books && <BooksCarrousel books={books} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, category, title, author } = context.query;

   const { data } = await client.query({
      query: gql`
         query ($skip: String, $category: String, $author: String, $title: String) {
            books(skip: $skip, category: $category, title: $title, author: $author) {
               id
               title
               author
               categoryTags
               tagColors
               bookUrl
               currentRanking
            }
         }
      `,
      variables: { skip, category, author, title }
   });

   return {
      props: {
         books: data.books
      }
   };
};

export default Books;
