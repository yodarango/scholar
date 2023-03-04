/**************************************************************************************** 
-   Displays and handles updating the general settings of a user 
****************************************************************************************/

import { useEffect, useState } from "react";

// components
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { SelectTrueColorPersonality } from "../../fragments/inputs/select_true_color_personality";
import { Primary } from "../../fragments/buttons/primary";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ChangeAvatar } from "../../layouts/account/settings/change_avatar";
import { ChangeSignature } from "../../layouts/account/settings/change_signature";
import { FourthStackHeader } from "../../layouts/stacks/headers/fourth_stack_header";

// styles
import styles from "./general_settings.module.css";

// helpers
import {
   getUserGeneralSettings,
   handleUpdateSettings,
   ThandleUpdateSettings
} from "../../../helpers/functions/users/user_settings";

const settingsDefaults: ThandleUpdateSettings = {
   my_true_color_personality_test: "",
   my_favorite_verse: "",
   my_favorite_color: "",
   authority_level: 0,
   my_ministry: "",
   signature: "",
   my_church: "",
   avatar: "",
   my_job: ""
};

export const GeneralSettings = () => {
   // state
   const [generalSettings, setgeneralSettings] = useState<ThandleUpdateSettings>(settingsDefaults);
   const [loading, setloaading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await getUserGeneralSettings();
         setgeneralSettings(data);
         setloaading(status);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getData();
   }, []);

   // handle the saving
   const handleSave = async () => {
      try {
         const data = await handleUpdateSettings(generalSettings);
         console.log(data);
         console.log(generalSettings);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         <FourthStackHeader title='Settings' actionName='Back' link='/users/@me' />
         {loading === "done" && (
            <>
               <div className={styles.avatar}>
                  <ChangeAvatar
                     avatar={generalSettings.avatar}
                     userAuthority={generalSettings.authority_level}
                  />
               </div>
               <div className={styles.signature}>
                  <ChangeSignature signature={generalSettings.signature} />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_church: value })
                     }}
                     maxL={150}
                     placeholder='Church I attend'
                     type='text'
                     value={generalSettings.my_church}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_ministry: value })
                     }}
                     maxL={150}
                     placeholder='My ministry is'
                     type='text'
                     value={generalSettings.my_ministry}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_favorite_verse: value })
                     }}
                     maxL={150}
                     placeholder='Church I attend'
                     type='text'
                     value={generalSettings.my_favorite_verse}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_job: value })
                     }}
                     maxL={150}
                     placeholder='Church I attend'
                     type='text'
                     value={generalSettings.my_job}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_favorite_color: value })
                     }}
                     maxL={150}
                     placeholder='Church I attend'
                     type='text'
                     value={generalSettings.my_favorite_color}
                  />
               </div>
               <div className={styles.colorPersonality}>
                  <SelectTrueColorPersonality
                     label='My true color personality'
                     currColor={generalSettings.my_true_color_personality_test}
                     cta={{
                        handleSelection: (color: string) =>
                           setgeneralSettings({
                              ...generalSettings,
                              my_true_color_personality_test: color
                           })
                     }}
                  />
               </div>
               <div className={styles.button}>
                  <Primary type='1' title='Save' cta={{ handleClick: handleSave }} />
               </div>
            </>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </div>
   );
};
