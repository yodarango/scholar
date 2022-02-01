// core
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");

// graphQL
import client from "../apollo-client";
import { AUTHENTICATE_USER } from "../graphql/users/authenticate_user";

// child comps
import SmallLoader from "../fragments/chunks/small-loader";
import NotificationPopup from "../fragments/notification-popup";

// styles
import loginStyles from "../styles/pages/Login.module.css";

// helpers

export default function Login() {
   // ====================== FUNCTION: Login the user ============================ //
   const signatureInput = useRef<HTMLInputElement>(null);
   const passwordInput = useRef<HTMLInputElement>(null);
   const router = useRouter();

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
            Cookies.set("authorization", data.authenticate_user.token, {
               secure: true,
               sameSite: "strict",
               expires: 7
            });
            router.replace(`/users/me?from=login`);
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
   );
}
