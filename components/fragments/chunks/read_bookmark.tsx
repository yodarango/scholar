/**************************************************************************************** 
- adds a bookmark to the users reading settings 
****************************************************************************************/
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Portal from "../../hoc/potal";
import { SelectReadingBookmarks } from "../../layouts/menus/select_reading_bookmarks";
import { Icon } from "./icons";

// styles
import styles from "./read_bookmark.module.css";

// types
import {
   handleGetBookmarks,
   TBookmarksVariables
} from "../../../helpers/functions/reading/bookmarks";

type TReadBookmarkProps = {
   size?: string;
};

export const ReadBookmark = ({ size = "2rem" }: TReadBookmarkProps) => {
   // router
   const router = useRouter();
   // state
   const [bookMarked, setbookMarked] = useState<boolean>(false);
   const [showBookmarks, setshowBookmarks] = useState<boolean>(false);
   const [bookmarks, setBookmarks] = useState<TBookmarksVariables[]>([]);

   const handleSetBookMark = (value: boolean) => {
      setbookMarked(value);
      console.log(value);
      // handle the request to DB via helper
   };

   // fetch highlighted verses
   const fetchBookmarks = async (variables: TBookmarksVariables) => {
      try {
         const { data }: any = await handleGetBookmarks(variables);
         if (data.bookmarks) {
            setbookMarked(data.bookmarks.length > 0);
            setBookmarks(data.bookmarks);
         } else {
            setBookmarks([]);
         }
      } catch (error) {
         setBookmarks([]);
         console.log(error);
      }
   };

   // get the bookmarks
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      const parseLS = LSExists && JSON.parse(LSExists);

      if (router.isReady && router.query?.CHAPTER_ID) {
         let { CHAPTER_ID } = router.query;
         CHAPTER_ID = CHAPTER_ID.toString();
         fetchBookmarks({ USER_ID: 1001, CHAPTER_ID, last_id: 9999999 });
      } else if (LSExists) {
         const CHAPTER_ID = parseLS.chapterId;
         fetchBookmarks({ USER_ID: 1001, CHAPTER_ID, last_id: 9999999 });
      }
   }, [router.query, router.isReady]);

   return (
      <div className={styles.mainWrapper} style={{ width: size, height: size }}>
         <Portal>
            {showBookmarks && (
               <SelectReadingBookmarks
                  chapterId={chapterId}
                  isChapterBookmarked={bookMarked}
                  cta={{
                     handleCloseModal: () => setshowBookmarks(false),
                     handleBookMark: (value: boolean) => handleSetBookMark(value)
                  }}
               />
            )}
         </Portal>
         {!bookMarked && (
            <div className={styles.icon} onClick={() => setshowBookmarks(true)}>
               <Icon name='bookmarkOutline' size={size} color='#ff3269' />
            </div>
         )}
         {bookMarked && (
            <div className={styles.icon} onClick={() => setshowBookmarks(true)}>
               <Icon name='bookmarkFilled' size={size} color='#ff3269' />
            </div>
         )}
      </div>
   );
};
