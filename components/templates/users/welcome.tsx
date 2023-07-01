import { useContext, useEffect, useState } from "react";
import { getIsFirstTimeSignUp } from "../../../helpers/functions/users/get_is_first_time_sign_up";
import { Primary } from "../../fragments/buttons/primary";
import { UlListPrimary } from "../../fragments/lists/ul_list_primary";
import { Header } from "../../fragments/Typography/header";
import { InternalLink } from "../../fragments/Typography/internal_link";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Layer2 } from "../../layouts/backgrounds/layer_2";
import { errorMessages } from "../../../data/error_messages";
const unknownError = errorMessages.unknown.a;

// styles
import styles from "./welcome.module.css";
import { useAcceptTerms } from "../../../hooks/use_accpet_terms";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";
import { Notification } from "../../fragments/popups/notification";

export const WelcomeTemplate = () => {
   const [renderContent, setRenderContent] = useState(false);
   const [notification, setNotification] = useState(false);
   const userCtx = useContext(UserContext);
   const router = useRouter();
   const { user } = userCtx;

   const getData = async () => {
      try {
         const data = await getIsFirstTimeSignUp();

         if (data) {
            if (data.data === true) {
               setRenderContent(true);
            } else {
               window.location.href = "/users/@me";
            }
         } else {
            setRenderContent(true);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const acceptTerms = async () => {
      try {
         const { data, status, error } = await useAcceptTerms();

         if (status === "done") {
            if (data) {
               window.location.href = "/users/@me";
            } else {
               setNotification(true);
            }
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (user) {
         if (user !== "none") getData();
         else {
            router.push("/login");
         }
      }
   }, [user]);

   return (
      <>
         {notification && (
            <Notification
               type='4'
               body={unknownError.body}
               title={unknownError.title}
               cta={{ handleClose: () => setNotification(false) }}
            />
         )}
         {renderContent && (
            <Layer2>
               <div className={styles.mainWrapper}>
                  <div className={styles.logoWrapper}>
                     <div className={styles.logo}></div>
                     <div className={styles.title}>
                        <Header type={3} align='center' size='xlarge' text='Welcome to Shrood' />
                     </div>
                     <div className={styles.desc}>
                        <Parragraph
                           size='large'
                           text='Thank you for registering It is the goal of Shrood to help you love, learn, and share the Word of God with others. '
                        />
                     </div>
                  </div>

                  <section className={styles.list}>
                     <div className={styles.title}>
                        <Header
                           type={4}
                           size='large'
                           text='Here are some ways you can help Shrood be a safe and Godly platform:'
                        />
                     </div>
                     <UlListPrimary
                        icon='checkmarkFilled'
                        items={[
                           "Pray for the platform",
                           "Be kind to others",
                           "Think before you post",
                           "Be honest and truthful",
                           "Report negative activity",
                           "Share the app with others"
                        ]}
                     />
                  </section>

                  <section className={styles.links}>
                     <div className={styles.title}>
                        <Header type={4} text='By proceeding you agree to our:' size='large' />
                     </div>

                     <div className={styles.link}>
                        <InternalLink type='3' size='small' href='/privacy'>
                           Privacy policy
                        </InternalLink>
                     </div>
                     <div className={styles.link}>
                        <InternalLink type='3' size='small' href='/terms-and-conditions'>
                           Terms and conditions
                        </InternalLink>
                     </div>
                  </section>

                  <div className={styles.continue}>
                     <Primary type='2' title='Continue' cta={{ handleClick: acceptTerms }} />
                  </div>
               </div>
            </Layer2>
         )}
      </>
   );
};
