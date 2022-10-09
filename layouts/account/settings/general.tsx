/**************************************************************************************** 
-   Displays and handles updating the general settings of a user 
****************************************************************************************/

import { useEffect, useState } from "react";

// components
import { InputPrimary } from "../../../fragments/inputs/input_primary";
import { SelectTrueColorPersonality } from "../../../fragments/inputs/select_true_color_personality";
import { Primary } from "../../../fragments/buttons/primary";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";
import { RoundLoader } from "../../../fragments/chunks/round_loader";

// styles
import styles from "./general.module.css";
import { ChangeSignature } from "./change_signature";

export const General = () => {
   // state
   const [loading, setloaading] = useState<string>("loading");
   const [generalSettings, setgeneralSettings] = useState({
      signature: "",
      my_church: "",
      my_ministry: "",
      my_favorite_verse: "",
      my_job: "",
      my_favorite_color: "",
      my_color_personality: ""
   });

   useEffect(() => {
      setTimeout(() => {
         setgeneralSettings({
            signature: "",
            my_church: "Fac Maryville",
            my_ministry: "Anything",
            my_favorite_verse: "1 Peter 1:8",
            my_job: "Slave",
            my_favorite_color: "Gray",
            my_color_personality: "green"
         });
         setloaading("done");
      }, 3000);
   }, []);

   // handle the saving
   const handleSave = async () => {
      // handle the save here
      console.log(generalSettings);
   };

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <>
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
                     cta={{
                        handleSelection: (color: string) =>
                           setgeneralSettings({ ...generalSettings, my_color_personality: color })
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
