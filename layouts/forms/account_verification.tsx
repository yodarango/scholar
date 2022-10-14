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
import styles from "./account_verification.module.css";

// data
import { errorMessages } from "../../data/error_messages";
const incorrectCode = errorMessages.forms.wrongVerificationCode;
const unknown = errorMessages.unknown.a;

export const AccountVerificationForm = () => {
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
      console.log(code);

      //   try {
      //      setloader(true);
      //      const { data } = await client.mutate({
      //         mutation: VERIFY_ACCOUNT,
      //         variables: {
      //            verification_code: code
      //         }
      //      });
      //      if (data.verify_account && data.verify_account.__typename === "NewSession") {
      //         console.log(data.verify_account);

      //         const today = Date.now();
      //         const expTime = new Date(today + 1209600000);

      //         document.cookie = `authorization=${data.verify_account.token}; expires=${expTime}; path=/`;

      //         location.href = "/account_verification";
      //      } else if (data.verify_account.__typename === "IncorrectVerificatoinCode") {
      //         setloader(false);
      //         updateNotification(incorrectCode.body, "4", incorrectCode.title);
      //      } else {
      //         setloader(false);
      //         updateNotification(unknown.body, "4", unknown.title);
      //      }
      //   } catch (error) {
      //      console.log(error);
      //   }
   };

   return (
      <div className={styles.mainWrapper}>
         <Portal>{notification}</Portal>
         <form>
            <div className={styles.input}>
               <InputPrimary
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
                     type='1'
                     title='Verify'
                     cta={{ handleClick: handleFormUpload }}
                  />
               </div>
            )}
            {loader && <SmallLoader />}
            <InternalLink type='2' size='main' href='/register'>
               Back to registration
            </InternalLink>
         </form>
      </div>
   );
};
