// core
import { useRouter } from "next/router";
import { useState } from "react";

// graphQL
import { PrimaryStack } from "../stacks/templates/primary_stack";
import { Primary } from "../../fragments/buttons/primary";

// comps
import { TextAreaPrimary } from "../../fragments/inputs/text_area_primary";
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Notification } from "../../fragments/popups/notification";
import { SmallLoader } from "../../fragments/chunks/small_loader";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./bug_report.module.css";

// data
import { handleBugReport } from "../../../helpers/functions/feedback/content";
import { notificationMessages } from "../../../data/notification_messages";
import { errorMessages } from "../../../data/error_messages";
import Portal from "../../hoc/potal";

const missingFieldsError = errorMessages.forms.missingFormFields;
const submittedForm = notificationMessages.bugReportSubmitted;
const formError = errorMessages.forms.failToSubmitForm;

// types
type TformData = {
   where: string;
   when: string;
   who: string;
   how: string;
};

export const BugReport = () => {
   // state
   const [formData, setformData] = useState<TformData>({ where: "", when: "", who: "", how: "" });
   const [notification, setnotification] =
      useState<{ title: string; body: string; type: string } | null>(null);
   const [loading, setloading] = useState<string>("done");

   // router
   const router = useRouter();

   //  Submit Request
   const handleFormSubmission: any = async (e: any) => {
      e.preventDefault();

      try {
         const { where, when, who, how } = formData;
         if (where && when && who && how) {
            setloading("loading");

            const { data } = await handleBugReport({ where, when, who, how });
            setformData({ where: "", when: "", who: "", how: "" });
            if (data.new_bug_report) {
               setloading("done");
               setnotification({ body: submittedForm.body, title: submittedForm.title, type: "2" });
            } else {
               setnotification({ body: formError.body, title: formError.title, type: "4" });
            }
         } else {
            setnotification({
               title: missingFieldsError.title,
               body: missingFieldsError.body,
               type: "3"
            });
         }
      } catch (error) {
         console.error(error);
         setnotification({ body: formError.body, title: formError.title, type: "4" });
      }
   };

   return (
      <>
         {notification && (
            <Portal>
               <Notification
                  title={notification.title}
                  type={notification.type}
                  body={notification.body}
                  cta={{
                     handleClose: () => setnotification(null)
                  }}
               />
            </Portal>
         )}
         <PrimaryStack title='Bug Report' cta={{ handleClose: () => router.back() }} icon='bug'>
            <div className={styles.mainWrapper}>
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
                        value={formData.where}
                        placeholder='What page is the bug on'
                        maxL={80}
                        cta={{
                           handleValue: (where: string) => setformData({ ...formData, where })
                        }}
                     />
                  </div>
                  <div className={styles.input}>
                     <InputPrimary
                        type='date'
                        value={formData.when}
                        placeholder='mm/dd/yyyy'
                        maxL={80}
                        cta={{ handleValue: (when: string) => setformData({ ...formData, when }) }}
                     />
                  </div>
                  <div className={styles.input}>
                     <InputPrimary
                        type='text'
                        value={formData.who}
                        placeholder='Your name'
                        maxL={80}
                        cta={{ handleValue: (who: string) => setformData({ ...formData, who }) }}
                     />
                  </div>
                  <div className={styles.input}>
                     <TextAreaPrimary
                        maxLength={500}
                        defaultValue={formData.how}
                        placeHolder='Please tell us how to reproduce it...'
                        cta={{
                           handleCurrentValue: (how: string) => setformData({ ...formData, how })
                        }}
                     />
                  </div>

                  {loading === "done" && (
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
         </PrimaryStack>
      </>
   );
};
