// core
import { useRouter } from "next/router";
import { useState } from "react";

// graphQL
import { client } from "../../../apollo-client";
import { BUG_REPORT } from "../../../graphql/emails/content";
import { PrimaryStack } from "../stacks/templates/primary_stack";
import { Primary } from "../../fragments/buttons/primary";

// comps
import { SmallLoader } from "../../fragments/chunks/small_loader";
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { TextAreaPrimary } from "../../fragments/inputs/text_area_primary";
import { Header } from "../../fragments/Typography/header";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Notification } from "../../fragments/popups/notification";

// styles
import styles from "./bug_report.module.css";

// data
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";
const formError = errorMessages.forms.failToSubmitForm;
const missingFieldsError = errorMessages.forms.missingFormFields;
const submittedForm = notificationMessages.bugReportSubmitted;

// types
type TformData = {
   where: string;
   when: string;
   who: string;
   how: string;
};

export const BugReport = () => {
   // state
   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);
   const [notification, setnotification] = useState<boolean | JSX.Element>(false);
   const [formData, setformData] = useState<TformData>({ where: "", when: "", who: "", how: "" });

   // router
   const router = useRouter();

   // inputs
   const updateNotification = (body: string, type: string, title: string) =>
      setnotification(
         <Notification
            type={type}
            body={body}
            title={title}
            cta={{ handleClose: () => setnotification(false) }}
         />
      );

   //  Submit Request
   const handleFormSubmission: any = async (e: any) => {
      e.preventDefault();
      const { where, when, who, how } = formData;

      if (where && when && who && how) {
         setSmallLoaderState(true);
         try {
            const { data } = await client.mutate({
               mutation: BUG_REPORT,
               variables: {
                  where,
                  when,
                  who,
                  how
               }
            });
            if (data.new_bug_report === true) {
               setSmallLoaderState(false);
               updateNotification(submittedForm.body, "2", submittedForm.title);
            } else {
               setSmallLoaderState(false);
               updateNotification(formError.body, "4", formError.title);
            }
         } catch (error) {
            setSmallLoaderState(false);
            updateNotification(formError.body, "4", formError.title);
         }
      } else {
         updateNotification(missingFieldsError.body, "4", missingFieldsError.title);
      }
   };

   return (
      <PrimaryStack title='Bug Report' cta={{ handleClose: () => router.back() }} icon='bug'>
         <div className={styles.mainWrapper}>
            {notification}
            <div className={styles.title}>
               <Header text='Help scholar stay great' size='main' quiet type={3} />
            </div>
            <div className={styles.description}>
               <Parragraph
                  size='small'
                  text=' Every time you submit a bug report you help scholar to stay alive, efficient, and keep
            improving. Please give us as much details as you can on how we can reproduce this issue
            and where did you find it.'
               />
            </div>
            <div className={styles.bottomNote}>
               <Parragraph size='main' text='Thank you for making Scholar what is it' quiet />
            </div>

            {/* form fields */}
            <form>
               <div className={styles.input}>
                  <InputPrimary
                     type='text'
                     value=''
                     placeholder='What page is the bug on'
                     maxL={80}
                     cta={{ handleValue: (where: string) => setformData({ ...formData, where }) }}
                  />
               </div>
               <div className={styles.input}>
                  <InputPrimary
                     type='date'
                     value=''
                     placeholder='mm/dd/yyyy'
                     maxL={80}
                     cta={{ handleValue: (when: string) => setformData({ ...formData, when }) }}
                  />
               </div>
               <div className={styles.input}>
                  <InputPrimary
                     type='text'
                     value=''
                     placeholder='Your name'
                     maxL={80}
                     cta={{ handleValue: (who: string) => setformData({ ...formData, who }) }}
                  />
               </div>
               <div className={styles.input}>
                  <TextAreaPrimary
                     maxLength={500}
                     defaultValue=''
                     placeHolder='Please tell us how to reproduce it...'
                     cta={{
                        handleCurrentValue: (how: string) => setformData({ ...formData, how })
                     }}
                  />
               </div>

               {!smallLoaderState && (
                  <div className={styles.button}>
                     <Primary
                        title='Submit'
                        type='1'
                        cta={{ handleClick: handleFormSubmission }}
                        htmlType='button'
                     />
                  </div>
               )}
               {smallLoaderState && <SmallLoader />}
            </form>
         </div>
      </PrimaryStack>
   );
};
