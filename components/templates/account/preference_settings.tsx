import React, { useEffect, useState } from "react";
import styles from "./preference_settings.module.css";
import { RadioPrimary } from "../../fragments/inputs/radio_primary";
import { Notification } from "../../fragments/popups/notification";
import Portal from "../../hoc/potal";
import { notificationMessages } from "../../../data/notification_messages";
import { FourthStackHeader } from "../../layouts/stacks/headers/fourth_stack_header";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";
import {
   getUserPreferenceSettings,
   handleUpdatePreferencesSettings,
   handleUpdatePrivacySettings
} from "../../../helpers/functions/users/user_settings";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Primary } from "../../fragments/buttons/primary";
import { errorMessages } from "../../../data/error_messages";

type PrivacySettingsProps = {
   onGoBack: () => void;
};

export const PreferenceSettings = ({ onGoBack }: PrivacySettingsProps) => {
   const [preferenceSettings, setPreferenceSettings] = useState<any>({
      is_Bible_public: false
   });
   const [notification, setnotification] = useState<any | null>(null);
   const [loading, setloaading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await getUserPreferenceSettings();
         if (data) {
            setPreferenceSettings(data);
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
         const { data } = await handleUpdatePreferencesSettings(preferenceSettings);

         if (data) {
            setnotification({
               title: notificationMessages.settingsSaved.title,
               body: notificationMessages.settingsSaved.body,
               type: "2"
            });
         } else {
            setnotification({
               title: errorMessages.unknown.a.title,
               body: errorMessages.unknown.a.body,
               type: "4"
            });
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
                  title={notification.title}
                  body={notification.body}
                  type={notification.type}
                  cta={{ handleClose: () => setnotification(null) }}
               />
            </Portal>
         )}

         <FourthStackHeader title='Privacy' actionName='Back' cta={{ handleClose: onGoBack }} />
         {loading === "done" && (
            <>
               <div className={`${styles.field} ${styles.fieldRadio}`}>
                  <Parragraph text='Make Bible public' size='main' />
                  <RadioPrimary
                     icon={{ primary: "close", secondary: "checkmark" }}
                     text={{ primary: "Off", secondary: "On" }}
                     type={{
                        first: preferenceSettings?.is_Bible_public === false ? "2" : "1",
                        second: preferenceSettings?.is_Bible_public === false ? "1" : "2"
                     }}
                     cta={{
                        handleOptionSelection: (privacy: number) => {
                           console.log(privacy);
                           setPreferenceSettings({
                              ...preferenceSettings,
                              is_Bible_public: privacy === 0 ? false : true
                           });
                        }
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
