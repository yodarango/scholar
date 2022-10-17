/**************************************************************************************** 
-  handles the verification of a one time pass code
****************************************************************************************/
import { useEffect, useRef, useState } from "react";

// graphQL
import client from "../../apollo-client";
import { VERIFY_EMAIL_EXISTS } from "../../graphql/users/authenticate_user";

// comps
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { Notification } from "../../fragments/popups/notification";
import { InternalLink } from "../../fragments/Typography/internal_link";
import { Primary } from "../../fragments/buttons/primary";
import { SmallLoader } from "../../fragments/chunks/small_loader";
import Portal from "../../hoc/potal";

// styles
import styles from "./email_verification.module.css";

// data
import { errorMessages } from "../../data/error_messages";
const emailNotFound = errorMessages.account.emailNotFound;
const unknown = errorMessages.unknown.a;
const emptyEmail = errorMessages.forms.missingEmail;
const invalidEmailAddress = errorMessages.forms.invalidEmailAddress;

// helpers
import { validateEmail } from "../../helpers/input/validate_email";

type TAccountVerificationFormProps = {
   redirect?: string;
   cta?: {
      handleResult: (result: number) => void;
   };
};

export const EmailVerification = ({
   cta,
   redirect = "register"
}: TAccountVerificationFormProps) => {
   const [email, setemail] = useState<string>("");
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

   // verify email
   const handleCheckEmail = async () => {
      //send code
      if (email) {
         const isValidEmail = validateEmail(email);
         if (!isValidEmail) {
            updateNotification(invalidEmailAddress.body, "4", invalidEmailAddress.title);
            return;
         }
         cta?.handleResult(1);
         // try {
         //    const { data } = await client.mutate({
         //       mutation: VERIFY_EMAIL_EXISTS,
         //       variables: { email }
         //    });
         //    if (data.verify_email_exists === 0) {
         //       updateNotification(emailNotFound.body, "4", emailNotFound.title);
         //    } else if (data.verify_email_exists > 0) {
         //       cta?.handleResult(1);
         //    }
         // } catch (error) {
         //    updateNotification(unknown.body, "4", unknown.title);
         //    cta?.handleResult(0);
         //    console.log(error);
         // }
      } else {
         updateNotification(emptyEmail.body, "4", emptyEmail.title);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         <Portal>{notification}</Portal>
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
            {!loader && (
               <div className={styles.button}>
                  <Primary
                     htmlType='button'
                     type='2'
                     title='Enter'
                     cta={{ handleClick: handleCheckEmail }}
                  />
               </div>
            )}
            {loader && <SmallLoader />}
            <div className={styles.link}>
               <InternalLink type='2' size='main' href='/login' align='center'>
                  Back to login page
               </InternalLink>
            </div>
         </form>
      </div>
   );
};
