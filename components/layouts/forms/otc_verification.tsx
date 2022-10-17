/**************************************************************************************** 
-  handles the verification of a one time pass code
****************************************************************************************/
import { useState } from "react";

// graphQL
import client from "../../apollo-client";
import { VERIFY_ACCOUNT } from "../../graphql/users/new_user";

// comps
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { Notification } from "../../fragments/popups/notification";
import { InternalLink } from "../../fragments/Typography/internal_link";
import { Primary } from "../../fragments/buttons/primary";
import { SmallLoader } from "../../fragments/chunks/small_loader";
import Portal from "../../hoc/potal";

// styles
import styles from "./otc_verification.module.css";

// data
import { errorMessages } from "../../data/error_messages";
const incorrectCode = errorMessages.account.wrongVerificationCode;
const unknown = errorMessages.unknown.a;
const emptyCode = errorMessages.forms.missingCode;

type TAccountVerificationFormProps = {
   redirect?: string;
   cta?: {
      handleResult: (result: number) => void;
   };
};

export const OTCVerification = ({ redirect = "register", cta }: TAccountVerificationFormProps) => {
   const [code, setcode] = useState<string>("");
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

   // send the code
   const handleFormUpload = async () => {
      // send code

      if (code) {
         cta?.handleResult(1);
         try {
            setloader(true);
            const { data } = await client.mutate({
               mutation: VERIFY_ACCOUNT,
               variables: {
                  verification_code: code
               }
            });
            if (data.verify_account && data.verify_account.__typename === "NewSession") {
               console.log(data.verify_account);

               const today = Date.now();
               const expTime = new Date(today + 1209600000);

               document.cookie = `authorization=${data.verify_account.token}; expires=${expTime}; path=/`;

               location.href = "/account_verification";
            } else if (data.verify_account.__typename === "IncorrectVerificatoinCode") {
               setloader(false);
               updateNotification(incorrectCode.body, "4", incorrectCode.title);
            } else {
               setloader(false);
               updateNotification(unknown.body, "4", unknown.title);
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         updateNotification(emptyCode.body, "4", emptyCode.title);
      }
   };

   // ----------- OR ---------------
   // check the code
   //? this is handled in the Account verification modal noe
   //    const checkCode = async () => {
   //       if (codeInput.current?.value != "" || !codeInput.current?.value) {
   //          try {
   //             const { data } = await client.mutate({
   //                mutation: VERIFY_FORGOTTEN_PASSWORD_CODE,
   //                variables: { verification_code: codeInput.current?.value }
   //             });

   //             console.log("verification_code", data);

   //             if (data.forgotten_password_code === 0) {
   //                setNotificationPopUp(
   //                   <NotificationPopup
   //                      closeModal={() => setNotificationPopUp(false)}
   //                      title='Wrong Code ❌'
   //                      contentString={`The code you entered is incorrect or has expired, please try again!`}
   //                      newClass='notification-wrapper--Error'
   //                   />
   //                );
   //             } else if (data.forgotten_password_code > 0) {
   //                setVerificationStepsState(2);
   //                setUserIDState(data.forgotten_password_code);
   //             }
   //          } catch (error) {
   //             console.log(error);
   //          }
   //       }
   //    };

   return (
      <div className={styles.mainWrapper}>
         <Portal>{notification}</Portal>
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
            {!loader && (
               <div className={styles.button}>
                  <Primary
                     htmlType='button'
                     type='2'
                     title='Verify'
                     cta={{ handleClick: handleFormUpload }}
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
