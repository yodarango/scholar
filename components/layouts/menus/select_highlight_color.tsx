/**************************************************************************************** 
-  returns an array of different predefined colors that onclick will return the value of 
    the color selected.
-   useful for setting background colors and highlighting text
 ****************************************************************************************/

// components
import { ColorPickerOptions } from "../../fragments/color_picker_options";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

type TSelectHighlightColorProps = {
   cta: {
      handleClose: () => void;
      handleColorSelection: (color: string | { light: string; dark: string }, ID: string) => void;
   };
};
export const SelectHighlightColor = ({ cta }: TSelectHighlightColorProps) => {
   return (
      <PrimaryMenuBkg cta={{ handleClose: cta.handleClose }} color='1' title='Select color'>
         <ColorPickerOptions cta={{ handleColorSelection: cta.handleColorSelection }} />
      </PrimaryMenuBkg>
   );
};
