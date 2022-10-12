// core
import { useRef, useState } from "react";

// graphQl
import client from "../../apollo-client";
import { NEW_TRUSTED_USER_REQUEST } from "../../graphql/emails/content";

// comps
import { SmallLoader } from "../../fragments/chunks/small_loader";
import { Notification } from "../../fragments/popups/notification";

// styles
import styles from "./trusted_user_application.module.css";

// data
import { notificationMessages } from "../../data/notification_messages";
import { errorMessages } from "../../data/error_messages";
import { TrustedUserApplicationForm } from "../../fragments/popups/forms/trusted_user_application";
import { PrimaryStack } from "../../layouts/stacks/templates/primary_stack";
import { useRouter } from "next/router";
import { Parragraph } from "../../fragments/Typography/parragraph";
const failFormSubmission = errorMessages.forms.failToSubmitForm;
const emptyField = errorMessages.forms.missingFormFields;
const formSubmitted = notificationMessages.userVerificationSubmitted;

type userVerificationApplicationProps = {
   user_data?: {
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

export const TrustedUserApplication = ({ user_data }: userVerificationApplicationProps) => {
   // notificatipn wrapper
   const [notification, setnotification] = useState<boolean | JSX.Element>(false);

   // small loader state
   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);
   // has user submitted the form?
   const [isFormSubmittedState, setIsFormSubmittedState] = useState(false);

   // router
   const router = useRouter();

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
   const submitRequest = async () => {
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
            setSmallLoaderState(true);
            try {
               const { data } = await client.mutate({
                  mutation: NEW_TRUSTED_USER_REQUEST,
                  variables: {
                     church: churchValue.value,
                     f_name: firstnameValue.value,
                     l_name: lastameValue.value,
                     age: questionaryState.age,
                     ministry: minsitryValue.value,
                     timeInMinistry: questionaryState.timeInMinistry,
                     bibleEducation: questionaryState.bibleEducation,
                     degree: degreeValue?.value
                  }
               });

               if (data.trusted_user_application === true) {
                  setSmallLoaderState(false);
                  setIsFormSubmittedState(true);
                  updateNotification(formSubmitted.body, "2", formSubmitted.title);
               } else {
                  setSmallLoaderState(false);
                  updateNotification(failFormSubmission.body, "2", failFormSubmission.title);
               }
            } catch (error) {
               setSmallLoaderState(false);
               updateNotification(failFormSubmission.body, "2", failFormSubmission.title);
            }
         } else if (questionaryState.bibleEducation && !degreeValue?.value) {
         }
      } else {
         updateNotification(emptyField.body, "4", emptyField.title);
      }
   };

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

   return (
      <>
         {notification}
         <PrimaryStack
            cta={{ handleClose: () => router.back() }}
            title='Become a trusted user'
            icon='star'>
            <Parragraph text='What is a trusted user? ' size='main' bold quiet />
            <Parragraph
               text={
                  <>
                     A trusted user is someone whom, by the grace of our Lord, has proven to be
                     faithful to God and His word. Someone who is qualified by time in the ministry,
                     formal biblical education, or both to teach others.
                     <br />
                     <br />A trusted user is someone who's content can be trusted with higher
                     reliability, thus helping equip the community who benefit from their content.
                     Because a trusted user must be deemed reliable, each submission is carefully
                     examined and may or may not be approved.
                  </>
               }
               size='small'
            />

            <TrustedUserApplicationForm />
         </PrimaryStack>
         {!smallLoaderState && !isFormSubmittedState && (
            <button className={`std-button`} onClick={submitRequest}>
               <p className={`std-button_gradient-text`}>Submit</p>
            </button>
         )}
         {smallLoaderState && <SmallLoader />}
      </>
   );
};
