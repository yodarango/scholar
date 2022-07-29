// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectStarProps = {
   cta: {
      handleCloseModal: () => void;
   };
};

export const SelectStarRating = ({ cta }: TSelectStarProps) => {
   // ---------- menu options
   const menuOptions = [
      {
         rating: 0.5,
         icon: "0.5",
         description: ["|"],
         color: "#F1EAFF"
      },
      {
         rating: 1,
         icon: "1",
         description: ["*"],
         color: "#F1EAFF"
      },
      {
         rating: 1.5,
         icon: "1.5",
         description: ["*", "|"],
         color: "#F1EAFF"
      },
      {
         rating: 2,
         icon: "2",
         description: ["*", "*"],
         color: "#F1EAFF"
      },
      {
         rating: 2.5,
         icon: "2.5",
         description: ["*", "*", "|"],
         color: "#F1EAFF"
      },
      {
         rating: 3,
         icon: "3",
         description: ["*", "*", "*"],
         color: "#F1EAFF"
      },
      {
         rating: 3.5,
         icon: "3.5",
         description: ["*", "*", "*", "|"],
         color: "#F1EAFF"
      },
      {
         rating: 4,
         icon: "4",
         description: ["*", "*", "*", "*"],
         color: "#F1EAFF"
      },
      {
         rating: 4.5,
         icon: "4.5",
         description: ["*", "*", "*", "*", "|"],
         color: "#F1EAFF"
      },
      {
         rating: 5,
         icon: "5",
         description: ["*", "*", "*", "*", "*"],
         color: "#F1EAFF"
      }
   ];

   //  --------------- handle the selection ----------
   const handleReviewSelection = (rating: number) => {
      // send review to db
      console.log(rating);
   };

   return (
      <>
         <PrimaryMenuBkg
            title='Rate content'
            color='1'
            cta={cta.handleCloseModal}
            content={menuOptions.map((option, index) => (
               <div className={styles.menuOption} key={index}>
                  <MenuPrimaryOption
                     textType='jsx'
                     iconType='text'
                     optionProperties={{
                        icon: option.icon,
                        iconShadow: option.color,
                        text: (
                           <div className='flex-row'>
                              {option.description.map((item, index) => (
                                 <div className='flex-row mr-xxs' key={index}>
                                    <Icon
                                       name={item === "*" ? "star" : "halfStar"}
                                       size='2rem'
                                       color={option.color}
                                    />
                                 </div>
                              ))}
                           </div>
                        )
                     }}
                     cta={() => handleReviewSelection(option.rating)}
                  />
               </div>
            ))}
         />
      </>
   );
};
