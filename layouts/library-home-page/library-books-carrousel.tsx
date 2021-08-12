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
                  colors={book.colors}
                  author={book.author}
                  tags={book.tags}
                  reviews={book.reviews}
                  stars={book.stars}
                  url={book.url}
                  description={book.description}
               />
            ))}
         </div>
      </div>
   );
};

export default LibraryBookCarrousel;
