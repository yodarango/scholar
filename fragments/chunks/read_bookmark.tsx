/**************************************************************************************** 
- adds a bookmark to the users reading settings 
****************************************************************************************/
import { useState } from "react";
import Portal from "../../hoc/potal";
import { Icon } from "./icons";

// styles
import styles from "./read_bookmark.module.css";

type TReadBookmarkProps = {
   size?: string;
   isBookMarked: boolean;
};

export const ReadBookmark = ({ isBookMarked, size = "2rem" }: TReadBookmarkProps) => {
   // state
   const [bookMarked, setbookMarked] = useState<boolean>(isBookMarked);
   const [showBookmarks, setshowBookmarks] = useState<boolean>(false);

   const handleSetBookMark = (value: boolean) => {
      setbookMarked(value);
      // handle the request to DB via helper
   };

   return (
      <div className={styles.mainWrapper} style={{ width: size, height: size }}>
         <Portal>{showBookmarks && <h1>helo</h1>}</Portal>
         {!bookMarked && (
            <div className={styles.icon} onClick={() => handleSetBookMark(true)}>
               <Icon name='bookmarkOutline' size={size} color='#F1EAFF' />
            </div>
         )}
         {bookMarked && (
            <div className={styles.icon} onClick={() => handleSetBookMark(false)}>
               <Icon name='bookmarkFilled' size={size} color='#F1EAFF' />
            </div>
         )}
      </div>
   );
};
