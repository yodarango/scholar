// core
import { GetServerSideProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// graphQL
import { GET_MY_PROFILE } from "../../../graphql/users/profile";
import client from "../../../apollo-client";

// components
import userSettingsStyles from "../../../styles/pages/users/settings/UserSettings.module.css";
import NotificationPopup from "../../../fragments/notification-popup";
import NavigationMenu from "../../../layouts/navigation-menu";

// helpers
const Cookies = require("js-cookie");
import parseJwt from "../../../helpers/auth/decodeJWT";
import { checkForValidSignature } from "../../../helpers/input-validaton";

// types
import { Tuser } from "../[userId]";

type userSettingsProps = {
   user: Tuser;
};

const UserSettings = () => {
   const token: string = Cookies.get("authorization");
   let parsedUser = parseJwt(token);
   const userId = parsedUser?.id ? parsedUser?.id : 0;
   const router = useRouter();

   // =======================  FUNCTION 1: Get User Settings =============== //
   const [userSettingsState, setUserSettingsState] = useState<Tuser | null>();
   const [loadingState, setLoadingState] = useState<boolean>(true);
   const getUserSettings = async () => {
      const { loading, error, data } = await client.query({
         query: GET_MY_PROFILE,
         variables: {
            ID: userId,
            totalCountOnly: true,
            getApprovalCount: true
         }
      });
      if (data.me && data.me.length > 0) {
         setLoadingState(false);
         setUserSettingsState(data.me[0]);
      } else if (data.me === null || data.me.length < 0) {
         setLoadingState(false);
         setUserSettingsState(null);
      }
   };
   useEffect(() => {
      getUserSettings();
   }, []);
   // =======================  FUNCTION 2: Check that the signature can only contian characters and numbers =============== //
   const [isValidInputState, setIsValidInputState] = useState<boolean>(false);
   const [saveButtonIsDisiableState, setsaveButtonIsDisiableState] = useState<boolean>(true);
   const isValidInput = useRef<HTMLInputElement>(null);
   const failValidation = () => {
      setIsValidInputState(true);
      setsaveButtonIsDisiableState(false);
   };

   const passedValidation = () => {
      setsaveButtonIsDisiableState(true);
   };

   checkForValidSignature(
      isValidInput.current ? isValidInput.current.value : ""
      // failValidation,
      // passedValidation
   );
   // const format = /^\w+$/;
   // const checkForValidSignature = (input, fail, success) => {
   //    if (isValidInput.current) {
   //       const currInput = isValidInput.current.value;
   //       if (!format.test(currInput)) {
   //          setIsValidInputState(true);
   //          setsaveButtonIsDisiableState(false);
   //       } else {
   //          setsaveButtonIsDisiableState(true);
   //       }
   //    }
   // };

   return (
      <>
         {loadingState && <div>Loading</div>}
         {!userSettingsState && !loadingState && <div>You are not authorized #NEEDSGRAPHICS</div>}
         {userSettingsState && (
            <div className={userSettingsStyles.mainWrapper}>
               {isValidInputState && (
                  <NotificationPopup
                     title={"Error! 😔"}
                     contentString={`Sorry, special characters or empty signature are not allowed. You won't be able to save your settings until the error is fxed.`}
                     newClass={"notification-wrapper--Red"}
                     closeModal={() => setIsValidInputState(false)}
                  />
               )}
               <h1 className={userSettingsStyles.settingsTitle}>Settings</h1>
               <div
                  className={`${userSettingsStyles.userReputation}`}
                  style={{
                     backgroundImage: `linear-gradient(130deg, #ff9214, #ff0045)`
                  }}>
                  <div
                     className={`${userSettingsStyles.avatar}`}
                     style={{ backgroundImage: `url(${userSettingsState.avatar})` }}></div>
               </div>
               <h2 className={userSettingsStyles.stdH2}>General</h2>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='signature'>Signature</label>
                  <input
                     id='signature'
                     type='text'
                     maxLength={30}
                     defaultValue={userSettingsState.signature}
                     className={`std-input`}
                     required
                     //onChange={checkForValidSignature}
                     ref={isValidInput}
                  />
               </div>

               <h2 className={userSettingsStyles.stdH2}>About Me</h2>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='name'>Name</label>
                  <input
                     id='name'
                     type='text'
                     maxLength={30}
                     defaultValue={userSettingsState.first_name}
                     className={`std-input`}
                     required
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='last-name'>Last Name</label>
                  <input
                     id='last-name'
                     type='text'
                     maxLength={30}
                     defaultValue={userSettingsState.last_name}
                     className={`std-input`}
                     required
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='church'>Church I attend</label>
                  <input
                     id='church'
                     type='text'
                     maxLength={50}
                     defaultValue={userSettingsState.my_church}
                     className={`std-input`}
                     required
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='ministry'>Ministry</label>
                  <input
                     id='ministry'
                     type='text'
                     maxLength={30}
                     className={`std-input`}
                     defaultValue={userSettingsState.my_ministry}
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='full-time-job'>Full Time Job Title</label>
                  <input
                     id='full-time-job'
                     type='text'
                     maxLength={70}
                     className={`std-input`}
                     defaultValue={userSettingsState.my_job}
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='true-color'>True Color Personality</label>
                  <input
                     id='true-color'
                     type='text'
                     maxLength={30}
                     className={`std-input`}
                     defaultValue={userSettingsState.my_true_color_personality_test}
                  />
                  <a
                     href='https://my-personality-test.com/true-colours'
                     target='_blank'
                     rel='noopener noreferrer'
                     className={`std-text-block--info`}
                     id={`${userSettingsStyles.takeTest}`}>
                     <span>Don't know it yet? </span> Take the test
                  </a>
               </div>
               <h2 className={userSettingsStyles.stdH2}>Privacy</h2>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='email'>Email</label>
                  <input
                     id='email'
                     type='text'
                     maxLength={70}
                     className={`std-input`}
                     defaultValue={userSettingsState.email}
                  />
               </div>

               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='password'>New Password</label>
                  <input id='password' type='text' maxLength={70} className={`std-input`} />
               </div>
               <div className={userSettingsStyles.buttonsWrapper}>
                  {saveButtonIsDisiableState && (
                     <button className={`std-button`}>
                        <p className={`std-button_gradient-text`}>SAVE</p>
                     </button>
                  )}
                  <Link href={`/users/me`}>
                     <a className={`std-button--warning`}>Cancel</a>
                  </Link>
               </div>
            </div>
         )}
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export default UserSettings;
