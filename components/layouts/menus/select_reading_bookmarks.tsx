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
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";
import { CONTENT_LAST_ID } from "../../../constants/defaults";
import { DANGER_COLOR_SECONDARY, SAFE_COLOR } from "../../../constants/tokens";

type TSelectReadingBookmarksProps = {
   chapterId: string | string[];
   isChapterBookmarked: boolean;
   isModalOpen: boolean;
   cta: {
      handleCloseModal: (val: boolean) => void;
      handleBookMark: (value: boolean) => void;
   };
};

export const SelectReadingBookmarks = ({
   cta,
   isChapterBookmarked,
   isModalOpen,
   chapterId
}: TSelectReadingBookmarksProps) => {
   // state
   const [bookmarks, setBookmarks] = useState<TBookmarksVariables[]>([]);
   const [loading, setloading] = useState("loading");

   // fetch bookmark
   const handleGetData = async (variables: TBookmarksVariables) => {
      try {
         const { data }: any = await handleGetBookmarks(variables);
         if (data.bookmarks) {
            setBookmarks(data.bookmarks);
            setloading("done");
         } else {
            setBookmarks([]);
            setloading("done");
         }
      } catch (error) {
         setBookmarks([]);
         setloading("done");
         console.log(error);
      }
   };

   // get the bookmarks
   useEffect(() => {
      handleGetData({ USER_ID: 1001, last_id: CONTENT_LAST_ID });
   }, [chapterId]);

   const handleBookMark = () => {
      // handle the bookmark to db via helper function
      cta.handleBookMark(!isChapterBookmarked);
   };

   // check if the current chapter is bookmarked
   const status = {
      icon: !isChapterBookmarked ? "add" : "remove",
      color: !isChapterBookmarked ? SAFE_COLOR : DANGER_COLOR_SECONDARY,
      text: !isChapterBookmarked ? "Bookmark this chapter" : "Remove this bookmark"
   };

   return (
      <PrimaryMenuBkg
         className={styles.bookmarkMainWrapper}
         color='1'
         cta={{ handleClose: () => cta.handleCloseModal(!isModalOpen) }}>
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
         {loading === "done" &&
            bookmarks.map((bookmark, index) => (
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
                  />
               </div>
            ))}
         {loading === "loading" && (
            <div className={styles.loading}>
               <RoundLoader />
            </div>
         )}
         {/* #NEEDS GRAPHICS */}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </PrimaryMenuBkg>
   );
};
