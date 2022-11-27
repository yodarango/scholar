/**************************************************************************************** 
-   Displays a list of the all the user's bookmarks and gives the the ability to add new 
    bookmark of the current chapter.
-   If triggering the "Bookmark Chapter" a callback is initiated via props.handleBookmark
    and pased to the parent to activate the new icon in the header
****************************************************************************************/

// components
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// cmops
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
import { parseChapterId } from "../../../helpers/data/parse_bible_id";

//styles
import styles from "./select_menu_global.module.css";

// types
import {
   handleGetBookmarks,
   TBookmarksVariables
} from "../../../helpers/functions/reading/bookmarks";

type TSelectReadingBookmarksProps = {
   chapterId: string;
   isChapterBookmarked: boolean;
   cta: {
      handleCloseModal: () => void;
      handleBookMark: (value: boolean) => void;
   };
};

export const SelectReadingBookmarks = ({
   cta,
   isChapterBookmarked,
   chapterId
}: TSelectReadingBookmarksProps) => {
   // router
   const router = useRouter();
   // state
   const [bookMarked, setbookMarked] = useState<boolean>(false);
   const [bookmarks, setBookmarks] = useState<TBookmarksVariables[]>([]);

   // const handleSetBookMark = (value: boolean) => {
   //    setbookMarked(value);
   //    console.log(value);
   //    // handle the request to DB via helper
   // };

   // fetch highlighted verses
   const fetchBookmarks = async (variables: TBookmarksVariables) => {
      try {
         const { data }: any = await handleGetBookmarks(variables);
         if (data.bookmarks) {
            console.log(bookmarks);
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
      fetchBookmarks({ USER_ID: 1001, last_id: 9999999 });
   }, []);

   const handleBookMark = () => {
      // handle the bookmark to db via helper function
      console.log(chapterId);
      isChapterBookmarked ? cta.handleBookMark(false) : cta.handleBookMark(true);
   };

   // check if the current chapter is bookmarked
   const status = {
      icon: !isChapterBookmarked ? "add" : "remove",
      color: !isChapterBookmarked ? "#7fdc7d" : "#ff4d62",
      text: !isChapterBookmarked ? "Bookmark this chapter" : "Remove this bookmark"
   };

   return (
      <PrimaryMenuBkg color='1' cta={{ handleClose: cta.handleCloseModal }}>
         <div className={styles.menuOption}>
            <MenuPrimaryOption
               textType='text'
               iconType='icon'
               optionProperties={{
                  icon: <Icon name={status.icon} size='2rem' color={status.color} />,
                  iconShadow: status.color,
                  text: status.text,
                  descColor: status.color
               }}
               cta={{ handleOptionClick: handleBookMark }}
            />
         </div>
         {bookmarks.map((bookmark, index) => (
            <div className={styles.menuOption} key={index}>
               <MenuPrimaryOption
                  textType='text'
                  iconType='icon'
                  optionProperties={{
                     icon: <Icon name='bookmarkFilled' size='2rem' color='#F1EAFF' />,
                     iconShadow: "#F1EAFF",
                     text: bookmark.CHAPTER_ID
                        ? parseChapterId(bookmark.CHAPTER_ID)
                        : "Error loading bookmark"
                  }}
                  href={`/read?chapter-id=${bookmark.CHAPTER_ID}`}
                  // cta={{
                  //    handleOptionClick: () => router.push({query: bookmark.CHAPTER_ID })
                  // }}
               />
            </div>
         ))}
      </PrimaryMenuBkg>
   );
};
