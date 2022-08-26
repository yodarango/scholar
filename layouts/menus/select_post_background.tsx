import Link from "next/link";

// comps
import { GradientBackgroundOption } from "../../fragments/buttons/menu_options/gradient_background_option";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectProfileOptionsProps = {
   cta: {
      handleCloseModal: () => void;
      handleValue: (value: string) => void;
   };
};

export const SelectPostBackground = ({ cta }: TSelectProfileOptionsProps) => {
   // set cool names for this bkgs for example "wild bear 🐻", "snow wolf 🐺", "cherry lime etc🍒"
   const menuOptions = [
      {
         text: "Background one",
         background: "quote-bkg--1"
      },
      { text: "Background two", background: "quote-bkg--2" },
      { text: "Background one", background: "quote-bkg--3" },
      {
         text: "Background one",
         background: "quote-bkg--4"
      },
      {
         text: "Background one",
         background: "quote-bkg--5"
      },
      {
         text: "Background one",
         background: "quote-bkg--6"
      },
      {
         text: "Background one",
         background: "quote-bkg--7"
      },
      {
         text: "Background one",
         background: "quote-bkg--8"
      },
      {
         text: "Background one",
         background: "quote-bkg--9"
      },
      {
         text: "Background one",
         background: "quote-bkg--10"
      },
      {
         text: "Background one",
         background: "quote-bkg-11"
      },
      {
         text: "Background one",
         background: "quote-bkg--12"
      },
      {
         text: "Background one",
         background: "quote-bkg--13"
      },
      { text: "Background one", background: "quote-bkg--14" },
      {
         text: "Background one",
         background: "quote-bkg--15"
      },
      {
         text: "Background one",
         background: "quote-bkg--16"
      },
      {
         text: "Background one",
         background: "quote-bkg--17"
      },
      {
         text: "Background one",
         background: "quote-bkg--18"
      },
      {
         text: "Background one",
         background: "quote-bkg--19"
      },
      {
         text: "Background one",
         background: "quote-bkg--20"
      }
   ];

   return (
      <>
         <PrimaryMenuBkg
            color='1'
            cta={cta.handleCloseModal}
            content={menuOptions.map((option, index) => (
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
         />
      </>
   );
};
