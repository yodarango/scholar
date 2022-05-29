//core
import { useState, useRef } from "react";
import { useRouter } from "next/router";

// graphQL
import client from "../../apollo-client";
import { DELETE_MY_ACCOUNT } from "../../graphql/users/danger-zone";

// comps
import NotificationPopup from "../notification-popup";
import PopupWrapper from "../../layouts/popup-wrapper";
import DeletedUser from "../../layouts/sudo-pages/deleted-user";

//styles
import dangerZoneSettingsStyles from "../../styles/fragments/squares/DangerZoneSettings.module.css";

const DangerZoneSettings = () => {
   // router
   const router = useRouter();
   // small loader state
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [notificationPupUp, setnotificationPupUp] = useState<JSX.Element | boolean>(false);
   const [fullScreenModal, setfullScreenModal] = useState<boolean>(false);

   const password = useRef<HTMLInputElement>(null);
   const handleUserDeletion = async () => {
      if (password.current && password.current?.value) {
         setsmallLoader(true);
         try {
            const { data } = await client.mutate({
               mutation: DELETE_MY_ACCOUNT,
               variables: { password: password.current.value }
            });
            if (data.delete_my_account === "DELETED") {
               localStorage.removeItem("auth");
               setfullScreenModal(true);
            }
            if (data.delete_my_account === "ERROR") {
               setsmallLoader(false);
               setnotificationPupUp(
                  <NotificationPopup
                     closeModal={() => setnotificationPupUp(false)}
                     title={`Something went wrong!`}
                     contentString={
                        "Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!"
                     }
                     newClass='notification-wrapper--Error'
                  />
               );
            }
            if (data.delete_my_account === "WRONG_PASS") {
               setsmallLoader(false);
               setnotificationPupUp(
                  <NotificationPopup
                     closeModal={() => setnotificationPupUp(false)}
                     title={`Wrong Password 👮‍♂️`}
                     contentString={"Please make sure you are typing in the correct password"}
                     newClass='notification-wrapper--Error'
                  />
               );
            }
            setsmallLoader(false);
         } catch (error) {
            console.log(error);
            setsmallLoader(false);
            setnotificationPupUp(
               <NotificationPopup
                  closeModal={() => setnotificationPupUp(false)}
                  title={`Something went wrong!`}
                  contentString={
                     "Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!"
                  }
                  newClass='notification-wrapper--Error'
               />
            );
         }
      }
   };

   return (
      <div className={dangerZoneSettingsStyles.mainWrapper}>
         {notificationPupUp}
         {fullScreenModal && (
            <PopupWrapper content={<DeletedUser />} closeModal={() => setfullScreenModal(false)} />
         )}
         <div className='x-large-spacer'></div>
         <p className='std-text-block--warning'>
            Please make sure you have canceled your subscription if you have one before deleting
            your account!
         </p>
         <p className='std-text-block--danger'>
            By deleting your account you understand that all your data will be permanently deleted!
         </p>
         <div className={dangerZoneSettingsStyles.inputWrapper}>
            <label htmlFor='password'>Enter your current password</label>
            <input
               id='curr-password'
               type='password'
               maxLength={70}
               className={`std-input`}
               ref={password}
            />
         </div>

         {!smallLoader && (
            <button
               className={`std-button--danger ${dangerZoneSettingsStyles.deleteButton}`}
               onClick={handleUserDeletion}>
               <p>DELETE</p>
            </button>
         )}
         {smallLoader}
      </div>
   );
};

export default DangerZoneSettings;
