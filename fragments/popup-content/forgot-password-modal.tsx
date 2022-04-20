// core
import { useRef, useState } from "react";

// graphQL
import client from "../../apollo-client";
import {
   VERIFY_EMAIL_EXISTS,
   VERIFY_FORGOTTEN_PASSWORD_CODE,
   PASSWORD_RECOVERY_NEW
} from "../../graphql/users/authenticate_user";

// comps
import NotificationPopup from "../notification-popup";

// styles
import forgotPasswordStyles from "../../styles/fragments/popup-content/ForgotPasswordModal.module.css";

const ForgotPassword = () => {
   // references
   const emailInput = useRef<HTMLInputElement>(null);
   const codeInput = useRef<HTMLInputElement>(null);
   const newPassword = useRef<HTMLInputElement>(null);

   // notifications
   const [notificationPopUp, setNotificationPopUp] = useState<boolean | JSX.Element>();
   const [verificationStepsState, setVerificationStepsState] = useState<Number>(0);

   // ================= FUNCTION: check that the email entered exists
   const checkEmail = async () => {
      if (emailInput.current?.value != "" || !emailInput.current?.value) {
         try {
            const { data } = await client.mutate({
               mutation: VERIFY_EMAIL_EXISTS,
               variables: { email: emailInput.current?.value }
            });

            console.log(data);

            if (data.verify_email_exists === 0) {
               setNotificationPopUp(
                  <NotificationPopup
                     title='Email Not Found '
                     closeModal={() => setNotificationPopUp(false)}
                     newClass='notification-wrapper--Error'
                     contentString='Sorry! the email addess provided was not found 🔎. Please try again'
                  />
               );
            } else if (data.verify_email_exists > 0) {
               setVerificationStepsState(1);
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   // ============= FUNCTION 2: Proceed if the email passed verification
   const checkCode = async () => {
      if (codeInput.current?.value != "" || !codeInput.current?.value) {
         try {
            const { data } = await client.mutate({
               mutation: VERIFY_FORGOTTEN_PASSWORD_CODE,
               variables: { verification_code: codeInput.current?.value }
            });

            console.log("verification_code", data);

            if (data.forgotten_password_code === 0) {
               setNotificationPopUp(
                  <NotificationPopup
                     closeModal={() => setNotificationPopUp(false)}
                     title='Wrong Code 🖩'
                     contentString={`The code you entered is incorrect or has expired, please try again!`}
                     newClass='notification-wrapper--Error'
                  />
               );
            } else if (data.forgotten_password_code > 0) {
               setVerificationStepsState(2);
               setUserIDState(data.forgotten_password_code);
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   const [userIDState, setUserIDState] = useState<number>(0);
   const updatePassword = async () => {
      if (newPassword.current?.value != "" || !newPassword.current?.value) {
         try {
            const { data } = await client.mutate({
               mutation: PASSWORD_RECOVERY_NEW,
               variables: { new_password: newPassword.current?.value, USER_ID: userIDState }
            });

            console.log(data);

            if (data.recover_password === false) {
               setNotificationPopUp(
                  <NotificationPopup
                     closeModal={() => setNotificationPopUp(false)}
                     title='Oh no! 😔'
                     contentString={`something went worng we were unable to update your passowrd, please try again later!`}
                     newClass='notification-wrapper--Error'
                  />
               );
            } else if (data.forgotten_password_code > 0) {
               setVerificationStepsState(2);
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   return (
      <div className={forgotPasswordStyles.mainWrapper}>
         {notificationPopUp}
         <div>
            <div className='x-large-spacer'></div>
            {/* ----------------- verify that the email exists ------------ */}
            {verificationStepsState === 0 && (
               <div className={forgotPasswordStyles.inputWrapper}>
                  <label htmlFor='password'>Enter your email</label>
                  <input
                     id='email'
                     type='email'
                     maxLength={70}
                     className={`std-input`}
                     ref={emailInput}
                  />
               </div>
            )}
            {verificationStepsState === 0 && (
               <div className={forgotPasswordStyles.inputWrapper}>
                  <button className={`std-button`} onClick={checkEmail}>
                     <p className={`std-button_gradient-text`}>Enter</p>
                  </button>
               </div>
            )}

            {/* ---------------- enter the email code ---------------- */}
            {verificationStepsState === 1 && (
               <p> A verification code was sent to the email provided! ✉️</p>
            )}
            {verificationStepsState === 1 && (
               <div>
                  <label htmlFor='password'>Enter the verification code</label>
                  <input
                     id='verification_code'
                     type='text'
                     maxLength={70}
                     className={`std-input`}
                     ref={codeInput}
                  />
               </div>
            )}

            {verificationStepsState === 1 && (
               <div className={forgotPasswordStyles.inputWrapper}>
                  <button className={`std-button`} onClick={checkCode}>
                     <p className={`std-button_gradient-text`}>Enter</p>
                  </button>
               </div>
            )}

            {/* ---------------- enter your new password ---------------- */}
            {verificationStepsState === 2 && (
               <>
                  <div>
                     <label htmlFor='password'>Enter your New Password</label>
                     <input
                        id='verification_code'
                        type='text'
                        maxLength={70}
                        className={`std-input`}
                        ref={newPassword}
                     />
                  </div>
               </>
            )}

            {verificationStepsState === 2 && (
               <div className={forgotPasswordStyles.inputWrapper}>
                  <button className={`std-button`} onClick={updatePassword}>
                     <p className={`std-button_gradient-text`}>Enter</p>
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default ForgotPassword;
