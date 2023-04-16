/**************************************************************************************** 
adds or removes a bookmark
**************************/
import { useEffect, useState } from "react";
import Portal from "../../hoc/potal";
import { SelectReadingBookmarks } from "../../layouts/menus/select_reading_bookmarks";
import { Icon } from "./icons";

// styles
import styles from "./read_bookmark.module.css";

// types
import {
   handleGetBookmarks,
   handlePostBookMark,
   handleRemoveBookMark,
   TBookmarksVariables
} from "../../../helpers/functions/reading/bookmarks";

// data
import { CONTENT_LAST_ID } from "../../../constants/defaults";

type TReadBookmarkProps = {
   chapterId: any;
   size?: string;
};

export const ReadBookmark = ({ size = "2rem", chapterId }: TReadBookmarkProps) => {
   // state
   const [bookMarked, setbookMarked] = useState<boolean>(false);
   const [showBookmarks, setshowBookmarks] = useState<boolean>(false);

   //
   const handleSetBookMark = async (value: boolean) => {
      try {
         // if  the value is TRUE the user is highlighting
         if (value) {
            const data = await handlePostBookMark(chapterId);

            if (data) {
               setbookMarked(value);
               setshowBookmarks(false);
            }
         } else {
            const data = await handleRemoveBookMark(chapterId);

            if (data) {
               setbookMarked(value);
               setshowBookmarks(false);
            }
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handlegetchBookmarks = async (variables: TBookmarksVariables) => {
      try {
         const { data }: any = await handleGetBookmarks(variables);
         if (data?.bookmarks) {
            setbookMarked(data.bookmarks.length > 0);
         }
      } catch (error) {
         console.error(error);
      }
   };

   // get the bookmarks
   useEffect(() => {
      handlegetchBookmarks({ USER_ID: 1001, CHAPTER_ID: chapterId, last_id: CONTENT_LAST_ID });
   }, [chapterId]);

   return (
      <div className={styles.mainWrapper} style={{ width: size, height: size }}>
         {/* menu that allows selecting bookmarks, bookmarking and de-bookmarking 🔖 */}
         <Portal>
            {showBookmarks && (
               <SelectReadingBookmarks
                  isModalOpen={showBookmarks}
                  chapterId={chapterId}
                  isChapterBookmarked={bookMarked}
                  cta={{
                     handleCloseModal: () => setshowBookmarks(!showBookmarks),
                     handleBookMark: (value: boolean) => handleSetBookMark(value)
                  }}
               />
            )}
         </Portal>

         {/* bookmark icon: filled if bookmarked and empty if not 🔖 */}
         <div className={styles.icon} onClick={() => setshowBookmarks(!showBookmarks)}>
            <Icon
               name={bookMarked ? "bookmarkFilled" : "bookmarkOutline"}
               size={size}
               color='#ff3269'
            />
         </div>
      </div>
   );
};
