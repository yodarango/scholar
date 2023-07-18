// comps
import { Parragraph } from "../../Typography/parragraph";
import { GradientBackground } from "../gradient_background";

// styles
import styles from "./gradient_background_option.module.css";

type TGradientBackgroundOptionProps = {
   background?: string;
   text: string;
   backgroundCustom?: {
      light: string;
      dark: string;
   };
   cta: {
      handleClick: (background: string | { light: string; dark: string }) => void;
   };
};
export const GradientBackgroundOption = ({
   backgroundCustom,
   background,
   cta,
   text
}: TGradientBackgroundOptionProps) => {
   return (
      <>
         {background && (
            <div className={styles.mainWrapper} onClick={() => cta.handleClick(background)}>
               <div className={styles.option}>
                  <GradientBackground background={background} cta={{ handleSelection: () => {} }} />
               </div>
               <div className={styles.text}>
                  <Parragraph text={text} size='main' />
               </div>
            </div>
         )}
         {backgroundCustom && (
            <div className={styles.mainWrapper} onClick={() => cta.handleClick(backgroundCustom)}>
               <div className={styles.option}>
                  <GradientBackground
                     backgroundCustom={backgroundCustom}
                     cta={{ handleSelection: () => {} }}
                  />
               </div>
               <div className={styles.text}>
                  <Parragraph text={text} size='main' />
               </div>
            </div>
         )}
      </>
   );
};
