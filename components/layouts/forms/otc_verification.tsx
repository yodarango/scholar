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
import styles from "./otc_verification.module.css";

// data
import { errorMessages } from "../../../data/error_messages";
import { verificationCode } from "../../../helpers/functions/auth/forgot_password";
const incorrectCode = errorMessages.account.wrongVerificationCode;
const unknown = errorMessages.unknown.a;
const emptyCode = errorMessages.forms.missingCode;

type TAccountVerificationFormProps = {
   redirect?: string;
   cta?: {
      handleResult: (result: number, userId: number) => void;
   };
};

export const OTCVerification = ({ redirect = "register", cta }: TAccountVerificationFormProps) => {
   const [code, setcode] = useState<string>("");
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

   // send the verification code
   const handleFormUpload = async () => {
      setloading("loading");
      if (code) {
         try {
            const codeIsVerified = await verificationCode(code);

            if (codeIsVerified) cta?.handleResult(2, codeIsVerified);
            else updateNotification(incorrectCode.body, "4", incorrectCode.title);
            setloading("done");
         } catch (error) {
            updateNotification(unknown.body, "4", unknown.title);
            setloading("done");
            return false;
         }
      } else {
         updateNotification(emptyCode.body, "4", emptyCode.title);
         setloading("done");
      }
   };

   return (
      <div className={styles.mainWrapper}>
         {notification}
         <form>
            <div className={styles.input}>
               <InputPrimary
                  bold
                  placeholder='Enter verification code'
                  maxL={6}
                  type='text'
                  cta={{ handleValue: (value: string) => setcode(value) }}
               />
            </div>
            {loading === "done" && (
               <div className={styles.button}>
                  <Primary
                     htmlType='button'
                     type='2'
                     title='Verify'
                     cta={{ handleClick: handleFormUpload }}
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
                  {`Back to ${redirect}`}
               </InternalLink>
            </div>
         </form>
      </div>
   );
};
