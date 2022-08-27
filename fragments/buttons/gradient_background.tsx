/***********************************************************************************************
 - button reflects color background based on an "background" Prop which is a css id that assigns 
   the color. The user can toggle this value from the SelectPostBackground comp and return the 
   value to the parent. 
-  There is a second option called "backgroundCustom" which is not being used as of now 8/27/22 
   but tha in the future would be cool to implement and allow users to pick colors
************************************************************************************************/
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
   const [backgroundColor, setbackgroundColor] = useState<string | undefined>(background);

   // close modal and call cb
   const handleSelection = (background: string | { light: string; dark: string }) => {
      setshowSelectBackground(false);
      cta.handleSelection(background);

      // check the tag is a string
      if (typeof background === "string") {
         setbackgroundColor(background);
      }
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
               id={backgroundColor}
               onClick={() => setshowSelectBackground(true)}>
               <span className={styles.shadow} id={backgroundColor}></span>
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
