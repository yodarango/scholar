// core
import { title } from "process";
import { useRef, useState } from "react";

// graphql
import client from "../apollo-client";
import SmallLoader from "../fragments/chunks/small-loader";
import NotificationPopup from "../fragments/notification-popup";
import { CREATE_NEW_USER } from "../graphql/users/new_user";

// styles
import registerStyles from "../styles/pages/Register.module.css";

//helpers
import { checkForValidSignature } from "../helpers/input-validaton";

export default function Register() {
   // ====================== FUNCTION: register the new user ============================ //
   const emailInput = useRef<HTMLInputElement>(null);
   const signatureInput = useRef<HTMLInputElement>(null);
   const passwordInput = useRef<HTMLInputElement>(null);

   const emailInputDesktop = useRef<HTMLInputElement>(null);
   const signatureInputDesktop = useRef<HTMLInputElement>(null);
   const passwordInputDesktop = useRef<HTMLInputElement>(null);

   const [notificationpopUpState, setNotificationpopUpState] = useState<JSX.Element | boolean>(
      false
   );
   const [smallLoaderState, setSmallLoaderState] = useState<JSX.Element | boolean>(false);
   const hanldeNewUserRegistration = async () => {
      if (emailInput.current && signatureInput.current && passwordInput.current) {
         setSmallLoaderState(<SmallLoader />);
         const { data } = await client.mutate({
            mutation: CREATE_NEW_USER,
            variables: {
               signature: `#${signatureInput.current.value.toUpperCase()}`,
               email: `${emailInput.current.value.toLocaleLowerCase()}`,
               password: `${passwordInput.current.value}`
            }
         });
         if (data.create_new_user.message) {
            setSmallLoaderState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationpopUpState(false)}
                  title='There was a problem 😔'
                  contentString={`${data.create_new_user.message}`}
                  newClass='notification-wrapper--Error'
               />
            );
         }
      }
   };

   // ====================== FUNCTION: register the new user ============================ //
   const failValidation = () => {
      setNotificationpopUpState(
         <NotificationPopup
            closeModal={() => setNotificationpopUpState(false)}
            title='There was a problem 😔'
            contentString={`Sorry, signature can only contain numbers and non-special characters`}
            newClass='notification-wrapper--Error'
         />
      );
   };

   const checkValidation = () => {
      checkForValidSignature(signatureInput.current ? signatureInput.current.value : "") === true
         ? hanldeNewUserRegistration()
         : failValidation();
   };
   return (
      <>
         {notificationpopUpState}
         <div className='main-wrapper'>
            <div className={`${registerStyles.wrapFlexRow} wrap-flex-row`}>
               {/* Left side, shows on mobile*/}
               <div className={registerStyles.loginLeft}>
                  <div className={registerStyles.logo}></div>
                  <div className={registerStyles.title}>"...SHOW THYSELF APPROVED..."</div>
                  <div className='nowrap-flex-column login-left'>
                     <input
                        type='email'
                        placeholder='Enter your email'
                        className='std-input'
                        ref={emailInput}
                     />
                     <input
                        type='text'
                        placeholder='Create a personal signature'
                        className='std-input'
                        ref={signatureInput}
                     />
                     <input
                        type='password'
                        placeholder='Type a strong password'
                        className='std-input'
                        ref={passwordInput}
                     />
                     {!smallLoaderState && (
                        <div className='std-button'>
                           <p className='std-button_gradient-text' onClick={checkValidation}>
                              Sign Up
                           </p>
                        </div>
                     )}
                     {smallLoaderState}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
