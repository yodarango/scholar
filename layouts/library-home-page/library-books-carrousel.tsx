//  core
import React from "react";

// components
import Book from "../../fragments/library-items/book";

// styles
import libraryBooksCarrousel from "../../styles/layouts/library-home-page/LibraryBooksCarrousel.module.css";

// types
import { bookProps } from "../../fragments/library-items/book";

type libraryBookCarrouselProps = {
   books: bookProps[];
};
const LibraryBookCarrousel = ({ books }: libraryBookCarrouselProps) => {
   return (
      <div className={`${libraryBooksCarrousel.mainWrapper}`}>
         <h1 className={libraryBooksCarrousel.title}>BOOKS</h1>
         <div className={libraryBooksCarrousel.scrollSection}>
            {books.map((book: bookProps) => (
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
         </div>
      </div>
   );
};

export default LibraryBookCarrousel;
