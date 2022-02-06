// core
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

// graphQL
import { GET_MY_SETTINGS } from "../../../graphql/users/profile";
import { UPDATE_MY_SETTINGS } from "../../../graphql/users/profile";
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
   // globals
   const router = useRouter();
   // inputs
   const isValidInput = useRef<HTMLInputElement>(null); //signature
   const firstName = useRef<HTMLInputElement>(null);
   const lastName = useRef<HTMLInputElement>(null);
   const email = useRef<HTMLInputElement>(null);
   const birthDate = useRef<HTMLInputElement>(null);

   // ====================== check for token cookie ==================
   const token: string = Cookies.get("authorization");
   let parsedUser = parseJwt(token);
   const userId = parsedUser?.id ? parsedUser?.id : 0;

   // =======================  FUNCTION 1: Get User Settings =============== //
   const [userSettingsState, setUserSettingsState] = useState<Tuser | null>();
   const [loadingState, setLoadingState] = useState<boolean>(true);
   const getUserSettings = async () => {
      const { loading, error, data } = await client.query({
         query: GET_MY_SETTINGS,
         variables: {}
      });
      if (data.me && data.me.length > 0) {
         setLoadingState(false);
         setUserSettingsState(data.me[0]);
      } else if (data.me === null || data.me.length < 0) {
         router.replace("/login");
         setLoadingState(false);
         setUserSettingsState(null);
      }
   };
   useEffect(() => {
      getUserSettings();
   }, []);
   // =======================  FUNCTION 2: Check that the signature can only contian characters and numbers =============== //
   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const [saveButtonIsDisiableState, setsaveButtonIsDisiableState] = useState<boolean>(true);

   const failValidation = () => {
      setNotificationPopUpState(
         <NotificationPopup
            title={"Error! 😔"}
            contentString={`Sorry, special characters or empty signature are not allowed. You won't be able to save your settings until the error is fxed.`}
            newClass={"notification-wrapper--Red"}
            closeModal={() => setNotificationPopUpState(false)}
         />
      );
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

   // =======================  FUNCTION 3: save the user settings update =============== //
   const [userGenderState, setUserGenderState] = useState<{
      gender: string | undefined;
      femaleClass: string | undefined;
      maleClass: string | undefined;
   }>({ gender: userSettingsState?.gender, femaleClass: "", maleClass: "" });

   // convert strign passed down by DB
   const rawDate = userSettingsState?.birth_date
      ? parseInt(userSettingsState?.birth_date)
      : new Date();
   const ISOdate = new Date(rawDate).toISOString().split("T")[0];

   const saveUserSettings = async () => {
      if (birthDate.current?.value && (userGenderState.gender || userSettingsState?.gender)) {
         const { data } = await client.mutate({
            mutation: UPDATE_MY_SETTINGS,
            variables: {
               signature: isValidInput.current?.value ? isValidInput.current?.value : "",
               first_name: firstName.current?.value ? firstName.current?.value : "",
               last_name: lastName.current?.value ? lastName.current?.value : "",
               email: email.current?.value ? email.current?.value : "",
               gender: userGenderState.gender
                  ? userGenderState.gender
                  : userSettingsState?.gender
                  ? userSettingsState?.gender
                  : "",
               birth_date: birthDate.current?.value
            }
         });
         console.log(data);
      } else if (!birthDate.current?.value) {
         setNotificationPopUpState(
            <NotificationPopup
               title={"Birthdate is Empty! 🗓"}
               contentString={`You must enter your birthday before proceeding`}
               newClass={"notification-wrapper--Red"}
               closeModal={() => setNotificationPopUpState(false)}
            />
         );
      } else if (!userGenderState.gender) {
         setNotificationPopUpState(
            <NotificationPopup
               title={"No Gender Selected! 🙋‍♂️ 🙋‍♀️"}
               contentString={`You must select a gender before proceeding`}
               newClass={"notification-wrapper--Red"}
               closeModal={() => setNotificationPopUpState(false)}
            />
         );
      }
   };

   return (
      <>
         {loadingState && <div>Loading</div>}
         {userSettingsState && (
            <div className={userSettingsStyles.mainWrapper}>
               {notificationPopUpState}
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
                  <label htmlFor='name'>First Name</label>
                  <input
                     id='name'
                     type='text'
                     maxLength={30}
                     defaultValue={userSettingsState.first_name}
                     className={`std-input`}
                     ref={firstName}
                     required
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='name'>Last Name</label>
                  <input
                     id='name'
                     type='text'
                     maxLength={30}
                     defaultValue={userSettingsState.last_name}
                     className={`std-input`}
                     ref={lastName}
                     required
                  />
               </div>
               <div
                  className={`${userSettingsStyles.inputWrapper} ${userSettingsStyles.genderInputWrapper}`}>
                  <label htmlFor='name'>Gender</label>
                  <span
                     className={`${userSettingsStyles.genderInput} ${userGenderState.maleClass}`}
                     onClick={() =>
                        setUserGenderState({
                           gender: "male",
                           maleClass: userSettingsStyles.genderInputMaleActive,
                           femaleClass: ""
                        })
                     }>
                     🙋‍♂️
                  </span>
                  <span
                     className={`${userSettingsStyles.genderInput} ${userGenderState.femaleClass}`}
                     onClick={() =>
                        setUserGenderState({
                           gender: "female",
                           maleClass: "",
                           femaleClass: userSettingsStyles.genderInputFemaleActive
                        })
                     }>
                     🙋‍♀️
                  </span>
               </div>

               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='name'>Birthdate</label>
                  <input
                     id='name'
                     type='date'
                     defaultValue={ISOdate}
                     className={`std-input`}
                     ref={birthDate}
                     required
                  />
               </div>

               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='email'>Email</label>
                  <input
                     id='email'
                     type='text'
                     maxLength={70}
                     className={`std-input`}
                     defaultValue={userSettingsState.email}
                     ref={email}
                     required
                  />
               </div>

               {/* <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='password'>New Password</label>
                  <input id='password' type='text' maxLength={70} className={`std-input`} />
               </div> */}

               <div className={userSettingsStyles.buttonsWrapper}>
                  {saveButtonIsDisiableState && (
                     <button className={`std-button`} onClick={saveUserSettings}>
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
