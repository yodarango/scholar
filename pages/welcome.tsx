// core
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// graphQL
import client from "../apollo-client";
import { ACCEPT_INTRO_INTRUCTIONS } from "../graphql/users/profile";

// styles
import newUserStyles from "../../styles/layouts/sudo-pages/NewUser.module.css";
import NotificationPopup from "../fragments/popups/notification";

type newuserProps = {
   acceptedIntroTerms: any;
};

const Welcome = ({ acceptedIntroTerms }: newuserProps) => {
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
         console.error(error);
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
                  WELCOME TO SHROOD
               </h2>
               <div className={newUserStyles.introLogo}>
                  <Image src={"/images/logo.png"} alt='app logo' layout='fill' />
               </div>
               <section>
                  <p>
                     Thank you for registering 😃
                     <br />
                     It is the goal of <span>Shrood</span> to help you love, learn, and share the
                     Word of God with others. Here are some ways you can help Shrood be a safe and
                     Godly platform:
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
               <p>
                  By proceeding you agree to our{" "}
                  <Link href='/privacy'>
                     <a className='std-url'>Privacy Policy</a>
                  </Link>{" "}
                  and our{" "}
                  <Link href='/terms-of-use'>
                     <a className='std-url'>Terms Of Use</a>
                  </Link>
               </p>
               <button className='std-button' onClick={acceptIntroInstructions}>
                  <p className='std-button_gradient-text'>Done</p>
               </button>
               <div className='large-spacer'></div>
            </div>
         </div>
      </>
   );
};

export default NewUser;
