//  core
import React from "react";
import Image from "next/image";

// components
import Book from "../../fragments/library-items/book";
import CardsLazyLoading from "../cards-lazy-loading";
import ResourceNotFoundError from "../../fragments/chunks/error_resource_not_found";

// styles
import libraryBooksCarrousel from "../../styles/layouts/library-home-page/LibraryBooksCarrousel.module.css";
import cardsLazyLoadingStyle from "../../styles/layouts/CardsLazyLoading.module.css";

// types
import { bookProps } from "../../fragments/library-items/book";

type libraryBookCarrouselProps = {
   books: bookProps[] | undefined;
   err: boolean;
};
const LibraryBookCarrousel = ({ books, err }: libraryBookCarrouselProps) => {
   return (
      <div className={`${libraryBooksCarrousel.mainWrapper}`}>
         <h1 className={libraryBooksCarrousel.title}>BOOKS</h1>
         <div className={libraryBooksCarrousel.scrollSection}>
            {books &&
               books.map((book: bookProps) => (
                  <Book
                     id={book.id}
                     key={book.id}
                     title={book.title}
                     tagColors={book.tagColors}
                     author={book.author}
                     categoryTags={book.categoryTags}
                     currentRanking={book.currentRanking}
                     totalReviews={book.totalReviews}
                     bookUrl={book.bookUrl}
                     description={book.description}
                     thumbnail={book.thumbnail}
                  />
               ))}

            {!books && !err && (
               <CardsLazyLoading
                  amount={10}
                  compClass={cardsLazyLoadingStyle.libraryHomePageSquare}
               />
            )}

            {err && <ResourceNotFoundError />}
         </div>
      </div>
   );
};

export default LibraryBookCarrousel;
