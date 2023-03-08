import { useState } from "react";

// comps
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { RadioPrimary } from "../../fragments/inputs/radio_primary";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { SmallLoader } from "../../fragments/chunks/small_loader";
import { Primary } from "../../fragments/buttons/primary";
import Portal from "../../hoc/potal";

// styles
import styles from "./trusted_user_application.module.css";
import { Notification } from "../../fragments/popups/notification";

// data
import { handleBecomeTrusteduser, Tvariables } from "../../../helpers/functions/feedback/users";
import { notificationMessages } from "../../../data/notification_messages";
const formSubmitted = notificationMessages.userVerificationSubmitted;
const failFormSubmission = errorMessages.forms.failToSubmitForm;
import { errorMessages } from "../../../data/error_messages";
const emptyField = errorMessages.forms.missingFormFields;

export const TrustedUserApplicationForm = () => {
   // state
   const [HLEducation, setHLEducation] = useState<number>(0);
   const [loading, setloading] = useState<string>("done");
   const [notification, setnotification] =
      useState<{ title: string; body: string; type: string } | null>(null);

   const [formData, setformData] = useState<Tvariables>({
      timeInMinistry: false,
      bibleEducation: false,
      ministry: "",
      f_name: "",
      l_name: "",
      church: "",
      age: false,
      degree: ""
   });

   //  submit the request
   const handleFormSubmission = async () => {
      try {
         const { data } = await handleBecomeTrusteduser(formData);
         if (data?.trusted_user_application) {
            setnotification({
               title: formSubmitted.title,
               body: formSubmitted.body,
               type: "2"
            });
            setformData({
               timeInMinistry: false,
               bibleEducation: false,
               ministry: "",
               f_name: "",
               l_name: "",
               church: "",
               age: false,
               degree: ""
            });
         } else {
            setnotification({
               title: failFormSubmission.title,
               body: failFormSubmission.body,
               type: "4"
            });
         }
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <div className={styles.mainWrapper}>
         {notification && (
            <Portal>
               <Notification
                  title={notification.title}
                  type={notification.type}
                  body={notification.body}
                  cta={{ handleClose: () => setnotification(null) }}
               />
            </Portal>
         )}
         <form onSubmit={handleFormSubmission}>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value={formData.f_name}
                  type='text'
                  placeholder='First name'
                  cta={{
                     handleValue: (f_name: string) => setformData({ ...formData, f_name })
                  }}
               />
            </div>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value={formData.l_name}
                  type='text'
                  placeholder='Last name'
                  cta={{
                     handleValue: (l_name: string) => setformData({ ...formData, l_name })
                  }}
               />
            </div>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value={formData.church}
                  type='text'
                  placeholder='Local church'
                  cta={{
                     handleValue: (church: string) => setformData({ ...formData, church })
                  }}
               />
            </div>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value={formData.ministry}
                  type='text'
                  placeholder='Active ministry'
                  cta={{
                     handleValue: (ministry: string) => setformData({ ...formData, ministry })
                  }}
               />
            </div>

            <div className={styles.radioInput}>
               <div className={styles.radioParragraph}>
                  <Parragraph text='Are you at least 40 years or older?' size='main' />
               </div>
               <div className={styles.radio}>
                  <RadioPrimary
                     icon={{ primary: "close", secondary: "checkmark" }}
                     text={{ primary: "No", secondary: "Yes" }}
                     cta={{
                        handleOptionSelection: (age: number) =>
                           setformData({ ...formData, age: age === 0 ? false : true })
                     }}
                  />
               </div>
            </div>

            <div className={styles.radioInput}>
               <div className={styles.radioParragraph}>
                  <Parragraph
                     text='Have you been in the current ministry for at least 10 years?'
                     size='main'
                  />
               </div>
               <div className={styles.radio}>
                  <RadioPrimary
                     icon={{ primary: "close", secondary: "checkmark" }}
                     text={{ primary: "No", secondary: "Yes" }}
                     cta={{
                        handleOptionSelection: (tim: number) =>
                           setformData({ ...formData, timeInMinistry: tim === 0 ? false : true })
                     }}
                  />
               </div>
            </div>

            <div className={styles.radioInput}>
               <div className={styles.radioParragraph}>
                  <Parragraph text='Do you have any college-level biblical education' size='main' />
               </div>

               <div className={styles.radio}>
                  <RadioPrimary
                     icon={{ primary: "close", secondary: "checkmark" }}
                     text={{ primary: "No", secondary: "Yes" }}
                     cta={{
                        handleOptionSelection: (option: number) => (
                           setHLEducation(option),
                           setformData({ ...formData, bibleEducation: option === 0 ? false : true })
                        )
                     }}
                  />
               </div>
            </div>

            {HLEducation === 1 && (
               <div className={styles.input}>
                  <InputPrimary
                     maxL={100}
                     type='text'
                     value={formData.degree}
                     placeholder='What is your highest Degree?'
                     cta={{ handleValue: (degree: string) => setformData({ ...formData, degree }) }}
                  />
               </div>
            )}

            <div className='spacer--l'></div>

            {loading !== "loading" && (
               <div className={styles.button}>
                  <Primary
                     title='Submit'
                     type='1'
                     cta={{ handleClick: handleFormSubmission }}
                     htmlType='button'
                  />
               </div>
            )}
            {loading === "loading" && <SmallLoader />}
         </form>
      </div>
   );
};
