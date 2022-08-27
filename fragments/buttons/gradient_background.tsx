import { useState } from "react";

// comps
import Portal from "../../hoc/potal";
import { SelectPostBackground } from "../../layouts/menus/select_post_background";

// styles
import styles from "./gradient_background.module.css";

type TGradientBackgroundProps = {
   background?: string;
   backgroundCustom?: {
      light: string;
      dark: string;
   };
   customSize?: boolean;
   cta: {
      handleSelection: (background: string | { light: string; dark: string }) => void;
   };
};
export const GradientBackground = ({
   backgroundCustom,
   background,
   cta,
   customSize
}: TGradientBackgroundProps) => {
   // states
   const [showSelectBackground, setshowSelectBackground] = useState<boolean>(false);

   // close modal and call cb
   const handleSelection = (background: string | { light: string; dark: string }) => {
      setshowSelectBackground(false);
      cta.handleSelection(background);
   };

   return (
      <>
         <Portal>
            {showSelectBackground && (
               <SelectPostBackground
                  cta={{
                     handleCloseModal: () => setshowSelectBackground(false),
                     handleValue: (background) => handleSelection(background)
                  }}
               />
            )}
         </Portal>
         {background && (
            <button
               className={`${customSize ? styles.mainWrapperCustomSize : styles.mainWrapper}`}
               id={background}
               onClick={() => setshowSelectBackground(true)}>
               <span className={styles.shadow} id={background}></span>
            </button>
         )}
         {backgroundCustom && (
            <button
               className={`${customSize ? styles.mainWrapperCustomSize : styles.mainWrapper}`}
               style={{
                  backgroundImage: `linear-gradient(-10deg, ${backgroundCustom.light}, ${backgroundCustom.dark} )`
               }}
               onClick={() => setshowSelectBackground(true)}>
               <span
                  className={styles.shadow}
                  style={{
                     backgroundImage: `background: linear-gradient(-10deg, ${backgroundCustom.light}, ${backgroundCustom.dark} );`
                  }}></span>
            </button>
         )}
      </>
   );
};
