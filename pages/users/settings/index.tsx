import { useState } from "react";
import { GeneralSettings } from "../../../components/templates/account/general_settings";
import {
   GENERAL_SECTION,
   PREFERENCES_SECTION,
   PRIVACY_SECTION,
   SettingsSections
} from "../../../components/layouts/account/settings/settings_sections";
import styles from "./index.module.css";
import { Header } from "../../../components/fragments/Typography/header";
import Privacy from "../../privacy";
import { PrivacySettings } from "../../../components/templates/account/privacy_settings";
import { BackLink } from "../../../components/fragments/buttons/back_link";
import { PreferenceSettings } from "../../../components/templates/account/preference_settings";
import Head from "next/head";
import HeadContent from "../../../SEO/head_content";

const NO_SECTION_SELECTED = 0;
const Index = () => {
   const [currentSection, setCurrentSection] = useState<number>(NO_SECTION_SELECTED);

   return (
      <div className={styles.mainWrapper}>
         <Head key='settings-page'>
            <HeadContent title='Settings' />
         </Head>
         <div className={styles.header}>
            <Header type={2} text='Settings' size='large' className={styles.title} quiet />
            <BackLink link='/users/@me' iconLeft title='Back' />
         </div>
         {currentSection === GENERAL_SECTION && (
            <GeneralSettings onGoBack={() => setCurrentSection(NO_SECTION_SELECTED)} />
         )}
         {currentSection === PRIVACY_SECTION && (
            <PrivacySettings onGoBack={() => setCurrentSection(NO_SECTION_SELECTED)} />
         )}
         {currentSection === PREFERENCES_SECTION && (
            <PreferenceSettings onGoBack={() => setCurrentSection(NO_SECTION_SELECTED)} />
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
