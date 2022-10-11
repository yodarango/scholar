// core
import { useRef, useState } from "react";

// graphQL
import client from "../../../apollo-client";
import { BUG_REPORT } from "../../../graphql/emails/content";
import { Primary } from "../../buttons/primary";

// comps
import { SmallLoader } from "../../chunks/small_loader";
import { InputPrimary } from "../../inputs/input_primary";
import { TextAreaPrimary } from "../../inputs/text_area_primary";
import { Header } from "../../Typography/header";
import { Parragraph } from "../../Typography/parragraph";
import { Notification } from "../notification";

// styles
import styles from "./bug_report.module.css";

export const BugReport = () => {
   // small loader
   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);
   const [isFormSubmittedState, setIsFormSubmittedState] = useState<boolean>(false);
   const [notificationPoupState, setNotificationPoupState] = useState<boolean | JSX.Element>(false);

   // inpiuts
   const where = useRef<HTMLInputElement>(null);
   const when = useRef<HTMLInputElement>(null);
   const who = useRef<HTMLInputElement>(null);
   const how = useRef<HTMLTextAreaElement>(null);

   // ================= Submit Request ===========
   const submitRequest = async () => {
      const whereValue = where.current;
      const whenValue = when.current;
      const whoValue = who.current;
      const howValue = how.current;

      if (whereValue?.value && whenValue?.value && whoValue?.value && howValue?.value) {
         setSmallLoaderState(true);
         try {
            const { data } = await client.mutate({
               mutation: BUG_REPORT,
               variables: {
                  where: whereValue.value,
                  when: whenValue.value,
                  who: whoValue.value,
                  how: howValue.value
               }
            });

            if (data.new_bug_report === true) {
               setSmallLoaderState(false);
               setIsFormSubmittedState(true);
               setNotificationPoupState(
                  <Notification
                     type='4'
                     cta={{ handleClose: () => setNotificationPoupState(false) }}
                     title='Form submitted successfully ✅'
                     body={
                        "Thank you for making scholar what it is. We are working every day to make it a better place for you! 👷‍♂️"
                     }
                  />
               );
            } else {
               setSmallLoaderState(false);
               setNotificationPoupState(
                  <Notification
                     type='4'
                     cta={{ handleClose: () => setNotificationPoupState(false) }}
                     title={`Something went wrong!`}
                     body='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  />
               );
            }
         } catch (error) {
            setSmallLoaderState(false);
            setNotificationPoupState(
               <Notification
                  type='4'
                  cta={{ handleClose: () => setNotificationPoupState(false) }}
                  title={`Something went wrong!`}
                  body='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               />
            );
         }
      } else {
         setNotificationPoupState(
            <Notification
               type='4'
               cta={{ handleClose: () => setNotificationPoupState(false) }}
               title='Empty fields detected ✋'
               body={"Please make sure all fields are filled out ✔️"}
            />
         );
      }
   };
   return (
      <div className={styles.mainWrapper}>
         {notificationPoupState}
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
         <div>
            <div className={styles.input}>
               <InputPrimary
                  type='text'
                  value=''
                  placeholder='What page is the bug on'
                  maxL={80}
                  cta={{ handleValue: () => {} }}
               />
            </div>
            <div className={styles.input}>
               <InputPrimary
                  type='date'
                  value=''
                  placeholder='mm/dd/yyyy'
                  maxL={80}
                  cta={{ handleValue: () => {} }}
               />
            </div>
            <div className={styles.input}>
               <InputPrimary
                  type='text'
                  value=''
                  placeholder='Your name'
                  maxL={80}
                  cta={{ handleValue: () => {} }}
               />
            </div>
            <div className={styles.input}>
               <TextAreaPrimary
                  maxLength={500}
                  defaultValue=''
                  placeHolder='Please tell us how to reproduce it...'
                  cta={{ handleCurrentValue: () => {} }}
               />
            </div>

            {!smallLoaderState && !isFormSubmittedState && (
               <div className={styles.button}>
                  <Primary title='Submit' type='1' />
               </div>
            )}
            {smallLoaderState && <SmallLoader />}
         </div>
      </div>
   );
};
