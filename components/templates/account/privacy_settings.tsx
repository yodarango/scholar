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
import { ResourceNotFound } from "../../common/feedback/resource_not_found";
import {
   getUserPrivacySettings,
   handleUpdatePrivacySettings
} from "../../../helpers/functions/users/user_settings";
import { ChangeEmail } from "../../layouts/account/settings/change_email";
import { ChangePassword } from "../../layouts/forms/change_password";
import { ChangePasswordFromLogin } from "../../layouts/account/settings/change_password";

type PrivacySettingsProps = {
   onGoBack: () => void;
};

export const PrivacySettings = ({ onGoBack }: PrivacySettingsProps) => {
   const [privacySettings, setPrivacySettings] = useState<any>({
      first_name: "",
      last_name: "",
      birth_date: "",
      gender: null
   });
   const [notification, setnotification] = useState<string | null>(null);
   const [loading, setloaading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await getUserPrivacySettings();
         if (data) {
            const date = new Date(parseInt(data?.birth_date));
            // Extract the components of the date
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
            const day = ("0" + date.getDate()).slice(-2);
            const formattedDate = `${year}-${month}-${day}`;

            data.birth_date = formattedDate;
            setPrivacySettings(data);
         }
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
         const { data } = await handleUpdatePrivacySettings(privacySettings);

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

         <FourthStackHeader title='Privacy' actionName='Back' cta={{ handleClose: onGoBack }} />
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
                           setPrivacySettings({ ...privacySettings, birth_date: value })
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
                     type={{
                        first: privacySettings?.gender === 0 ? "1" : "2",
                        second: privacySettings?.gender === 0 ? "2" : "1"
                     }}
                     cta={{
                        handleOptionSelection: (gender: number) =>
                           setPrivacySettings({
                              ...privacySettings,
                              gender: gender === 0 ? 1 : 0
                           })
                     }}
                  />
               </div>
               <div className={styles.field}>
                  <ChangeEmail
                     signature={privacySettings.email}
                     cta={{
                        updateSignature: (email) =>
                           setPrivacySettings({ ...privacySettings, email })
                     }}
                  />
               </div>
               <div className={styles.field}>
                  <ChangePasswordFromLogin />
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
               <ResourceNotFound />
            </div>
         )}
      </div>
   );
};
