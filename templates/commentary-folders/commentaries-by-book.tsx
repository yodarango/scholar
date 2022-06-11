// comps
import CommentariesByBook from "../../fragments/squares/commentary-books/commentaries-by-book";

//styles
import commentariesByBookStyles from "../../styles/templates/commentaries-by-book/commentaries-by-book.module.css";
import React from "react";

// data
import { bible, Tbible } from "../../data/bible-books-w-chapters";
import Link from "next/link";

type commentariesByBookTempProps = {
   user: string;
   userId: number;
};

const CommentariesByBookTemp = ({ user, userId }: commentariesByBookTempProps) => {
   return (
      <div className={commentariesByBookStyles.mainWrapper}>
         <Link href={`/users/${userId}`}>
            <a className='goBack'></a>
         </Link>

         <h1 className={commentariesByBookStyles.header}>Commentaries by {user}</h1>

         <section className={commentariesByBookStyles.commentariesWrapper}>
            {bible.map((book: Tbible, index: number) => (
               <CommentariesByBook
                  bookId={book.bookId}
                  bookTitle={book.bookTitle}
                  bookBkg={book.bookBkg}
                  totalComments={0}
                  key={index}
               />
            ))}
         </section>
      </div>
   );
};

export default CommentariesByBookTemp;
