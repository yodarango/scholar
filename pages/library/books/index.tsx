// ************************** PURPOSE **************************** //
// *** This page component will fetch all the books found ******** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/books page, and returnng to ********* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import BooksCarrousel from "../../../layouts/library-individual-pages/books-carrousel";

// styles
import libraryBooksStyles from "../../../styles/pages/library/books/LibraryBooks.module.css";

// types
import { bookProps } from "../../../fragments/library-items/book";

type booksPageProps = {
   books: bookProps[];
};

const Blogs = ({ books }: booksPageProps) => {
   return (
      <div className={`${libraryBooksStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"BOOKS"} />
         <div className='x-large-spacer'></div>
         <LibraryMenu
            includeCategory={true}
            includeContent={true}
            includeSearch={true}
            contentButtonIcon={"📚"}
            currentSlectedContentPage={{ books: "#f2f2f2" }}
         />
         {books && <BooksCarrousel books={books} />}
      </div>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getStaticProps: GetStaticProps = async () => {
   const data = await fetch("https://scholar-be.herokuapp.com/library");
   const parsedData = await data.json();

   return {
      props: {
         books: parsedData.books,
         revalidate: 60 * 50 * 24 //everyday
      }
   };
};

export default Blogs;
