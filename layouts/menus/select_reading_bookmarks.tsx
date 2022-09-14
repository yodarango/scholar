/**************************************************************************************** 
-   Displays a list of the all the user's bookmarks and gives the the ability to add new 
    bookmark of the current chapter.
-   If triggering the "Bookmark Chapter" a callback is initiated via props.handleBookmark
    and pased to the parent to activate the new icon in the header
****************************************************************************************/

// components
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
import { parseChapterId } from "../../helpers/data/parse_bible_id";

//styles
import styles from "./select_menu_global.module.css";

type TSelectReadingBookmarksProps = {
   bookMarks: string[];
   chapterId: string;
   isChapterBookmarked: boolean;
   cta: {
      handleCloseModal: () => void;
      handleBookMark: (value: boolean) => void;
   };
};

export const SelectReadingBookmarks = ({
   cta,
   bookMarks,
   isChapterBookmarked,
   chapterId
}: TSelectReadingBookmarksProps) => {
   const handleBookMark = () => {
      // handle the bookmark to db via helper function
      console.log(chapterId);
      isChapterBookmarked ? cta.handleBookMark(false) : cta.handleBookMark(true);
   };

   // check if the current chapter is bookmarked
   const status = {
      icon: isChapterBookmarked ? "add" : "remove",
      color: isChapterBookmarked ? "#7fdc7d" : "#ff4d62",
      text: isChapterBookmarked ? "Bookmark this chapter" : "Remove this bookmark"
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
         {bookMarks.map((bookmark, index) => (
            <div className={styles.menuOption} key={index}>
               <MenuPrimaryOption
                  textType='text'
                  iconType='icon'
                  optionProperties={{
                     icon: <Icon name='bookmarkFilled' size='2rem' color='#F1EAFF' />,
                     iconShadow: "#F1EAFF",
                     text: parseChapterId(bookmark)
                  }}
                  href={`/read?verse-id=${bookmark}`}
               />
            </div>
         ))}
      </PrimaryMenuBkg>
   );
};
