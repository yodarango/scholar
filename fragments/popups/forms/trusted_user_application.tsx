import { useState } from "react";

// graphql
import { NEW_TRUSTED_USER_REQUEST } from "../../../graphql/emails/content";
import client from "../../../apollo-client";

// comps
import { InputPrimary } from "../../inputs/input_primary";
import { RadioPrimary } from "../../inputs/radio_primary";
import { Parragraph } from "../../Typography/parragraph";
import { SmallLoader } from "../../chunks/small_loader";
import { Primary } from "../../buttons/primary";
import Portal from "../../../hoc/potal";

// styles
import styles from "./trusted_user_application.module.css";
import { Notification } from "../notification";

// data
import { errorMessages } from "../../../data/error_messages";
const failFormSubmission = errorMessages.forms.failToSubmitForm;
const emptyField = errorMessages.forms.missingFormFields;
import { notificationMessages } from "../../../data/notification_messages";
const formSubmitted = notificationMessages.userVerificationSubmitted;

// types
type TquestionaryProps = {
   f_name: string;
   l_name: string;
   church: string;
   age: boolean;
   ministry: string;
   timeInMinistry: boolean;
   bibleEducation: boolean;
   degree: string;
};

export const TrustedUserApplicationForm = () => {
   // state
   const [HLEducation, setHLEducation] = useState<number>(0);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);

   // notification wrapper
   const [notification, setnotification] = useState<boolean | JSX.Element>(false);

   // small loader state
   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);

   const [formData, setformData] = useState<TquestionaryProps>({
      f_name: "",
      l_name: "",
      church: "",
      age: false,
      ministry: "",
      timeInMinistry: false,
      bibleEducation: false,
      degree: ""
   });

   // handle updat notification state
   const updateNotification = (body: string, type: string, title: string) =>
      setnotification(
         <Notification
            type={type}
            body={body}
            title={title}
            cta={{ handleClose: () => setnotification(false) }}
         />
      );

   //  submit the request
   const handleFormSubmission: any = async (e: any) => {
      e.preventDefault();
      console.log(formData);

      //   const { f_name, l_name, church, age, ministry, timeInMinistry, bibleEducation, degree } =
      //      formData;

      //   if (f_name && l_name && church && ministry) {
      //      if ((formData.bibleEducation && degree != "") || !formData.bibleEducation) {
      //         setSmallLoaderState(true);
      //         try {
      //            const { data } = await client.mutate({
      //               mutation: NEW_TRUSTED_USER_REQUEST,
      //               variables: {
      //                  church,
      //                  f_name,
      //                  l_name: l_name,
      //                  age,
      //                  ministry,
      //                  timeInMinistry,
      //                  bibleEducation,
      //                  degree
      //               }
      //            });

      //            if (data.trusted_user_application === true) {
      //               setSmallLoaderState(false);
      //               updateNotification(formSubmitted.body, "2", formSubmitted.title);
      //            } else {
      //               setSmallLoaderState(false);
      //               updateNotification(failFormSubmission.body, "4", failFormSubmission.title);
      //            }
      //         } catch (error) {
      //            setSmallLoaderState(false);
      //            updateNotification(failFormSubmission.body, "4", failFormSubmission.title);
      //         }
      //      } else if (formData.bibleEducation && !degree) {
      //         updateNotification(emptyField.body, "4", emptyField.title);
      //      }
      //   } else {
      //      updateNotification(emptyField.body, "4", emptyField.title);
      //   }
   };

   return (
      <div className={styles.mainWrapper}>
         <Portal>{notification}</Portal>
         <form onSubmit={handleFormSubmission}>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value=''
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
                  value=''
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
                  value=''
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
                  value=''
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
                     value=''
                     placeholder='What is your highest Degree?'
                     cta={{ handleValue: (degree: string) => setformData({ ...formData, degree }) }}
                  />
               </div>
            )}

            <div className='spacer--l'></div>

            {!smallLoader && (
               <div className={styles.button}>
                  <Primary title='Submit' type='1' cta={{ handleClick: handleFormSubmission }} />
               </div>
            )}
            {smallLoader && <SmallLoader />}
         </form>
      </div>
   );
};
