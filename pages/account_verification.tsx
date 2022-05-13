// core
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// graphQL
import client from "../apollo-client";
import { VERIFY_ACCOUNT } from "../graphql/users/new_user";
import { CHECK_IF_USER_LOGGED_IN_AND_VERIFIED } from "../graphql/users/profile";

// child comps
import SmallLoader from "../fragments/chunks/small-loader";
import NotificationPopup from "../fragments/notification-popup";

// styles
import loginStyles from "../styles/pages/Login.module.css";

export default function AccountVerification() {
   // =================== Check if there is a Logged in user and fetch its data ========== /
   const router = useRouter();

   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const checkedIfUserLoggedIn = async () => {
      try {
         const { data } = await client.query({
            query: CHECK_IF_USER_LOGGED_IN_AND_VERIFIED,
            variables: {}
         });

         console.log(data);
         if (
            data.is_user_logged_in_and_verified === "not_logged_in" ||
            data.is_user_logged_in_and_verified === "logged_in_not_confirmed"
         ) {
            setIsLoggedIn(false);
         } else if (data.is_user_logged_in_and_verified === "logged_in_confirmed") {
            router.replace("/users/me");
         } else {
            router.replace("/");
         }
      } catch (error) {
         console.log(error);
         router.replace("/");
      }
   };

   useEffect(() => {
      checkedIfUserLoggedIn();
   }, []);

   // ====================== FUNCTION: Login the user ============================ //
   const verificationCode = useRef<HTMLInputElement>(null);

   const [notificationpopUpState, setNotificationpopUpState] = useState<JSX.Element | boolean>(
      false
   );
   const [smallLoaderState, setSmallLoaderState] = useState<JSX.Element | boolean>(false);
   const hanldeNewUserRegistration = async () => {
      try {
         if (verificationCode.current) {
            setSmallLoaderState(<SmallLoader />);
            const { data } = await client.mutate({
               mutation: VERIFY_ACCOUNT,
               variables: {
                  verification_code: `${verificationCode.current.value}`
               }
            });
            if (data.verify_account && data.verify_account.__typename === "NewSession") {
               console.log(data.verify_account);

               const today = Date.now();
               const expTime = new Date(today + 1209600000);

               document.cookie = `authorization=${data.verify_account.token}; expires=${expTime}; path=/`;

               location.href = "/account_verification";
            } else if (data.verify_account.__typename === "IncorrectVerificatoinCode") {
               setSmallLoaderState(false);
               setNotificationpopUpState(
                  <NotificationPopup
                     closeModal={() => setNotificationpopUpState(false)}
                     title='Wrong Code 🖩'
                     contentString={`${data.verify_account.message}`}
                     newClass='notification-wrapper--Error'
                  />
               );
            } else {
               setSmallLoaderState(false);
               setNotificationpopUpState(
                  <NotificationPopup
                     closeModal={() => setNotificationpopUpState(false)}
                     title='Oh no!'
                     contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                     newClass='notification-wrapper--Error'
                  />
               );
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         {!isLoggedIn && (
            <div className='main-wrapper'>
               {notificationpopUpState}
               <div className={loginStyles.loginLogo}></div>
               <h1 className={loginStyles.loginTitle}>"...SHOW THYSELF APPROVED..."</h1>
               <p className={loginStyles.pText}>
                  Please check your email for a code. This code will expire within 24 hours
               </p>
               <div className='nowrap-flex-column'>
                  <input
                     type='text'
                     placeholder='Verification Code'
                     className='std-input'
                     ref={verificationCode}
                  />
                  {!smallLoaderState && (
                     <div className='std-button' onClick={hanldeNewUserRegistration}>
                        <div className='std-button_gradient-text'>Verify</div>
                     </div>
                  )}
                  {smallLoaderState}
                  <div className='large-spacer'></div>
               </div>
            </div>
         )}
      </>
   );
}
