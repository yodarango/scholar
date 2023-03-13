/**************************************************************************************** 
-  handles the verification of a one time pass code
****************************************************************************************/
import { useState } from "react";

// graphQL
import { client } from "../../../apollo-client";
import { PASSWORD_RECOVERY_NEW } from "../../../graphql/users/authenticate_user";

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

const unableToUpdate = errorMessages.account.unableToUpdatePassword;
const unknown = errorMessages.unknown.a;
const emptyPassword = errorMessages.forms.missingPassword;

type TAccountVerificationFormProps = {
   redirect?: string;
   USER_ID: string;
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
   const [loader, setloader] = useState<boolean>(false);
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
      if (password) {
         cta?.handleResult(1);
         // try {
         //    const { data } = await client.mutate({
         //       mutation: PASSWORD_RECOVERY_NEW,
         //       variables: { new_password: password, USER_ID: USER_ID }
         //    });

         //    if (data.recover_password === false) {
         //       updateNotification(unableToUpdate.body, "4", unableToUpdate.title);
         //    } else if (data.recover_password === true) {
         //       cta?.handleResult(1);
         //       setloader(false);
         //    }
         // } catch (error) {
         //    console.log(error);
         //    cta?.handleResult(1);
         //    setloader(false);
         // }
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
            {!loader && (
               <div className={styles.button}>
                  <Primary
                     htmlType='button'
                     type='2'
                     title='Update'
                     cta={{ handleClick: updatePassword }}
                  />
               </div>
            )}
            {loader && <SmallLoader />}
            <div className={styles.link}>
               <InternalLink type='2' size='main' href={`/${redirect}`} align='center'>
                  {`Back to ${redirect} page`}
               </InternalLink>
            </div>
         </form>
      </div>
   );
};
