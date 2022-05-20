// core
import { useState } from "react";
import Image from "next/image";

// graphQL
import client from "../../apollo-client";
import { ACCEPT_INTRO_INTRUCTIONS } from "../../graphql/users/profile";

// styles
import newUserStyles from "../../styles/layouts/sudo-pages/NewUser.module.css";
import NotificationPopup from "../../fragments/notification-popup";

type newuserProps = {
   acceptedIntroTerms: any;
};

const NewUser = ({ acceptedIntroTerms }: newuserProps) => {
   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>(
      false
   );

   //============= FUNCTION: handle the acceptrance of intro terms
   const acceptIntroInstructions = async () => {
      try {
         const { data } = await client.mutate({
            mutation: ACCEPT_INTRO_INTRUCTIONS
         });

         if (data.accept_intro_terms) {
            acceptedIntroTerms();
         } else {
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title={`Something went wrong!`}
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         console.log(error);
         setNotificationPopUpState(
            <NotificationPopup
               closeModal={() => setNotificationPopUpState(false)}
               title={`Something went wrong!`}
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   return (
      <>
         {notificationPopUpState}

         <div className={`dark-bkg `}>
            <div className={`${newUserStyles.contentWrapper}`}>
               <h2 className={`std-button_gradient-text ${newUserStyles.title}`}>
                  WELCOME TO SCHOLAR
               </h2>
               <div className={newUserStyles.introLogo}>
                  <Image src={"/images/logo.png"} alt='app logo' layout='fill' />
               </div>
               <section>
                  <p>
                     Thank you for registring 😃
                     <br />
                     It is the goal of <span>Scholar</span> to help you love, learn, and share the
                     Word of God with others. Here are some ways you can help shcolar be a safe and
                     godly platform:
                  </p>
                  <ul>
                     <li>Pray for the platform 🙏🏼</li>
                     <li>Be kind 💕</li>
                     <li>Think throughly every post ✍️</li>
                     <li>be honest and truthful 🌱</li>
                     <li>Report negative activity 🚫</li>
                     <li>Share this app with friends and family 📱</li>
                  </ul>
               </section>
               <button className='std-button' onClick={acceptIntroInstructions}>
                  <p className='std-button_gradient-text'>Done</p>
               </button>
            </div>
         </div>
      </>
   );
};

export default NewUser;
