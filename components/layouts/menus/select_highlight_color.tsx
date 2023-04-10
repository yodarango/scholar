/**************************************************************************************** 
-  returns an array of different predefined colors that onclick will return the value of 
    the color selected.
-   useful for setting background colors and highlighting text
 ****************************************************************************************/

// components
import { ColorPickerOptions } from "../../fragments/color_picker_options";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

type TSelectHighlightColorProps = {
   theme?: number;
   cta: {
      handleClose: () => void;
      handleColorSelection: (color: string | { light: string; dark: string }, ID: number) => void;
   };
};
export const SelectHighlightColor = ({ cta, theme = 1 }: TSelectHighlightColorProps) => {
   return (
      <PrimaryMenuBkg cta={{ handleClose: cta.handleClose }} color='secondary' title='Select color'>
         <ColorPickerOptions
            theme={theme}
            cta={{ handleColorSelection: cta.handleColorSelection }}
         />
      </PrimaryMenuBkg>
   );
};
