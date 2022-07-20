// core
import { useRef, useState } from "react";

// graphQL
import client from "../../../apollo-client";
import { BUG_REPORT } from "../../../graphql/emails/content";

// comps
import SmallLoader from "../../chunks/small-loader";
import NotificationPopup from "../notification";

// styles
import bugReportStyles from "../../../styles/fragments/popup-content/forms/BugReport.module.css";

const BugReport = () => {
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
                  <NotificationPopup
                     newClass='notification-wrapper--Success'
                     closeModal={() => setNotificationPoupState(false)}
                     title='Form submitted successfully ✅'
                     contentString={
                        "Thank you for making scholar what it is. We are working every day to make it a better place for you! 👷‍♂️"
                     }
                  />
               );
            } else {
               setSmallLoaderState(false);
               setNotificationPoupState(
                  <NotificationPopup
                     closeModal={() => setNotificationPoupState(false)}
                     title={`Something went wrong!`}
                     contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                     newClass='notification-wrapper--Error'
                  />
               );
            }
         } catch (error) {
            setSmallLoaderState(false);
            setNotificationPoupState(
               <NotificationPopup
                  closeModal={() => setNotificationPoupState(false)}
                  title={`Something went wrong!`}
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } else {
         setNotificationPoupState(
            <NotificationPopup
               newClass='notification-wrapper--Error'
               closeModal={() => setNotificationPoupState(false)}
               title='Empty fields detected ✋'
               contentString={"Please make sure all fields are filled out ✔️"}
            />
         );
      }
   };
   return (
      <div className='mian-wrapper'>
         {notificationPoupState}
         <h2 className={`${bugReportStyles.title}`}>Help Scholar Remain Efficient</h2>
         <p>
            Every time you submit a bug report you help scholar to stay alive, efficient, and keep
            improving. Please give us as much details as you can on how we can reproduce this issue
            and where did you find it.
         </p>
         <h3 className={bugReportStyles.smallTitle}>Thank you for making Scholar what it is! </h3>
         <div>
            <div className={`${bugReportStyles.inputWrapper}`}>
               <label htmlFor='password'>What page did you find the bug?</label>
               <input
                  id='where'
                  type='text'
                  maxLength={200}
                  className={`std-input`}
                  placeholder='ex: /library/locations?area=tn'
                  ref={where}
               />
            </div>
            <div className={`${bugReportStyles.inputWrapper}`}>
               <label htmlFor='password'>When did you find it</label>
               <input id='when' type='date' maxLength={100} className={`std-input`} ref={when} />
            </div>
            <div className={`${bugReportStyles.inputWrapper}`}>
               <label htmlFor='password'>Your name</label>
               <input id='who' type='text' maxLength={100} className={`std-input`} ref={who} />
            </div>
            <div className={`${bugReportStyles.inputWrapper}`}>
               <label htmlFor='password'>Steps to reproduce the bug</label>
               <textarea id='how' maxLength={500} className={`std-text-area`} ref={how}></textarea>
            </div>

            {!smallLoaderState && !isFormSubmittedState && (
               <button className={`std-button`} onClick={submitRequest}>
                  <p className={`std-button_gradient-text`}>Submit</p>
               </button>
            )}
            {smallLoaderState && <SmallLoader />}
         </div>
      </div>
   );
};

export default BugReport;
