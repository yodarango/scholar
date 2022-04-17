// core
import { useRef, useState } from "react";

// styles
import userSettingsStyles from "../../../styles/pages/users/settings/UserSettings.module.css";
import userVerificationApplicationStyles from "../../../styles/fragments/chunks/users/UserVerificationApplicaton.module.css";
import NotificationPopup from "../../notification-popup";

type userVerificationApplicationProps = {
   user_data: {
      church: string | undefined;
      f_name: string | undefined;
      l_name: string | undefined;
   };
};

type TquestionaryProps = {
   age: boolean;
   ministry: string;
   timeInMinistry: boolean;
   bibleEducation: boolean;
   degree: string;
};

const UserVerificationApplication = ({ user_data }: userVerificationApplicationProps) => {
   // notificatipn wrapper
   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>(
      false
   );

   // input references
   const firstName = useRef<HTMLInputElement>(null);
   const lastName = useRef<HTMLInputElement>(null);
   const church = useRef<HTMLInputElement>(null);
   const degree = useRef<HTMLInputElement>(null);
   const ministry = useRef<HTMLInputElement>(null);

   const [questionaryState, setQuestionaryState] = useState<TquestionaryProps>({
      age: true,
      ministry: "",
      timeInMinistry: true,
      bibleEducation: false,
      degree: ""
   });

   // ============= submit the request
   const submitRequest = () => {
      const firstnameValue = firstName.current;
      const lastameValue = lastName.current;
      const churchValue = church.current;
      const minsitryValue = ministry.current;
      const degreeValue = degree.current;

      if (
         firstnameValue?.value &&
         lastameValue?.value &&
         churchValue?.value &&
         minsitryValue?.value
      ) {
         if (
            (questionaryState.bibleEducation && degreeValue?.value != "") ||
            !questionaryState.bibleEducation
         ) {
            console.log(questionaryState);
            console.log(
               firstName.current,
               lastName.current,
               church.current,
               degreeValue?.value,
               ministry.current
            );
         } else if (questionaryState.bibleEducation && !degreeValue?.value) {
            setNotificationPopUpState(
               <NotificationPopup
                  newClass='notification-wrapper--Error'
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Empty Degree Field✋'
                  contentString={"Please specify your degree ✔️"}
               />
            );
         }
      } else {
         setNotificationPopUpState(
            <NotificationPopup
               newClass='notification-wrapper--Error'
               closeModal={() => setNotificationPopUpState(false)}
               title='Empty fields detected ✋'
               contentString={"Please make sure all fields are filled out ✔️"}
            />
         );
      }
   };

   return (
      <div>
         {notificationPopUpState}
         <h2 className={userVerificationApplicationStyles.applicationTitle}>
            BECOME A TRUSTED USER ⭐️
         </h2>
         <p className={userVerificationApplicationStyles.smallTitle}>What is a trusted user? </p>
         <p>
            A trusted user is someone whom, by the grace of our Lord, has proven to be faithful to
            God and His word. Someone who is qualified by time in the ministry, formal biblical
            education, or both to teach others.
            <br />
            <br />A trusted user is someone who's content can be trusted with higher reliability,
            thus helping equip the community who benefit from their content. Because a trusted user
            must be deemed reliable, each submission is carefully examined and may or may not be
            approved.
         </p>
         <div
            className={`${userSettingsStyles.inputWrapper} ${userVerificationApplicationStyles.inputWrapper}`}>
            <label htmlFor='password'>First name</label>
            <input
               id='curr-password'
               type='text'
               maxLength={100}
               className={`std-input`}
               defaultValue={user_data.f_name}
               ref={firstName}
            />
         </div>
         <div
            className={`${userSettingsStyles.inputWrapper} ${userVerificationApplicationStyles.inputWrapper}`}>
            <label htmlFor='password'>Last name</label>
            <input
               id='new-password'
               type='text'
               maxLength={100}
               className={`std-input`}
               defaultValue={user_data.l_name}
               ref={lastName}
            />
         </div>
         <div
            className={`${userSettingsStyles.inputWrapper} ${userVerificationApplicationStyles.inputWrapper}`}>
            <label htmlFor='password'>Home church</label>
            <input
               id='new-password'
               type='text'
               maxLength={100}
               className={`std-input`}
               defaultValue={user_data.church}
               ref={church}
            />
         </div>
         <div
            className={`${userSettingsStyles.inputWrapper} ${userVerificationApplicationStyles.inputWrapper}`}>
            <label htmlFor='password'>What is your ministry</label>
            <input
               id='new-password'
               type='text'
               maxLength={100}
               className={`std-input`}
               placeholder='evangelist, pastor, teacher, etc'
               ref={ministry}
            />
         </div>

         <section className={userVerificationApplicationStyles.radioInputWrapper}>
            <p>Are you at least 40 years or older?</p>
            <div className={userVerificationApplicationStyles.inputsWrapper}>
               <div
                  className={`${userVerificationApplicationStyles.sudoRadioInput} 
                  ${userVerificationApplicationStyles.inputYes}
                    ${questionaryState.age ? userVerificationApplicationStyles.inputChecked : " "}
                  `}
                  onClick={() => setQuestionaryState({ ...questionaryState, age: true })}>
                  ✅
               </div>
               <div
                  className={`${userVerificationApplicationStyles.sudoRadioInput}
                  ${userVerificationApplicationStyles.inputNo}
                    ${!questionaryState.age ? userVerificationApplicationStyles.inputChecked : " "}
                  `}
                  onClick={() => setQuestionaryState({ ...questionaryState, age: false })}>
                  ❌
               </div>
            </div>
         </section>

         <section className={userVerificationApplicationStyles.radioInputWrapper}>
            <p>Have you been in the current ministry for at least 10 years?</p>
            <div className={userVerificationApplicationStyles.inputsWrapper}>
               <div
                  className={`${userVerificationApplicationStyles.sudoRadioInput}
                  ${
                     questionaryState.timeInMinistry
                        ? userVerificationApplicationStyles.inputChecked
                        : " "
                  }
                  `}
                  onClick={() =>
                     setQuestionaryState({ ...questionaryState, timeInMinistry: true })
                  }>
                  ✅
               </div>
               <div
                  className={`${userVerificationApplicationStyles.sudoRadioInput} 
                   ${
                      !questionaryState.timeInMinistry
                         ? userVerificationApplicationStyles.inputChecked
                         : " "
                   }
                  `}
                  onClick={() =>
                     setQuestionaryState({ ...questionaryState, timeInMinistry: false })
                  }>
                  ❌
               </div>
            </div>
         </section>

         <section className={userVerificationApplicationStyles.radioInputWrapper}>
            <p>Do you have college-level biblical education?</p>
            <div className={userVerificationApplicationStyles.inputsWrapper}>
               <div
                  className={`${userVerificationApplicationStyles.sudoRadioInput} 
                    ${
                       questionaryState.bibleEducation
                          ? userVerificationApplicationStyles.inputChecked
                          : " "
                    }
                  `}
                  onClick={() =>
                     setQuestionaryState({ ...questionaryState, bibleEducation: true })
                  }>
                  ✅
               </div>
               <div
                  className={`${userVerificationApplicationStyles.sudoRadioInput} 
                    ${
                       !questionaryState.bibleEducation
                          ? userVerificationApplicationStyles.inputChecked
                          : " "
                    }
                  `}
                  onClick={() =>
                     setQuestionaryState({ ...questionaryState, bibleEducation: false })
                  }>
                  ❌
               </div>
            </div>
         </section>

         {questionaryState.bibleEducation && (
            <div
               className={`${userSettingsStyles.inputWrapper} ${userVerificationApplicationStyles.inputWrapper}`}>
               <label htmlFor='password'>What is your highest Degree?</label>
               <input
                  id='new-password'
                  type='text'
                  maxLength={100}
                  className={`std-input`}
                  ref={degree}
               />
            </div>
         )}

         <button className={`std-button`} onClick={submitRequest}>
            <p className={`std-button_gradient-text`}>Update</p>
         </button>
      </div>
   );
};

export default UserVerificationApplication;
