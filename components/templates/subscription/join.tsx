import { useRouter } from "next/router";

// graphql
import { client } from "../../../apollo-client";
import { CREATE_CHECKOUT_SESSION } from "../../../graphql/billing/billing";

//comps
import { Primary } from "../../fragments/buttons/primary";
import { Header } from "../../fragments/Typography/header";
import { Parragraph } from "../../fragments/Typography/parragraph";

// styles
import styles from "./join.module.css";
import { CloseContent } from "../../fragments/buttons/close_content";
import { UlListPrimary } from "../../fragments/lists/ul_list_primary";
import { CHECKOUT_MODE_PAYMENT } from "../../../constants/common";
import { useContext } from "react";
import { UserContext } from "../../../context";

export const JoinTemplate = () => {
   const userCtx = useContext(UserContext);
   const { user } = userCtx;

   // router
   const router = useRouter();

   //  create a session
   const oneTimePurchase = process.env.NEXT_PUBLIC_STRIPE_CUSTOM_ONE_TIME_ID;
   const stdSubscription = process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_ID;

   const handleCheckout = async (price_id: string | undefined, payment_mode: string) => {
      try {
         const { data } = await client.mutate({
            mutation: CREATE_CHECKOUT_SESSION,
            variables: {
               price_id: price_id || "",
               payment_mode
            }
         });

         if (data.create_checkout_session) {
            router.replace(data.create_checkout_session);
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.close}>
            <CloseContent cta={{ handleClick: () => router.push("/") }} />
         </div>
         <div className={styles.layer}>
            <div className={`${styles.graphics} ${user?.is_patron ? styles.isPatron : ""}`}></div>
         </div>
         {!user?.is_patron && (
            <>
               <Parragraph
                  size='main'
                  text='Running an app requires, time, and sacrifice. If you have enjoyed this app, consider helping financially and in exchange get access to premium features '
                  className={styles.textButtonTop}
               />
               <div className={styles.button}>
                  <Primary
                     title='Support with only 3.99/mo'
                     type='2'
                     cta={{
                        handleClick: () => handleCheckout(stdSubscription, CHECKOUT_MODE_PAYMENT)
                     }}
                  />
               </div>
               <div className={`${styles.cancel} ${styles.cancelFirst}`}>
                  <Parragraph italics size='small' align='center' text='Cancel anytime!' />
               </div>

               <div className={styles.button}>
                  <Primary
                     title='One time love donation ♡'
                     type='2'
                     cta={{
                        handleClick: () => handleCheckout(oneTimePurchase, CHECKOUT_MODE_PAYMENT)
                     }}
                  />
               </div>
               <div className={styles.cancel}>
                  <Parragraph italics size='small' align='center' text='Thank you, in advance!' />
               </div>
            </>
         )}
         {user?.is_patron && (
            <>
               <Parragraph
                  size='main'
                  text='Thank you for supporting Shrood. It means the world. To access your billing information, please go to billing.'
                  className={styles.textButtonTop}
               />
               <div className={styles.button}>
                  <Primary
                     title='Go to billing'
                     type='2'
                     cta={{
                        handleClick: () => handleCheckout(oneTimePurchase, CHECKOUT_MODE_PAYMENT)
                     }}
                  />
               </div>
            </>
         )}

         {/* why to be a patron list */}
         <section className={`${styles.section} ${styles.section1}`}>
            <div className={styles.secTitle}>
               <Header
                  quiet
                  size='large'
                  text='When you become a patron you help Shrood to:'
                  type={4}
               />
            </div>
            <div className={styles.secList}>
               <UlListPrimary
                  items={[
                     "Stay alive",
                     "Keep looking slick",
                     "Work great",
                     "Bring new features",
                     "Continue to grow and improve"
                  ]}
               />
            </div>
         </section>

         {/* Benefits of being a patron */}
         <section className={`${styles.section} ${styles.section2}`}>
            <div className={styles.secTitle}>
               <Header
                  quiet
                  size='large'
                  text='Are there any benefits to the being a patron?'
                  type={4}
               />
            </div>

            {/* patron benefits list */}
            <div className={styles.secList}>
               <UlListPrimary
                  items={[
                     "Unlimited posts",
                     "Unlimited reactions to posts",
                     "First access to upcoming features"
                  ]}
                  icon='checkmarkFilled'
               />
            </div>
         </section>
         <div className={styles.button}>
            <Primary title='Who is behind Shrood?' type='1' cta={{ handleClick: () => {} }} />
         </div>
         <div className='spacer--page-bottom'></div>
      </div>
   );
};
