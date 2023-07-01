/**************************************************************************************** 
-  handles the verification of a one time pass code
****************************************************************************************/
import { useState } from "react";

// comps
import { InternalLink } from "../../fragments/Typography/internal_link";
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { Notification } from "../../fragments/popups/notification";
import { SmallLoader } from "../../fragments/chunks/small_loader";
import { Primary } from "../../fragments/buttons/primary";

// styles
import styles from "./otc_verification.module.css";

// data
import { errorMessages } from "../../../data/error_messages";
import { verificationCode } from "../../../helpers/functions/auth/forgot_password";
import { useLogout } from "../../../hooks/use_logout";
import { useSendNewVerificationCode } from "../../../hooks/useSendNewVerificationCode";
import { notificationMessages } from "../../../data/notification_messages";
const incorrectCode = errorMessages.account.wrongVerificationCode;
const unknown = errorMessages.unknown.a;
const emptyCode = errorMessages.forms.missingCode;
const verificationCodeSent = notificationMessages.verificationCodeSent;

type TAccountVerificationFormProps = {
   isForgottenPassword?: boolean;
   includeStartOver?: boolean;
   redirect?: string;
   cta?: {
      handleResult: (result: number, code?: string) => void;
   };
};

export const OTCVerification = ({
   isForgottenPassword = true,
   includeStartOver,
   redirect,
   cta
}: TAccountVerificationFormProps) => {
   const [code, setcode] = useState<string>("");
   const [loading, setloading] = useState<string>("done");
   const [smallLoader, setSmallLoader] = useState<string>("");
   const [notification, setnotification] = useState<boolean | JSX.Element>(false);

   // handle update notification state
   const updateNotification = (body: string, type: string, title: string) =>
      setnotification(
         <Notification
            cta={{ handleClose: () => setnotification(false) }}
            title={title}
            type={type}
            body={body}
         />
      );

   // send the verification code
   const handleFormUpload = async () => {
      setloading("loading");
      if (code) {
         try {
            const codeIsVerified = await verificationCode(code, isForgottenPassword);
            if (codeIsVerified) {
               cta?.handleResult(2, codeIsVerified);
            } else updateNotification(incorrectCode.body, "4", incorrectCode.title);
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

   const handleStartOver = () => {
      useLogout();
      window.location.href = "/register";
   };

   const handleSendNewCode = async () => {
      setSmallLoader("sendNewCode");
      const { data, status, error } = await useSendNewVerificationCode();

      try {
         if (status === "done" && data) {
            updateNotification(verificationCodeSent.body(data), "2", verificationCodeSent.title);
            setSmallLoader("");
         } else if (status === "error") {
            updateNotification(unknown.body, "4", unknown.title);
            setSmallLoader("");
         }
      } catch (error) {
         setSmallLoader("");
         console.log(error);
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
                     disabled={smallLoader === "sendNewCode"}
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
               {redirect && (
                  <InternalLink type='2' size='main' href={`/${redirect}`} align='center'>
                     {`Back to ${redirect}`}
                  </InternalLink>
               )}
            </div>
            {!redirect && smallLoader !== "sendNewCode" && (
               <Primary
                  htmlType='button'
                  type='1'
                  title='Send new code'
                  cta={{ handleClick: handleSendNewCode }}
               />
            )}
            {smallLoader === "sendNewCode" && !redirect && (
               <div className={styles.button}>
                  <SmallLoader />
               </div>
            )}
            {includeStartOver && smallLoader !== "sendNewCode" && (
               <div className={styles.link}>
                  <InternalLink
                     type='2'
                     size='main'
                     cta={{ onClick: handleStartOver }}
                     align='center'>
                     Start over
                  </InternalLink>
               </div>
            )}
         </form>
      </div>
   );
};
