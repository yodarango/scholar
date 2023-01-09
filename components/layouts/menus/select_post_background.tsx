import Link from "next/link";

// comps
import { GradientBackgroundOption } from "../../fragments/buttons/menu_options/gradient_background_option";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectProfileOptionsProps = {
   cta: {
      handleCloseModal: () => void;
      handleValue: (background: string | { light: string; dark: string }) => void;
   };
};

export const SelectPostBackground = ({ cta }: TSelectProfileOptionsProps) => {
   const menuOptions = [
      {
         text: "October sunset",
         background: "quote-bkg--1"
      },
      { text: "Summer evening", background: "quote-bkg--2" },
      { text: "January", background: "quote-bkg--3" },
      {
         text: "Icy heat",
         background: "quote-bkg--4"
      },
      {
         text: "Cotton candy",
         background: "quote-bkg--5"
      },
      {
         text: "Green apple",
         background: "quote-bkg--6"
      },
      {
         text: "Charcoal",
         background: "quote-bkg--7"
      },
      {
         text: "Walnut wood",
         background: "quote-bkg--8"
      },
      {
         text: "Cherry berry",
         background: "quote-bkg--9"
      },
      {
         text: "Monterry",
         background: "quote-bkg--10"
      },
      {
         text: "Polar bear",
         background: "quote-bkg--11"
      },
      {
         text: "Green tea",
         background: "quote-bkg--12"
      },
      {
         text: "Rose lemonade",
         background: "quote-bkg--13"
      },
      { text: "Snow Wolf", background: "quote-bkg--14" },
      {
         text: "Tangerinee",
         background: "quote-bkg--15"
      },
      {
         text: "Techy",
         background: "quote-bkg--16"
      },
      {
         text: "Atlantic",
         background: "quote-bkg--17"
      },
      {
         text: "Lime rickey",
         background: "quote-bkg--18"
      },
      {
         text: "Pink pony",
         background: "quote-bkg--19"
      },
      {
         text: "Pastel canvas",
         background: "quote-bkg--20"
      }
   ];

   return (
      <PrimaryMenuBkg color='1' cta={{ handleClose: cta.handleCloseModal }}>
         {menuOptions.map((option, index) => (
            <div className={styles.menuOption} key={index}>
               {option.background && (
                  <GradientBackgroundOption
                     text={option.text}
                     background={option.background}
                     cta={{ handleClick: () => cta.handleValue(option.background) }}
                  />
               )}
            </div>
         ))}
      </PrimaryMenuBkg>
   );
};
