// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// helpers
import { TrateContent } from "../../../helpers/functions/posts/content_post_rating";

// styles
import styles from "./select_menu_global.module.css";

// helpers
import { rateContent } from "../../../helpers/functions/posts/content_post_rating";

// constants
import { EnumContentType } from "../../../types/enums";
import { POST_TYPE_COMMENTARY, POST_TYPE_QUOTE } from "../../../constants/defaults";

export type TSelectPostRatingMenuProps = {
   contentType: EnumContentType;
   userId: string | number;
   postId: string | number;
   cta: {
      handleRating: (rating: number, status: number) => void;
      handleCloseModal: () => void;
   };
};

export const SelectPostRatingMenu = ({
   cta,
   userId,
   postId,
   contentType
}: TSelectPostRatingMenuProps) => {
   const menuOptions = [
      {
         rating: 100,
         letter: "A+",
         description: "97 - 100",
         color: "#75d975"
      },
      {
         rating: 96,
         letter: "A",
         description: "94 - 97",
         color: "#75d975"
      },
      {
         rating: 92,
         letter: "A-",
         description: "90 - 94",
         color: "#75d975"
      },
      {
         rating: 89,
         letter: "B+",
         description: "87 - 90",
         color: "#b3eeb3"
      },
      {
         rating: 86,
         letter: "B",
         description: "83 - 87",
         color: "#b3eeb3"
      },
      {
         rating: 82,
         letter: "B-",
         description: "80 - 83",
         color: "#b3eeb3"
      },
      {
         rating: 79,
         letter: "C+",
         description: "77 - 80",
         color: "#ebcf5e"
      },
      {
         rating: 76,
         letter: "C",
         description: "73 - 77",
         color: "#ebcf5e"
      },
      {
         rating: 72,
         letter: "C-",
         description: "70 - 73",
         color: "#ebcf5e"
      },
      {
         rating: 69,
         letter: "D+",
         description: "67 - 70",
         color: "#f4745e"
      },
      {
         rating: 66,
         letter: "D",
         description: "60 - 67",
         color: "#f4745e"
      },

      {
         rating: 55,
         letter: "F",
         description: "Less than 60",
         color: "#db4c42"
      }
   ];

   const dataType =
      contentType === POST_TYPE_COMMENTARY
         ? "rate_commentary"
         : contentType === POST_TYPE_QUOTE
         ? "rate_quote"
         : "rate_thought";
   const handleRating = async (variables: TrateContent) => {
      cta.handleCloseModal();
      try {
         const { data } = await rateContent(variables, contentType);
         if (data && data[dataType]) {
            cta.handleRating(variables.rating, data[dataType].status);
         }
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <>
         <PrimaryMenuBkg title='Rate content' color='1' cta={{ handleClose: cta.handleCloseModal }}>
            {menuOptions.map((option, index) => (
               <div className={styles.menuOption} key={index}>
                  <MenuPrimaryOption
                     textType='text'
                     iconType='text'
                     optionProperties={{
                        icon: option.letter,
                        iconShadow: option.color,
                        text: option.description
                     }}
                     cta={{
                        handleOptionClick: () =>
                           handleRating({
                              rating: option.rating,
                              USER_ID: userId,
                              POST_ID: postId
                           })
                     }}
                  />
               </div>
            ))}
         </PrimaryMenuBkg>
      </>
   );
};
