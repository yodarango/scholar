// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_options/menu_primary_option";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectPostRatingMenuProps = {
   cta: {
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const SelectPostRatingMenu = ({ cta }: TSelectPostRatingMenuProps) => {
   const menuOptions = [
      {
         rating: 100,
         letter: "A+",
         description: "97 - 100",
         color: "#75d975"
      },
      {
         rating: 97,
         letter: "A",
         description: "94 - 97",
         color: "#75d975"
      },
      {
         rating: 94,
         letter: "A-",
         description: "90 - 94",
         color: "#75d975"
      },
      {
         rating: 90,
         letter: "B+",
         description: "87 - 90",
         color: "#b3eeb3"
      },
      {
         rating: 87,
         letter: "B",
         description: "83 - 87",
         color: "#b3eeb3"
      },
      {
         rating: 83,
         letter: "B-",
         description: "80 - 83",
         color: "#b3eeb3"
      },
      {
         rating: 80,
         letter: "C+",
         description: "77 - 80",
         color: "#ebcf5e"
      },
      {
         rating: 77,
         letter: "C",
         description: "73 - 77",
         color: "#ebcf5e"
      },
      {
         rating: 73,
         letter: "C-",
         description: "70 - 73",
         color: "#ebcf5e"
      },
      {
         rating: 70,
         letter: "D+",
         description: "67 - 70",
         color: "#f4745e"
      },
      {
         rating: 67,
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
   return (
      <>
         <PrimaryMenuBkg
            title='Rate content'
            color='1'
            cta={cta.handleCloseModal}
            content={menuOptions.map((option, index) => (
               <div className={styles.menuOption} key={index}>
                  <MenuPrimaryOption
                     textType='text'
                     iconType='text'
                     optionProperties={{
                        icon: option.letter,
                        iconShadow: option.color,
                        text: option.description
                     }}
                     cta={() => console.log(option.rating)}
                  />
               </div>
            ))}
         />
      </>
   );
};
