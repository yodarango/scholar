// comps
import { GradientBackground } from "../buttons/gradient_background";
import { Parragraph } from "../Typography/parragraph";

//styles
import styles from "./background_selection.module.css";

type TBackgroundSelectionProps = {
   backgroundCustom?: {
      light: string;
      dark: string;
   };
   background?: string;
   cta: {
      handleSelection: (background: string | { light: string; dark: string }) => void;
   };
};

export const BackgroundSelection = ({
   background,
   backgroundCustom,
   cta
}: TBackgroundSelectionProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.text}>
            <Parragraph text='Background' quiet={true} size='xsmall' bold={true} />
         </div>
         <div className={styles.button}>
            <GradientBackground
               background={background}
               backgroundCustom={backgroundCustom}
               cta={{ handleSelection: cta.handleSelection }}
            />
         </div>
      </div>
   );
};
