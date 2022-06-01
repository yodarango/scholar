// core
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadContent from "../../../layouts/head-content";
import Head from "next/head";

// graphQL
import { GET_MY_SETTINGS } from "../../../graphql/users/profile";
import { UPDATE_MY_SETTINGS } from "../../../graphql/users/profile";
import { VALIDATE_CURRENT_PASSWORD } from "../../../graphql/users/profile";
import client from "../../../apollo-client";

// components
import NotificationPopup from "../../../fragments/notification-popup";
import NavigationMenu from "../../../layouts/navigation-menu";
import SmallLoader from "../../../fragments/chunks/small-loader";
import AvatarChooser from "../../../fragments/popup-content/avatarChooser";
import PopupWrapper from "../../../layouts/popup-wrapper";
import ResourceNotFoundError from "../../../layouts/resource-not-found-error";
import UserVerificationApplication from "../../../fragments/chunks/user/user-verification-application";
import BugReport from "../../../fragments/popup-content/forms/bug-report";
import CardsLazyLoading from "../../../layouts/cards-lazy-loading";
import DangerZoneSettings from "../../../fragments/squares/danger-zone-settings";

// styles
import userSettingsStyles from "../../../styles/pages/users/settings/UserSettings.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// helpers
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
   const signatureInput = useRef<HTMLInputElement>(null); //signature
   const firstName = useRef<HTMLInputElement>(null);
   const lastName = useRef<HTMLInputElement>(null);
   const email = useRef<HTMLInputElement>(null);
   const birthDate = useRef<HTMLInputElement>(null);
   const favoriteColor = useRef<HTMLInputElement>(null);
   const favoriteVerse = useRef<HTMLInputElement>(null);
   const myChurch = useRef<HTMLInputElement>(null);
   const ministry = useRef<HTMLInputElement>(null);
   const fullTimeJob = useRef<HTMLInputElement>(null);
   const TCP = useRef<HTMLInputElement>(null);
   const currentPassword = useRef<HTMLInputElement>(null);
   const newPassword = useRef<HTMLInputElement>(null);

   // =======================  FUNCTION 1: Get User Settings =============== //
   const [userSettingsState, setUserSettingsState] = useState<Tuser | null>();
   const [loadingState, setLoadingState] = useState<string>("loading");
   const getUserSettings = async () => {
      try {
         const { data } = await client.query({
            query: GET_MY_SETTINGS,
            variables: {}
         });

         if (data.me) {
            setLoadingState("done");
            setUserSettingsState(data.me);
         } else if (data.me === null || data.me.length < 0) {
            router.replace("/login");
            setLoadingState("error");
            setUserSettingsState(null);
         }
      } catch (error) {
         setLoadingState("error");
         console.log(error);
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
            closeModal={() => setNotificationPopUpState(false)}
            title='There was a problem 😔'
            contentString={`Sorry, signature can only contain numbers and non-special characters`}
            newClass='notification-wrapper--Error'
         />
      );
   };

   const checkValidation = () => {
      checkForValidSignature(signatureInput.current ? signatureInput.current.value : "") === true
         ? saveUserSettings()
         : failValidation();
   };

   // =======================  FUNCTION 3: save the user settings update =============== //
   const [userGenderState, setUserGenderState] = useState<{
      gender: number | undefined;
      femaleClass: string | undefined;
      maleClass: string | undefined;
   }>({ gender: userSettingsState?.gender, femaleClass: "", maleClass: "" });

   // convert string passed down by DB
   const rawDate = userSettingsState?.birth_date
      ? parseInt(userSettingsState?.birth_date)
      : new Date();
   const ISOdate = new Date(rawDate).toISOString().split("T")[0];

   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);
   // apple rejected the app for forcing users to select gender, thus removing it
   const saveUserSettings = async () => {
      if (birthDate.current?.value /*&& (userGenderState.gender || userSettingsState?.gender)*/) {
         setSmallLoaderState(true);
         try {
            const { data } = await client.mutate({
               mutation: UPDATE_MY_SETTINGS,
               variables: {
                  signature: `${signatureInput.current?.value}`
                     ? signatureInput.current?.value.toUpperCase()
                     : "", //reomve hashtag before submitting to DB
                  first_name: firstName.current?.value ? firstName.current?.value : "",
                  last_name: lastName.current?.value ? lastName.current?.value : "",
                  email: email.current?.value ? email.current?.value : "",
                  gender: userGenderState.gender
                     ? userGenderState.gender
                     : userSettingsState?.gender
                     ? userSettingsState?.gender
                     : "",
                  birth_date: birthDate.current?.value ? birthDate.current?.value : "",
                  my_church: myChurch.current?.value ? myChurch.current?.value : "",
                  my_favorite_color: favoriteColor.current?.value
                     ? favoriteColor.current?.value
                     : "",
                  my_job: fullTimeJob.current?.value ? fullTimeJob.current?.value : "",
                  my_true_color_personality_test: TCP.current?.value ? TCP.current?.value : "",
                  my_favorite_verse: favoriteVerse.current?.value
                     ? favoriteVerse.current?.value
                     : "",
                  my_ministry: ministry.current?.value ? ministry.current?.value : ""
               }
            });

            if (data.me.update_successful) {
               router.replace("/users/me");
            } else if (!data.me.update_successful || data.me.message) {
               if (
                  data.me.__typename == "SignatureAlreadyTaken" ||
                  data.me.__typename == "EmailExists"
               ) {
                  setNotificationPopUpState(
                     <NotificationPopup
                        closeModal={() => setNotificationPopUpState(false)}
                        title='Oh no 😔!'
                        contentString={data.me.message}
                        newClass='notification-wrapper--Error'
                     />
                  );
                  setSmallLoaderState(false);
               } else {
                  setNotificationPopUpState(
                     <NotificationPopup
                        closeModal={() => setNotificationPopUpState(false)}
                        title='Oh no!'
                        contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                        newClass='notification-wrapper--Error'
                     />
                  );
                  setSmallLoaderState(false);
               }
            }
         } catch (error) {
            console.log(error);
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
            setSmallLoaderState(false);
         }
      } else if (!birthDate.current?.value) {
         setNotificationPopUpState(
            <NotificationPopup
               title={"Birthday is empty! 🗓"}
               contentString={`You must enter your birthday before proceeding`}
               newClass={"notification-wrapper--Error"}
               closeModal={() => setNotificationPopUpState(false)}
            />
         );
      }
      // else if (!userGenderState.gender) {
      //    setNotificationPopUpState(
      //       <NotificationPopup
      //          title={"No Gender Selected! 🙋‍♂️ 🙋‍♀️"}
      //          contentString={`You must select a gender before proceeding`}
      //          newClass={"notification-wrapper--Error"}
      //          closeModal={() => setNotificationPopUpState(false)}
      //       />
      //    );
      // }
   };

   console.log(userGenderState);
   // ============== open the password change popup ================= //
   const openChangePasswordSettings = async () => {
      if (currentPassword.current?.value && newPassword.current?.value) {
         try {
            const { data } = await client.mutate({
               mutation: VALIDATE_CURRENT_PASSWORD,
               variables: {
                  currPassword: currentPassword.current?.value.trim(),
                  newPassword: newPassword.current?.value.trim()
               }
            });

            if (data.change_password.update_successful === true) {
               setNotificationPopUpState(
                  <NotificationPopup
                     title={"Success ✅"}
                     contentString={`Your password has been updated successfully! 🔐`}
                     newClass={"notification-wrapper--Success"}
                     closeModal={() => setNotificationPopUpState(false)}
                  />
               );
               setFullScreenPopUp(false);
            } else {
               setNotificationPopUpState(
                  <NotificationPopup
                     title={"Hmmm...! 🤔"}
                     contentString={data.change_password.message}
                     newClass={"notification-wrapper--Error"}
                     closeModal={() => setNotificationPopUpState(false)}
                  />
               );
               setFullScreenPopUp(false);
            }
         } catch (error) {
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
            setFullScreenPopUp(false);
         }
      }
   };

   const [fullScreenPopUp, setFullScreenPopUp] = useState<boolean | JSX.Element>(false);
   const openChangePasswordPopUp = () => {
      setFullScreenPopUp(
         <PopupWrapper
            content={
               <>
                  <div>
                     <div className='x-large-spacer'></div>
                     <div className={userSettingsStyles.inputWrapper}>
                        <label htmlFor='password'>Enter your current password</label>
                        <input
                           id='curr-password'
                           type='password'
                           maxLength={70}
                           className={`std-input`}
                           ref={currentPassword}
                        />
                     </div>
                     <div className={userSettingsStyles.inputWrapper}>
                        <label htmlFor='password'>Enter your new password</label>
                        <input
                           id='new-password'
                           type='password'
                           maxLength={70}
                           className={`std-input`}
                           ref={newPassword}
                        />
                     </div>

                     <button className={`std-button`} onClick={openChangePasswordSettings}>
                        <p className={`std-button_gradient-text`}>Update</p>
                     </button>
                  </div>
               </>
            }
            closeModal={() => setFullScreenPopUp(false)}
         />
      );
   };

   // ======================== LOGOUT USER OUT =================== //
   const logout = () => {
      localStorage.removeItem("auth");
      router.reload();
   };

   // ======================== CHOSE AVATAR =================== //
   const [userCurrAvatarState, setUserCurrAvatarState] = useState<string | undefined>(undefined);
   const closeAvatarChooser = (imgLink: string) => {
      setUserCurrAvatarState(imgLink);
      setFullScreenPopUp(false);
   };
   const openChooseAvatar = () => {
      setFullScreenPopUp(
         <PopupWrapper
            content={<AvatarChooser closeAvatarChooser={closeAvatarChooser} />}
            closeModal={() => setFullScreenPopUp(false)}
         />
      );
   };

   // ================== submit verificaton   ===============
   const openVerificationApplication = () => {
      setFullScreenPopUp(
         <PopupWrapper
            content={
               <UserVerificationApplication
                  user_data={{
                     f_name: userSettingsState?.first_name,
                     l_name: userSettingsState?.last_name,
                     church: userSettingsState?.my_church
                  }}
               />
            }
            closeModal={() => setFullScreenPopUp(false)}
         />
      );
   };

   // =============== submit a bug report ============
   const openBugReport = () => {
      setFullScreenPopUp(
         <PopupWrapper content={<BugReport />} closeModal={() => setFullScreenPopUp(false)} />
      );
   };

   // =============== submit a bug report ============
   const deleteAccount = () => {
      setFullScreenPopUp(
         <PopupWrapper
            content={<DangerZoneSettings />}
            closeModal={() => setFullScreenPopUp(false)}
         />
      );
   };
   return (
      <>
         <Head>
            <HeadContent />
         </Head>
         {loadingState === "loading" && (
            <CardsLazyLoading amount={12} compClass={cardsLazyLoadingStyles.settingsLoading} />
         )}
         {fullScreenPopUp}
         {userSettingsState && loadingState === "done" && (
            <div className={userSettingsStyles.mainWrapper}>
               <Link href={`/users/me`}>
                  <a className={`goBack ${userSettingsStyles.goBack}`}></a>
               </Link>
               {notificationPopUpState}
               <h1 className={userSettingsStyles.settingsTitle}>Settings</h1>
               <div
                  className={`${userSettingsStyles.userReputation}`}
                  style={{
                     backgroundImage: `linear-gradient(130deg, #ff9214, #ff0045)`
                  }}>
                  {!userCurrAvatarState && (
                     <div
                        className={`${userSettingsStyles.avatar}`}
                        style={{ backgroundImage: `url(${userSettingsState.avatar})` }}></div>
                  )}
                  {userCurrAvatarState && (
                     <div
                        className={`${userSettingsStyles.avatar}`}
                        style={{ backgroundImage: `url(${userCurrAvatarState})` }}></div>
                  )}
               </div>
               <p
                  className={`std-text-block--info ${userSettingsStyles.changeAvatarButton}`}
                  onClick={openChooseAvatar}>
                  change avatar
               </p>
               <h2 className={userSettingsStyles.stdH2}>General</h2>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='signature'>Signature</label>
                  <input
                     id='signature'
                     type='text'
                     maxLength={30}
                     defaultValue={userSettingsState.signature.replace("#", "")}
                     className={`std-input`}
                     required
                     //onChange={checkForValidSignature}
                     ref={signatureInput}
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
                     ref={myChurch}
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
                     ref={ministry}
                     defaultValue={userSettingsState.my_ministry}
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='ministry'>Favorite Bible verse</label>
                  <input
                     id='fav-bible-verse'
                     type='text'
                     maxLength={30}
                     className={`std-input`}
                     ref={favoriteVerse}
                     defaultValue={userSettingsState.my_favorite_verse}
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='full-time-job'>Full time job title</label>
                  <input
                     id='full-time-job'
                     type='text'
                     maxLength={70}
                     className={`std-input`}
                     ref={fullTimeJob}
                     defaultValue={userSettingsState.my_job}
                  />
               </div>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='true-color'>True color personality</label>
                  <input
                     id='true-color'
                     type='text'
                     maxLength={30}
                     className={`std-input`}
                     ref={TCP}
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
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='ministry'>Favorite color</label>
                  <input
                     id='fav-color'
                     type='text'
                     maxLength={30}
                     className={`std-input`}
                     defaultValue={userSettingsState.my_favorite_color}
                     ref={favoriteColor}
                  />
               </div>
               <h2 className={userSettingsStyles.stdH2}>Privacy</h2>
               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='name'>First name</label>
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
                  <label htmlFor='name'>Last name</label>
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
                           gender: 1,
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
                           gender: 2,
                           maleClass: "",
                           femaleClass: userSettingsStyles.genderInputFemaleActive
                        })
                     }>
                     🙋‍♀️
                  </span>
               </div>

               <div className={userSettingsStyles.inputWrapper}>
                  <label htmlFor='name'>Birthday</label>
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
               <h3
                  className={userSettingsStyles.changePasswordLink}
                  onClick={openChangePasswordPopUp}>
                  🔐 change password
               </h3>
               <h3
                  className={userSettingsStyles.userVerification}
                  onClick={openVerificationApplication}>
                  📝 apply for user verification
               </h3>
               <h3 className={userSettingsStyles.userVerification} onClick={openBugReport}>
                  🐛 Submit a bug report
               </h3>

               <div className={userSettingsStyles.buttonsWrapper}>
                  {saveButtonIsDisiableState && !smallLoaderState && (
                     <button
                        className={`std-button ${userSettingsStyles.buttonSave}`}
                        onClick={checkValidation}>
                        <p className={`std-button_gradient-text`}>Save</p>
                     </button>
                  )}
                  {smallLoaderState && <SmallLoader />}
                  <Link href={`/users/me`}>
                     <a className={`std-button--warning ${userSettingsStyles.buttonCancel}`}>
                        Cancel
                     </a>
                  </Link>
                  <button
                     className={`std-button--clear ${userSettingsStyles.buttonLogout}`}
                     onClick={logout}>
                     <p className={`std-button_gradient-text`}>Log out</p>
                  </button>
               </div>

               {/* --------------- Danger Zone ----------- */}

               <section className={userSettingsStyles.dangerZone}>
                  <h3>Danger Zone</h3>
                  <button
                     className={`std-button--danger ${userSettingsStyles.buttonDelete}`}
                     onClick={deleteAccount}>
                     <p>Delete My Account</p>
                  </button>
               </section>
            </div>
         )}
         {loadingState == "error" && <ResourceNotFoundError />}
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export default UserSettings;
