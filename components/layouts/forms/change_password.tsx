/**************************************************************************************** 
-  handles the verification of a one time pass code
****************************************************************************************/
import { useState } from "react";

// comps
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { Notification } from "../../fragments/popups/notification";
import { InternalLink } from "../../fragments/Typography/internal_link";
import { Primary } from "../../fragments/buttons/primary";
import { SmallLoader } from "../../fragments/chunks/small_loader";
import Portal from "../../hoc/potal";

// styles
import styles from "./change_password.module.css";

// data
import { errorMessages } from "../../../data/error_messages";
import { changePassword } from "../../../helpers/functions/auth/forgot_password";

const unableToUpdate = errorMessages.account.unableToUpdatePassword;
const unknown = errorMessages.unknown.a;
const emptyPassword = errorMessages.forms.missingPassword;

type TAccountVerificationFormProps = {
   redirect?: string;
   USER_ID: string | number;
   cta?: {
      handleResult: (result: number) => void;
   };
};

export const ChangePassword = ({
   cta,
   redirect = "register",
   USER_ID
}: TAccountVerificationFormProps) => {
   const [password, setpassword] = useState<string>("");
   const [loading, setloading] = useState<string>("done");
   const [notification, setnotification] = useState<boolean | JSX.Element>(false);

   // handle update notification state
   const updateNotification = (body: string, type: string, title: string) =>
      setnotification(
         <Notification
            type={type}
            body={body}
            title={title}
            cta={{ handleClose: () => setnotification(false) }}
         />
      );

   // update password
   const updatePassword = async () => {
      setloading("loading");

      if (password) {
         try {
            const passwordSet = await changePassword(password, USER_ID);

            if (passwordSet) {
               cta?.handleResult(3);
               setloading("done");
            } else {
               updateNotification(unableToUpdate.body, "4", unableToUpdate.title);
               setloading("done");
            }
         } catch (error) {
            updateNotification(unknown.body, "4", unknown.title);

            setloading("done");
         }
      } else {
         updateNotification(emptyPassword.body, "4", emptyPassword.title);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         <Portal>{notification}</Portal>
         <form>
            <div className={styles.input}>
               <InputPrimary
                  bold
                  placeholder='Enter new password'
                  maxL={50}
                  type='password'
                  cta={{
                     handleValue: (password: string) => setpassword(password)
                  }}
               />
            </div>
            {loading === "done" && (
               <div className={styles.button}>
                  <Primary
                     htmlType='button'
                     type='2'
                     title='Update'
                     cta={{ handleClick: updatePassword }}
                  />
               </div>
            )}
            {loading === "loading" && (
               <div className={styles.button}>
                  <SmallLoader />
               </div>
            )}
            <div className={styles.link}>
               <InternalLink type='2' size='main' href={`/${redirect}`} align='center'>
                  {`Back to ${redirect} page`}
               </InternalLink>
            </div>
         </form>
      </div>
   );
};
