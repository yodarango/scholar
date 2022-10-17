/**************************************************************************************** 
- adds a bookmark to the users reading settings 
****************************************************************************************/
import { useState } from "react";
import Portal from "../../hoc/potal";
import { SelectReadingBookmarks } from "../../layouts/menus/select_reading_bookmarks";
import { Icon } from "./icons";

// styles
import styles from "./read_bookmark.module.css";

type TReadBookmarkProps = {
   chapterId: string;
   bookMarks: string[];
   size?: string;
   isBookMarked: boolean;
};

export const ReadBookmark = ({
   isBookMarked,
   size = "2rem",
   bookMarks,
   chapterId
}: TReadBookmarkProps) => {
   // state
   const [bookMarked, setbookMarked] = useState<boolean>(isBookMarked);
   const [showBookmarks, setshowBookmarks] = useState<boolean>(false);

   const handleSetBookMark = (value: boolean) => {
      setbookMarked(value);
      console.log(value);
      // handle the request to DB via helper
   };

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
