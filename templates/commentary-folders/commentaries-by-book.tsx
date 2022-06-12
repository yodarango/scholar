// core
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// apollo
import client from "../../apollo-client";
import { GET_COMMETNARIES_BY_BOOK_DATA } from "../../graphql/users/profile";

// comps
import CommentariesByBook from "../../fragments/squares/commentary-books/commentaries-by-book";
import CommentariesProfileMenu from "../../fragments/buttons/commentaries-profile-menu";

//styles
import commentariesByBookStyles from "../../styles/templates/commentaries-by-book/commentaries-by-book.module.css";

// data
import { bible, Tbible } from "../../data/bible-books-w-chapters";

// helpers
import { Tuser } from "../../pages/users/[userId]";

const CommentariesByBookTemp = () => {
   // states
   const [bookKeys, setbookKeys] = useState<string[]>([]);
   const [books, setBooks] = useState<any>(null);
   const [user, setUser] = useState<Tuser | null>(null);

   const router = useRouter();
   const user_id = router.query.userId;
   console.log(user_id);

   // get count of commentaries by book
   const getCommentariesByBook = async () => {
      try {
         const { data } = await client.query({
            query: GET_COMMETNARIES_BY_BOOK_DATA,
            variables: { USER_ID: user_id }
         });

         console.log(data);
         if (data.commentaries_by_book_count && data.users) {
            setbookKeys(Object.keys(data.commentaries_by_book_count));
            setBooks(data.commentaries_by_book_count);
            setUser(data.users[0]);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         getCommentariesByBook();
      }
   }, [router.isReady]);
   return (
      <div className={commentariesByBookStyles.mainWrapper}>
         <Link href={`/users/${user?.ID}`}>
            <a className='goBack'></a>
         </Link>

         {user && (
            <h1 className={commentariesByBookStyles.header}>Commentaries by {user.signature}</h1>
         )}
         <CommentariesProfileMenu />
         {books && user && (
            <section className={commentariesByBookStyles.commentariesWrapper}>
               {bible.map((book: Tbible, index: number) => (
                  <CommentariesByBook
                     bookId={book.bookId}
                     bookTitle={book.bookTitle}
                     bookBkg={book.bookBkg}
                     userId={user.ID}
                     totalComments={books[bookKeys[index]]}
                     key={index}
                  />
               ))}
            </section>
         )}
      </div>
   );
};

export default CommentariesByBookTemp;
