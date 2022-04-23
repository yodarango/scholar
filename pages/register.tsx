// core
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

// components
import SmallLoader from "../fragments/chunks/small-loader";
import NotificationPopup from "../fragments/notification-popup";

// graphql
import client from "../apollo-client";
import { CREATE_NEW_USER } from "../graphql/users/new_user";
import { CHECK_IF_USER_LOGGED_IN } from "../graphql/users/profile";

// styles
import registerStyles from "../styles/pages/Register.module.css";

//helpers
import { checkForValidSignature } from "../helpers/input-validaton";
const Cookies = require("js-cookie");

export default function Register() {
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

   // ====================== FUNCTION: register the new user ============================ //
   const emailInput = useRef<HTMLInputElement>(null);
   const signatureInput = useRef<HTMLInputElement>(null);
   const passwordInput = useRef<HTMLInputElement>(null);

   const [notificationpopUpState, setNotificationpopUpState] = useState<JSX.Element | boolean>(
      false
   );
   const [smallLoaderState, setSmallLoaderState] = useState<JSX.Element | boolean>(false);

   const hanldeNewUserRegistration = async () => {
      if (
         emailInput.current &&
         signatureInput.current &&
         passwordInput.current &&
         userGenderState.gender
      ) {
         setSmallLoaderState(<SmallLoader />);
         try {
            const { data } = await client.mutate({
               mutation: CREATE_NEW_USER,
               variables: {
                  signature: `#${signatureInput.current.value.toUpperCase()}`,
                  email: `${emailInput.current.value.toLocaleLowerCase()}`,
                  password: `${passwordInput.current.value}`,
                  gender: userGenderState.gender
               }
            });

            console.log(data);
            if (data.create_new_user.ID) {
               const expTime = new Date(new Date().getTime() * 1000 * 60);
               Cookies.set("authorization", data.create_new_user.token, {
                  secure: true,
                  sameSite: "strict",
                  expires: expTime
               });

               location.href = "/account_verification";
            } else if (data.create_new_user.message) {
               setSmallLoaderState(false);
               setNotificationpopUpState(
                  <NotificationPopup
                     closeModal={() => (
                        setNotificationpopUpState(false), setSmallLoaderState(false)
                     )}
                     title='There was a problem 😔'
                     contentString={`${data.create_new_user.message}`}
                     newClass='notification-wrapper--Error'
                  />
               );
            }
         } catch (error: any) {
            console.log(error);
            setSmallLoaderState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => (setNotificationpopUpState(false), setSmallLoaderState(false))}
                  title='There was a problem 😔'
                  contentString={`Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!`}
                  newClass='notification-wrapper--Error'
               />
            );
            return;
         }
      } else {
         setNotificationpopUpState(
            <NotificationPopup
               closeModal={() => (setNotificationpopUpState(false), setSmallLoaderState(false))}
               title='Empty fields detected ✋'
               contentString={`Please make sure all data is entered `}
               newClass='notification-wrapper--Error'
            />
         );
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

   // set the gender choosing ability
   // =======================  FUNCTION 3: save the user settings update =============== //
   const [userGenderState, setUserGenderState] = useState<{
      gender: string | undefined;
      femaleClass: string | undefined;
      maleClass: string | undefined;
   }>({ gender: undefined, femaleClass: "", maleClass: "" });

   return (
      <>
         {notificationpopUpState}
         {!isLoggedIn && (
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

                        <div
                           className={`${registerStyles.inputWrapper} ${registerStyles.genderInputWrapper}`}>
                           <label htmlFor='name'>Gender</label>
                           <span
                              className={`${registerStyles.genderInput} ${userGenderState.maleClass}`}
                              onClick={() =>
                                 setUserGenderState({
                                    gender: "male",
                                    maleClass: registerStyles.genderInputMaleActive,
                                    femaleClass: ""
                                 })
                              }>
                              🙋‍♂️
                           </span>
                           <span
                              className={`${registerStyles.genderInput} ${userGenderState.femaleClass}`}
                              onClick={() =>
                                 setUserGenderState({
                                    gender: "female",
                                    maleClass: "",
                                    femaleClass: registerStyles.genderInputFemaleActive
                                 })
                              }>
                              🙋‍♀️
                           </span>
                        </div>

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
         )}
      </>
   );
}
