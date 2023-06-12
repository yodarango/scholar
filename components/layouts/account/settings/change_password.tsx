// TODO: This and change password and change signature are basically the same thing.
// Refactor them into one component
/**************************************************************************************** 
-   Updates the user's signature
****************************************************************************************/
import { useState } from "react";
import { errorMessages } from "../../../../data/error_messages";
import { handleUpdateEmail } from "../../../../helpers/functions/users/user_settings";
import { Primary } from "../../../fragments/buttons/primary";

// components
import { SettingsFieldButton } from "../../../fragments/buttons/settings_field_button";
import { InputPrimary } from "../../../fragments/inputs/input_primary";
import { Notification } from "../../../fragments/popups/notification";
import Portal from "../../../hoc/potal";
import { FourthStack } from "../../stacks/templates/fourth_stack";

// styles
import styles from "./change_signature.module.css";
import { changePassword } from "../../../../helpers/functions/auth/forgot_password";
import { notificationMessages } from "../../../../data/notification_messages";

type TChangePasswordProps = {
   cta?: {
      updateSignature: (signature: string) => void;
   };
};

export const ChangePasswordFromLogin = ({ cta }: TChangePasswordProps) => {
   // state
   const [showModal, setshowModal] = useState<boolean>(false);
   const [newPassword, setNewPassword] = useState<string>("");
   const [currPassword, setCurrPassword] = useState<string>("");
   const [loading, setloading] = useState<string>("done");
   const [notification, setnotification] = useState<{
      title: string;
      body: string;
      type: string;
   } | null>(null);

   // update the signature
   const handeUpdatePassword = async () => {
      setloading("loading");
      try {
         const data = await changePassword(newPassword, undefined, currPassword);

         if (data) {
            setnotification({
               title: notificationMessages.passwordSaved.title,
               body: notificationMessages.passwordSaved.body,
               type: "2"
            });
         } else {
            setnotification({
               title: errorMessages.account.passwordIsIncorrect.title,
               body: errorMessages.account.passwordIsIncorrect.body,
               type: "4"
            });
         }
         setloading("done");
      } catch (error: any) {
         setnotification({
            title: errorMessages.account.unableToUpdatePassword.title,
            body: errorMessages.account.unableToUpdatePassword.body,
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
                  title='Change Password'
                  cta={{ handleClose: () => setshowModal(false) }}>
                  <div className={styles.mainWrapper}>
                     <div className={styles.input}>
                        <InputPrimary
                           maxL={80}
                           placeholder='Enter your current password'
                           type='text'
                           cta={{ handleValue: (value: string) => setCurrPassword(value) }}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputPrimary
                           maxL={80}
                           placeholder='Enter your new password'
                           type='text'
                           cta={{ handleValue: (value: string) => setNewPassword(value) }}
                        />
                     </div>

                     <div className={styles.button}>
                        <Primary
                           type='1'
                           title='Update'
                           disabled={loading === "loading"}
                           cta={{ handleClick: handeUpdatePassword }}
                        />
                     </div>
                  </div>
               </FourthStack>
            )}
         </Portal>
         <SettingsFieldButton
            label='Password'
            value={"****"}
            cta={{ handleClick: () => setshowModal(true) }}
         />
      </>
   );
};
