// core
import { GetServerSideProps } from "next";
import React, { useRef, useState } from "react";
import Link from "next/link";

// components
import userSettingsStyles from "../../../styles/pages/users/settings/UserSettings.module.css";
import NotificationPopup from "../../../fragments/notification-popup";

// helpers
import { Tuser } from "../[...userId]";

type userSettingsProps = {
   user: Tuser;
};
const UserSettings = ({ user }: userSettingsProps) => {
   // =======================  FUNCTION 1: Check that tbe signature can only contian =============== //
   const [isValidInputState, setIsValidInputState] = useState<boolean>(false);
   const [saveButtonIsDisiableState, setsaveButtonIsDisiableState] = useState<boolean>(true);
   const isValidInput = useRef<HTMLInputElement>(null);
   const format = /^\w+$/;
   const checkForValidSignature = () => {
      if (isValidInput.current) {
         const currInput = isValidInput.current.value;
         if (!format.test(currInput)) {
            setIsValidInputState(true);
            setsaveButtonIsDisiableState(false);
         } else {
            setsaveButtonIsDisiableState(true);
         }
      }
   };

   return (
      <>
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
                  style={{ backgroundImage: `url(${user.avatar})` }}></div>
            </div>
            <h2 className={userSettingsStyles.stdH2}>General</h2>
            <div className={userSettingsStyles.inputWrapper}>
               <label htmlFor='signature'>Signature</label>
               <input
                  id='signature'
                  type='text'
                  maxLength={30}
                  defaultValue={user.signature}
                  className={`std-input`}
                  required
                  onChange={checkForValidSignature}
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
                  defaultValue={user.name}
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
                  defaultValue={user.lastName}
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
                  defaultValue={user.church}
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
                  defaultValue={user.ministry}
               />
            </div>
            <div className={userSettingsStyles.inputWrapper}>
               <label htmlFor='full-time-job'>Full Time Job Title</label>
               <input
                  id='full-time-job'
                  type='text'
                  maxLength={70}
                  className={`std-input`}
                  defaultValue={user.job}
               />
            </div>
            <div className={userSettingsStyles.inputWrapper}>
               <label htmlFor='true-color'>True Color Personality</label>
               <input
                  id='true-color'
                  type='text'
                  maxLength={30}
                  className={`std-input`}
                  defaultValue={user.tcp}
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
                  defaultValue={user.email}
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
               <Link href={`/users/${user.id}`}>
                  <a className={`std-button--warning`}>Cancel</a>
               </Link>
            </div>
         </div>
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { userId } = context.query;
   const req = await fetch(`http://scholar-be.herokuapp.com/users/123`);
   const user = await req.json();
   return {
      props: {
         user
      }
   };
};
export default UserSettings;
