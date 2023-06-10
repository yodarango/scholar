import React, { useEffect, useState } from "react";
import styles from "./privacy_settings.module.css";
import { RadioPrimary } from "../../fragments/inputs/radio_primary";
import { Notification } from "../../fragments/popups/notification";
import Portal from "../../hoc/potal";
import { notificationMessages } from "../../../data/notification_messages";
import { FourthStackHeader } from "../../layouts/stacks/headers/fourth_stack_header";
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { ChangeSignature } from "../../layouts/account/settings/change_signature";
import { Primary } from "../../fragments/buttons/primary";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";
import {
   getUserPrivacySettings,
   handleUpdatePrivacySettings
} from "../../../helpers/functions/users/user_settings";

type PrivacySettingsProps = {
   onGoBack: () => void;
};

export const PrivacySettings = ({ onGoBack }: PrivacySettingsProps) => {
   const [privacySettings, setPrivacySettings] = useState<any>({
      first_name: "",
      last_name: "",
      birt_hdate: "",
      gender: ""
   });
   const [notification, setnotification] = useState<string | null>(null);
   const [loading, setloaading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await getUserPrivacySettings();
         console.log(data);
         setPrivacySettings(data);
         setloaading(status);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getData();
   }, []);

   // handle the saving
   const handleSave = async () => {
      try {
         const { data } = await handleUpdatePrivacySettings(generalSettings);
         if (data) {
            setnotification("2");
         } else {
            setnotification("4");
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         {notification && (
            <Portal>
               <Notification
                  title={notificationMessages.settingsSaved.title}
                  body={notificationMessages.settingsSaved.body}
                  type={notification}
                  cta={{ handleClose: () => setnotification(null) }}
               />
            </Portal>
         )}

         <FourthStackHeader title='General' actionName='Back' cta={{ handleClose: onGoBack }} />
         {loading === "done" && (
            <>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setPrivacySettings({ ...privacySettings, first_name: value })
                     }}
                     maxL={150}
                     placeholder='First name'
                     type='text'
                     value={privacySettings.first_name}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setPrivacySettings({ ...privacySettings, last_name: value })
                     }}
                     maxL={150}
                     placeholder='Last name'
                     type='text'
                     value={privacySettings.last_name}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setPrivacySettings({ ...privacySettings, birth: value })
                     }}
                     maxL={150}
                     placeholder='Birth date'
                     type='date'
                     value={privacySettings.birth_date}
                  />
               </div>
               <div className={`${styles.field} ${styles.fieldRadio}`}>
                  <RadioPrimary
                     icon={{ primary: "male", secondary: "female" }}
                     text={{ primary: "Male", secondary: "Female" }}
                     cta={{
                        handleOptionSelection: (gender: number) =>
                           setPrivacySettings({
                              ...privacySettings,
                              gender: gender === 0 ? false : true
                           })
                     }}
                  />
               </div>
               <div className={styles.field}>
                  <ChangeSignature
                     signature={privacySettings.signature}
                     cta={{
                        updateSignature: (email) => {}
                     }}
                  />
               </div>
               <div className={styles.field}>
                  <ChangeSignature
                     signature={privacySettings.signature}
                     cta={{
                        updateSignature: (password) => {}
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
