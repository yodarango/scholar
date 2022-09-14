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
   cta: {
      handleCloseModal: () => void;
      handleBookMark: (verseId: string) => void;
   };
};

export const SelectReadingBookmarks = ({ cta, bookMarks }: TSelectReadingBookmarksProps) => {
   const handleBookMark = () => {};

   return (
      <PrimaryMenuBkg color='1' cta={{ handleClose: cta.handleCloseModal }}>
         <div className={styles.menuOption}>
            <MenuPrimaryOption
               textType='text'
               iconType='icon'
               optionProperties={{
                  icon: <Icon name='add' size='2rem' color='#7fdc7d' />,
                  iconShadow: "#7fdc7d",
                  text: "Bookmark this chapter",
                  descColor: "#7fdc7d"
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
