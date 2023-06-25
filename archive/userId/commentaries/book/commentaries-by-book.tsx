// core
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// apollo
import client from "../../../../../apollo-client";
import { GET_COMMETNARIES_BY_BOOK_DATA } from "../../../../../graphql/users/profile";

// comps
import CommentariesByBook from "../../../../../archive/squares/commentary-books/commentaries-by-book";
import CommentariesProfileMenu from "../../../../../fragments/buttons/commentaries-profile-menu";
import PopupWrapper from "../../../../../layouts/popup-wrapper";
import CommentariesByChapterTemp from "../../../../../fragments/popups/commentaries-by-book-chapter";
import CardsLazyLoading from "../../../../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../../../../components/common/feedback/resource_not_found";

//styles
import commentariesByBookStyles from "../../../../../styles/templates/users/userId/commentaries-by-book/commentaries-by-book.module.css";
import cardsLazyLoadingStyles from "../../../../../styles/layouts/CardsLazyLoading.module.css";

// data
import { bible, Tbible } from "../../../../../data/bible";

// helpers
import { Tuser } from "../../../../../pages/users/[userId]";
import TextPrimaryInput from "../../../../../fragments/inputs/text_primary-input";

const CommentariesByBookTemp = () => {
   // states
   const [bookKeys, setbookKeys] = useState<string[]>([]);
   const [books, setBooks] = useState<any>(null);
   const [user, setUser] = useState<Tuser | null>(null);
   const [chaptersModal, setchaptersModal] = useState<Boolean | JSX.Element>(false);
   const [loading, setLoading] = useState("loading");
   const [bibleBooks, setbibleBooks] = useState<Tbible[]>(bible);

   // router
   const router = useRouter();

   // get the userId from the router to know what user to fetch data from
   const user_id = router.query.userId;

   // get count of commentaries by book
   const getCommentariesByBook = async () => {
      try {
         const { data } = await client.query({
            query: GET_COMMETNARIES_BY_BOOK_DATA,
            variables: { USER_ID: user_id }
         });

         if (data.commentaries_by_book_count && data.users) {
            setbookKeys(Object.keys(data.commentaries_by_book_count));
            setBooks(data.commentaries_by_book_count);
            setUser(data.users[0]);
            setLoading("done");
         }
      } catch (error) {
         console.log(error);
         setLoading("error");
      }
   };

   useEffect(() => {
      if (router.isReady) {
         getCommentariesByBook();
      }
   }, [router.isReady]);

   // -------- open the modal od chapters for the selected bible book
   const openSelectedBookChapters = (bookId: string) => {
      setchaptersModal(
         <PopupWrapper
            content={<CommentariesByChapterTemp bookId={bookId} userId={user_id} />}
            closeModal={() => setchaptersModal(false)}
         />
      );
   };

   //  ---------- filter the books on typing
   const filterBooks = (e: any) => {
      const filteredBooks = bible.filter((book: Tbible) => {
         return book.bookTitle.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
      });
      setbibleBooks(filteredBooks);
   };

   return (
      <div className={commentariesByBookStyles.mainWrapper}>
         {chaptersModal}
         <Link href={`/users/${user?.ID}`}>
            <a className='goBack'></a>
         </Link>

         {user && loading === "done" && (
            <h1 className={commentariesByBookStyles.header}>Commentaries by {user.signature}</h1>
         )}
         {user && loading === "done" && <CommentariesProfileMenu />}
         {user && loading === "done" && (
            <div className={commentariesByBookStyles.searchInputWrapper}>
               <TextPrimaryInput placeholder='search book' cta={filterBooks} />
            </div>
         )}
         {books && user && loading === "done" && (
            <section className={commentariesByBookStyles.commentariesWrapper}>
               {bibleBooks.map((book: Tbible, index: number) => (
                  <CommentariesByBook
                     bookTitle={book.bookTitle}
                     bookBkg={book.bookBkg}
                     openSelectedBookChapters={() => openSelectedBookChapters(book.bookId)}
                     totalComments={books[bookKeys[index]]}
                     key={index}
                  />
               ))}
            </section>
         )}
         {loading === "loading" && (
            <CardsLazyLoading amount={25} compClass={cardsLazyLoadingStyles.postCardQuote} />
         )}
         {loading == "error" && <ResourceNotFoundError />}
      </div>
   );
};

export default CommentariesByBookTemp;
