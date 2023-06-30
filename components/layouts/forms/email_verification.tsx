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

// styles
import styles from "./email_verification.module.css";

// data
import { errorMessages } from "../../../data/error_messages";
const emailNotFound = errorMessages.account.emailNotFound;
const emptyEmail = errorMessages.forms.missingEmail;
const invalidEmailAddress = errorMessages.forms.invalidEmailAddress;

// helpers
import { validateEmail } from "../../../helpers/input/validate_email";
import { verifyEmail } from "../../../helpers/functions/auth/forgot_password";

type TAccountVerificationFormProps = {
   cta: {
      handleGoBack: () => void;
      handleResult: (result: number) => void;
   };
};

export const EmailVerification = ({ cta }: TAccountVerificationFormProps) => {
   const [email, setemail] = useState<string>("");
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

   // verify email
   const handleCheckEmail = async () => {
      setloading("loading");
      //  send code
      if (email) {
         const isValidEmail = validateEmail(email);
         if (!isValidEmail) {
            updateNotification(invalidEmailAddress.body, "4", invalidEmailAddress.title);
            setloading("done");
            return;
         }

         try {
            const emailExists = await verifyEmail(email);

            if (emailExists) cta.handleResult(1);
            else updateNotification(emailNotFound.body, "4", emailNotFound.title);
            setloading("done");
         } catch (error) {
            setloading("done");
            console.error(error);
         }
      } else {
         setloading("done");
         updateNotification(emptyEmail.body, "4", emptyEmail.title);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         {notification}
         <form>
            <div className={styles.input}>
               <InputPrimary
                  bold
                  placeholder='Enter email'
                  maxL={50}
                  type='email'
                  cta={{
                     handleValue: (email: string) => setemail(email)
                  }}
               />
            </div>
            {loading === "done" && (
               <div className={styles.button}>
                  <Primary
                     htmlType='button'
                     type='2'
                     title='Enter'
                     cta={{ handleClick: handleCheckEmail }}
                  />
               </div>
            )}
            {loading === "loading" && (
               <div className={styles.button}>
                  <SmallLoader />
               </div>
            )}
            <div className={styles.link}>
               <InternalLink
                  type='2'
                  size='main'
                  cta={{ onClick: cta.handleGoBack }}
                  align='center'>
                  Back to login
               </InternalLink>
            </div>
         </form>
      </div>
   );
};
