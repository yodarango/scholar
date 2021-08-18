// ************************** PURPOSE **************************** //
// *** This is only a wrapper to display each individual ********* //
// *** watch component by calling a map on the props  ************ //
// *** passed in this component, which is an array of the ******** //
// *** watch fetched from the library. *************************** //

// core
import React from "react";

//components
import Book from "../../fragments/library-items/book";

// styles
import bookCarrouselStyles from "../../styles/layouts/library-individual-pages/BooksCarrousel.module.css";

// helpers:types
import { bookProps } from "../../fragments/library-items/book";

type bookCarrouselProps = {
   books: bookProps[];
};

const BookCarrousel = ({ books }: bookCarrouselProps) => {
   return (
      <div className={bookCarrouselStyles.mainWrapper}>
         <div className={bookCarrouselStyles.gridWrapper}>
            {books.map((book: bookProps) => (
               <Book
                  id={book.id}
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  reviews={book.reviews}
                  stars={book.stars}
                  url={book.url}
                  newClass={bookCarrouselStyles.bookMainWrapper}
                  tags={book.tags}
                  colors={book.colors}
                  description={book.description}
               />
            ))}

            {/* ====== TEMPORARY data jsut to create more content ======= */}
            {books.map((book: bookProps) => (
               <Book
                  id={book.id}
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  reviews={book.reviews}
                  stars={book.stars}
                  url={book.url}
                  newClass={bookCarrouselStyles.bookMainWrapper}
                  tags={book.tags}
                  colors={book.colors}
                  description={book.description}
               />
            ))}
         </div>
      </div>
   );
};

export default BookCarrousel;
