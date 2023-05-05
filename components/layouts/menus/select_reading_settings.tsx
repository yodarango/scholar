// comps
import React from "react";
import { MenuPrimaryOptionWithSubSelection } from "../../fragments/buttons/menu_options/menu_primary_option_w_sub_selection";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

//styles
import styles from "./select_menu_global.module.css";
import { FONT_COLOR } from "../../../constants/tokens";
import {
   READING_MODAL_1__DARK,
   READING_MODAL_3__MID,
   READING_MODAL_2__DARK
} from "../../../constants/tokens";
import { READING_THEME_BACKGROUNDS } from "../../../constants/defaults";

export type TSelectReadingSettingsProps = {
   themeStyle?: any;
   cta: {
      handleCloseModal: () => void;
      handleFontSelection: (value: string) => void;
      handleThemeSelection: (value: string) => void;
   };
};

export const SelectReadingSettings = ({ cta, themeStyle }: TSelectReadingSettingsProps) => {
   return (
      <PrimaryMenuBkg color='2' title='Settings' cta={{ handleClose: cta.handleCloseModal }}>
         <>
            {/* ------------- font size ------------ */}
            <div className={styles.menuOption} key={1}>
               <MenuPrimaryOptionWithSubSelection
                  type='2'
                  textType='text'
                  iconType='text'
                  customSubSelections={[
                     { value: "main", title: "Default" },
                     { value: "small", title: "Small" },
                     { value: "large", title: "Big" },
                     { value: "xlarge", title: "Bigger" }
                  ]}
                  cta={{ handleSelection: cta.handleFontSelection }}
                  optionProperties={{
                     icon: "A",
                     iconShadow: FONT_COLOR,
                     text: "Font size"
                  }}
               />
            </div>

            {/* ------------- theme ------------ */}
            <div className={styles.menuOption} key={2}>
               <MenuPrimaryOptionWithSubSelection
                  type='3'
                  textType='text'
                  iconType='icon'
                  style={themeStyle}
                  cta={{ handleSelection: cta.handleThemeSelection }}
                  customSubSelections={[
                     { value: "1", title: READING_MODAL_1__DARK },
                     { value: "2", title: READING_MODAL_2__DARK },
                     { value: "3", title: READING_MODAL_3__MID },
                     { value: "4", title: FONT_COLOR },
                     { value: "5", title: `url(${READING_THEME_BACKGROUNDS[1]}) center/cover` },
                     { value: "6", title: `url(${READING_THEME_BACKGROUNDS[2]}) center/cover` },
                     { value: "7", title: `url(${READING_THEME_BACKGROUNDS[3]}) center/cover` },
                     { value: "8", title: `url(${READING_THEME_BACKGROUNDS[4]}) center/cover` },
                     { value: "9", title: `url(${READING_THEME_BACKGROUNDS[5]}) center/cover` }
                  ]}
                  optionProperties={{
                     icon: <Icon color={FONT_COLOR} size='2rem' name='brush' />,
                     iconShadow: FONT_COLOR,
                     text: "Theme"
                  }}
               />
            </div>
         </>
      </PrimaryMenuBkg>
   );
};
