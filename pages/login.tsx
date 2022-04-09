// core
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// graphQL
import client from "../apollo-client";
import { AUTHENTICATE_USER } from "../graphql/users/authenticate_user";
import { CHECK_IF_USER_LOGGED_IN } from "../graphql/users/profile";

// child comps
import SmallLoader from "../fragments/chunks/small-loader";
import NotificationPopup from "../fragments/notification-popup";

// styles
import loginStyles from "../styles/pages/Login.module.css";

// helpers
const Cookies = require("js-cookie");

export default function Login() {
   // =================== Check if there is a Logged in user and fetch its data ========== /
   const router = useRouter();

   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const checkedIfUserLoggedIn = async () => {
      try {
         const { data } = await client.query({
            query: CHECK_IF_USER_LOGGED_IN,
            variables: {}
         });

         setIsLoggedIn(data.is_user_logged_in);

         if (data.is_user_logged_in === true) {
            router.replace("/users/me");
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      checkedIfUserLoggedIn();
   }, []);

   // ====================== FUNCTION: Login the user ============================ //
   const signatureInput = useRef<HTMLInputElement>(null);
   const passwordInput = useRef<HTMLInputElement>(null);

   const [notificationpopUpState, setNotificationpopUpState] = useState<JSX.Element | boolean>(
      false
   );
   const [smallLoaderState, setSmallLoaderState] = useState<JSX.Element | boolean>(false);
   const hanldeNewUserRegistration = async () => {
      if (signatureInput.current && passwordInput.current) {
         setSmallLoaderState(<SmallLoader />);
         const { data } = await client.mutate({
            mutation: AUTHENTICATE_USER,
            variables: {
               signature: `#${signatureInput.current.value.toUpperCase()}`,
               password: `${passwordInput.current.value}`
            }
         });
         if (data.authenticate_user.ID) {
            const expTime = new Date(new Date().getTime() * 1000 * 60 * 60 * 24);

            Cookies.set("authorization", data.authenticate_user.token, {
               secure: true,
               sameSite: "strict",
               expires: expTime
            });
            location.href = "/login";
         }
         if (data.authenticate_user.message) {
            setSmallLoaderState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationpopUpState(false)}
                  title='Are you who you say you are? 🕵️‍♂️'
                  contentString={`${data.authenticate_user.message}`}
                  newClass='notification-wrapper--Error'
               />
            );
         }
      }
   };

   return (
      <>
         {!isLoggedIn && (
            <div className='main-wrapper'>
               {notificationpopUpState}
               <div className={loginStyles.loginLogo}></div>
               <div className={loginStyles.loginTitle}>"...SHOW THYSELF APPROVED..."</div>
               <div className='nowrap-flex-column'>
                  <input
                     type='text'
                     placeholder='Your Signature'
                     className='std-input'
                     ref={signatureInput}
                  />
                  <input
                     type='password'
                     placeholder='Password'
                     className='std-input'
                     ref={passwordInput}
                  />
                  {!smallLoaderState && (
                     <div className='std-button' onClick={hanldeNewUserRegistration}>
                        <div className='std-button_gradient-text'>Login</div>
                     </div>
                  )}
                  {smallLoaderState}
                  <p className='std-text-block--info'>Don't have an account yet? </p>
                  <Link href='/register'>
                     <a className='std-button std-button--no-margin std-button--clear'>
                        <div className='std-button_gradient-text'>Sign Up</div>
                     </a>
                  </Link>
                  <div className='large-spacer'></div>
               </div>
            </div>
         )}
      </>
   );
}
