import styles from "./color_picker_options.module.css";

// data
import { higlighterColorPicker } from "../data/color_picker";
import { GradientBackground } from "./buttons/gradient_background";

type TColorPickerOptionsProps = {
   cta: {
      handleColorSelection: (color: string | { light: string; dark: string }, ID: string) => void;
   };
};
export const ColorPickerOptions = ({ cta }: TColorPickerOptionsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.noBkg}>
            <GradientBackground
               bkgSolid='transparent'
               cta={{
                  handleSelection: (color: string | { light: string; dark: string }) =>
                     cta.handleColorSelection("transparent", "-1")
               }}
            />
         </div>
         {higlighterColorPicker.map((cSchema, index: number) => (
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
