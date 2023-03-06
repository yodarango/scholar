/**************************************************************************************** 
-   Updates the user's signature
****************************************************************************************/
import { useState } from "react";
import { errorMessages } from "../../../../data/error_messages";
import { notificationMessages } from "../../../../data/notification_messages";
import { handleUpdateSignature } from "../../../../helpers/functions/users/user_settings";
import { Primary } from "../../../fragments/buttons/primary";

// components
import { SettingsFieldButton } from "../../../fragments/buttons/settings_field_button";
import { InputPrimary } from "../../../fragments/inputs/input_primary";
import { Notification } from "../../../fragments/popups/notification";
import Portal from "../../../hoc/potal";
import { FourthStack } from "../../stacks/templates/fourth_stack";

// styles
import styles from "./change_signature.module.css";

type TChangeUsernameProps = {
   signature: string;
   cta: {
      updateSignature: (signature: string) => void;
   };
};

export const ChangeSignature = ({ signature, cta }: TChangeUsernameProps) => {
   // state
   const [showModal, setshowModal] = useState<boolean>(false);
   const [currSignature, setcurrSignature] = useState<string>("");
   const [loading, setloading] = useState<string>("done");
   const [notification, setnotification] =
      useState<{ title: string; body: string; type: string } | null>(null);

   // update the signature
   const handeUpdateSignature = async () => {
      setloading("loading");
      try {
         const { data } = await handleUpdateSignature(currSignature);

         if (data) {
            setnotification({
               title: notificationMessages.signatureSaved.title,
               body: notificationMessages.signatureSaved.body,
               type: "2"
            });

            cta.updateSignature(data.signature);
         } else {
            setnotification({
               title: errorMessages.account.unableToUpdateSignature.title,
               body: errorMessages.account.unableToUpdateSignature.body,
               type: "4"
            });
            setloading("done");
         }
      } catch (error: any) {
         setnotification({
            title: errorMessages.account.unableToUpdateSignature.title,
            body: errorMessages.account.unableToUpdateSignature.body,
            type: "4"
         });
         setloading("done");

         console.error(error);
      }
   };

   return (
      <>
         {notification && (
            <Portal>
               <Notification
                  title={notification.title}
                  type={notification.type}
                  body={notification.body}
                  cta={{
                     handleClose: () => {
                        setloading("done");
                        setnotification(null);
                     }
                  }}
               />
            </Portal>
         )}
         <Portal>
            {showModal && (
               <FourthStack
                  actionName='Back'
                  title='Change signature'
                  cta={{ handleClose: () => setshowModal(false) }}>
                  <div className={styles.mainWrapper}>
                     <div className={styles.input}>
                        <InputPrimary
                           maxL={80}
                           placeholder='signature'
                           value={signature}
                           type='text'
                           cta={{ handleValue: (value: string) => setcurrSignature(value) }}
                        />
                     </div>

                     <div className={styles.button}>
                        <Primary
                           type='1'
                           title='Update'
                           disabled={loading === "loading"}
                           cta={{ handleClick: handeUpdateSignature }}
                        />
                     </div>
                  </div>
               </FourthStack>
            )}
         </Portal>
         <SettingsFieldButton
            label='Signature'
            value={signature}
            cta={{ handleClick: () => setshowModal(true) }}
         />
      </>
   );
};
