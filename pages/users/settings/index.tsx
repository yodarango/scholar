import { useState } from "react";
import { GeneralSettings } from "../../../components/templates/account/general_settings";
import { GENERAL_SECTION, PRIVACY_SECTION, SettingsSections } from "./components/settings_sections";
import styles from "./index.module.css";
import { Header } from "../../../components/fragments/Typography/header";
import Privacy from "../../privacy";
import { PrivacySettings } from "../../../components/templates/account/privacy_settings";

const NO_SECTION_SELECTED = 0;
const Index = () => {
   const [currentSection, setCurrentSection] = useState<number>(NO_SECTION_SELECTED);

   return (
      <div className={styles.mainWrapper}>
         <Header type={2} text='Settings' size='large' className={styles.title} quiet />
         {currentSection === GENERAL_SECTION && (
            <GeneralSettings onGoBack={() => setCurrentSection(NO_SECTION_SELECTED)} />
         )}
         {currentSection === PRIVACY_SECTION && (
            <PrivacySettings onGoBack={() => setCurrentSection(NO_SECTION_SELECTED)} />
         )}
         {currentSection === NO_SECTION_SELECTED && (
            <SettingsSections
               className={styles.sectionsWrapper}
               onSectionChoice={(section: number) => {
                  setCurrentSection(section);
               }}
            />
         )}
      </div>
   );
};

export default Index;
