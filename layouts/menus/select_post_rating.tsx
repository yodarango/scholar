import { MenuPrimaryOption } from "../../fragments/buttons/menu_primary_option";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";
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
         color: ""
      },
      {
         rating: 97,
         letter: "A",
         description: "94 - 97",
         color: ""
      },
      {
         rating: 94,
         letter: "A-",
         description: "90 - 94",
         color: ""
      },
      {
         rating: 90,
         letter: "B+",
         description: "87 - 90",
         color: ""
      },
      {
         rating: 87,
         letter: "B",
         description: "83 - 87",
         color: ""
      },
      {
         rating: 83,
         letter: "B-",
         description: "80 - 83",
         color: ""
      },
      {
         rating: 80,
         letter: "C+",
         description: "77 - 80",
         color: ""
      },
      {
         rating: 77,
         letter: "C",
         description: "73 - 77",
         color: ""
      },
      {
         rating: 73,
         letter: "C-",
         description: "70 - 73",
         color: ""
      },
      {
         rating: 70,
         letter: "D+",
         description: "67 - 70",
         color: ""
      },
      {
         rating: 67,
         letter: "D",
         description: "60 - 67",
         color: ""
      },

      {
         rating: 55,
         letter: "F",
         description: "Less than 60",
         color: ""
      }
   ];
   return (
      <>
         <PrimaryMenuBkg
            title='Rate content'
            color='1'
            cta={cta.handleCloseModal}
            content={menuOptions.map((option, index) => (
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
            ))}
         />
      </>
   );
};
