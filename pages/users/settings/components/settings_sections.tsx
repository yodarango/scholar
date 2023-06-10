import React from "react";

import { SettingsFieldButton } from "../../../../components/fragments/buttons/settings_field_button";
import styles from "./settings_sections.module.css";

type SettingsSectionsProps = {
   onSectionChoice: (choice: number) => void;
   className?: string;
};

export const GENERAL_SECTION = 1;
export const PRIVACY_SECTION = 2;
export const PREFERENCES_SECTION = 3;
export const SettingsSections = ({ onSectionChoice, className = "" }: SettingsSectionsProps) => {
   const settingsSections = [
      {
         label: "General",
         action: GENERAL_SECTION
      },
      {
         label: "Privacy",
         action: PRIVACY_SECTION
      },
      {
         label: "Preferences",
         action: PREFERENCES_SECTION
      }
   ];

   return (
      <div className={`${styles.mainWrapper} ${className}`}>
         {settingsSections.map((option: any, index: number) => (
            <SettingsFieldButton
               className={styles.button}
               label={option.label}
               cta={{ handleClick: () => onSectionChoice(option.action) }}
               value={option.value}
               key={index}
            />
         ))}
      </div>
   );
};
