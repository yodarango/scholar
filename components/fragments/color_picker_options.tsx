import styles from "./color_picker_options.module.css";

// data
import { higlighterColorPicker, folderColors } from "../../data/color_picker";
import { GradientBackground } from "./buttons/gradient_background";

type TColorPickerOptionsProps = {
   theme?: number;
   cta: {
      handleColorSelection: (color: string | { light: string; dark: string }, ID: number) => void;
   };
};
export const ColorPickerOptions = ({ cta, theme = 1 }: TColorPickerOptionsProps) => {
   const whichTheme = theme === 1 ? higlighterColorPicker : folderColors;
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.noBkg}>
            <GradientBackground
               bkgSolid='transparent'
               cta={{
                  handleSelection: (color: string | { light: string; dark: string }) =>
                     cta.handleColorSelection("transparent", -1)
               }}
            />
         </div>
         {whichTheme.map((cSchema, index: number) => (
            <div className={styles.color} key={index}>
               <GradientBackground
                  bkgSolid={cSchema.bkgColor}
                  cta={{
                     handleSelection: (color: string | { light: string; dark: string }) =>
                        cta.handleColorSelection(color, cSchema.ID)
                  }}
               />
            </div>
         ))}
      </div>
   );
};
