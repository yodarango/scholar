// core
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadContent from "../SEO/head_content";

// graphQL
import { client } from "../apollo-client";
import { AUTHENTICATE_USER } from "../graphql/users/authenticate_user";

// child comps
import { SmallLoader } from "../components/fragments/chunks/small_loader";
import { Notification } from "../components/fragments/popups/notification";

// styles
//import loginStyles from "../styles/pages/Login.module.css";
import PopupWrapper from "../archive/popup-wrapper";
//import ForgotPassword from "../archive/forgot-password-modal";

export default function Login() {
   // =================== Check if there is a Logged in user and fetch its data ========== /
   const router = useRouter();

   const [isLoggedIn, setIsLoggedIn] = useState(false);

   // const checkedIfUserLoggedIn = async () => {
   //    try {
   //       const { data } = await client.query({
   //          query: CHECK_IF_USER_LOGGED_IN,
   //          variables: {}
   //       });

   //       setIsLoggedIn(data.is_user_logged_in);

   //       if (data.is_user_logged_in === true) {
   //          router.replace("/users/me");
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   useEffect(() => {
      //checkedIfUserLoggedIn();
   }, []);

   // ====================== FUNCTION: Login the user ============================ //
   const signatureInput = useRef<HTMLInputElement>(null);
   const passwordInput = useRef<HTMLInputElement>(null);

   const [notificationpopUpState, setNotificationpopUpState] =
      useState<JSX.Element | boolean>(false);
   const [smallLoaderState, setSmallLoaderState] = useState<JSX.Element | boolean>(false);
   const hanldeNewUserRegistration = async () => {
      if (signatureInput.current && passwordInput.current) {
         setSmallLoaderState(<SmallLoader />);

         try {
            const { data } = await client.mutate({
               mutation: AUTHENTICATE_USER,
               variables: {
                  signature: `#${signatureInput.current.value.toUpperCase()}`,
                  password: `${passwordInput.current.value}`
               }
            });

            if (data.authenticate_user.ID) {
               // --------- switching to local storage because apple has a bug that expires cookies at session time
               // document.cookie = `authorization=${data.authenticate_user.token}; expires=${expTime}; domain=${window.location.hostname}; path=/`;
               const today = Date.now();
               const expTime = today + 1209600000;

               const jwtAuth = {
                  auth: data.authenticate_user.token,
                  expiresIn: expTime
               };
               localStorage.setItem("auth", JSON.stringify(jwtAuth));
               location.href = "/login";
            }
            if (data.authenticate_user.message) {
               setSmallLoaderState(false);
               setNotificationpopUpState(
                  <Notification
                     cta={{ handleClose: () => setNotificationpopUpState(false) }}
                     title='Are you who you say you are? 🕵️‍♂️'
                     type='2'
                     body={`${data.authenticate_user.message}`}
                  />
               );
            }
         } catch (error) {
            console.log(error);
            setSmallLoaderState(false);
            setNotificationpopUpState(
               <Notification
                  cta={{ handleClose: () => setNotificationpopUpState(false) }}
                  title='Are you who you say you are? 🕵️‍♂️'
                  type='4'
                  body={`error`}
               />
            );
         }
      }
   };

   // ==================== FUNCTION: Handle the forgot password popup ============
   const [forgotPasswordPopup, setPorgotPasswordPopup] = useState<boolean | JSX.Element>(false);
   const handleForgotPassword = () => {
      setPorgotPasswordPopup(false);
      // <PopupWrapper
      //    closeModal={() => setPorgotPasswordPopup(false)}
      //    content={<ForgotPassword />}
      // />
   };

   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         {/* {forgotPasswordPopup} */}
         {!isLoggedIn && (
            <div className='main-wrapper'>
               {notificationpopUpState}
               <div></div>
               <div>SHOW THYSELF APPROVED</div>
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
                  <div>
                     <button onClick={handleForgotPassword}>Forgot Passoword</button>
                  </div>
                  <div className='large-spacer'></div>
               </div>
            </div>
         )}
      </>
   );
}
