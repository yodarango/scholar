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
import { CHECKOUT_MODE_PAYMENT, CHECKOUT_MODE_SUBSCRIPTION } from "../../../constants/common";
import { useContext, useState } from "react";
import { UserContext } from "../../../context";
import { YouNeedToLoginModal } from "../../common/modals/you_need_to_login_modal";

export const JoinTemplate = () => {
   const userCtx = useContext(UserContext);
   const [modal, setModal] = useState<boolean>(false);

   const { user } = userCtx;

   // router
   const router = useRouter();

   //  create a session
   const oneTimePurchase = 1;
   const stdSubscription = 2;
   const premiumSubscription = 3;

   const handleCheckout = async (price_id: number, payment_mode: string) => {
      if (!user?.ID) {
         setModal(true);
         return;
      }

      try {
         const { data } = await client.mutate({
            mutation: CREATE_CHECKOUT_SESSION,
            variables: {
               price_id: price_id || 0,
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
         <YouNeedToLoginModal open={modal} onClose={() => setModal(false)} />
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
                  text='Running an app requires, time, and sacrifice. If you have enjoyed this app, consider helping financially and in exchange get access to premium features. No worries, you can cancel anytime!'
                  className={styles.textButtonTop}
               />
               <div className={styles.button}>
                  <Primary
                     title='Support with only 4.99/mo'
                     type='2'
                     cta={{
                        handleClick: () =>
                           handleCheckout(stdSubscription, CHECKOUT_MODE_SUBSCRIPTION)
                     }}
                  />
               </div>
               <div className={`${styles.cancel} ${styles.cancelFirst}`}>
                  <Parragraph italics size='small' align='center' text='(Standard patron)' />
               </div>
               <div className={styles.button}>
                  <Primary
                     title='Support with only 10.99/mo'
                     type='2'
                     cta={{
                        handleClick: () =>
                           handleCheckout(premiumSubscription, CHECKOUT_MODE_SUBSCRIPTION)
                     }}
                  />
               </div>
               <div className={`${styles.cancel} ${styles.cancelFirst}`}>
                  <Parragraph italics size='small' align='center' text='(Premium patron)' />
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
                  <Parragraph italics size='small' align='center' text='(Thank you, in advance!)' />
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
                  <Primary title='Go to billing' type='2' href='/subscription/billing' />
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
                  icon='checkmark'
               />
            </div>
         </section>

         {/* Benefits of being a patron */}
         <section className={`${styles.section} ${styles.section2}`}>
            <div className={styles.secTitle}>
               <Header quiet size='large' text='Standard Patron benefits' type={4} />
            </div>

            {/* patron benefits list */}
            <div className={styles.secList}>
               <UlListPrimary
                  items={[
                     "Unlimited posts",
                     "Unlimited reactions to posts",
                     "unlimited post folders",
                     "First access to upcoming features"
                  ]}
                  icon='checkmarkFilled'
               />
            </div>
         </section>

         <section className={`${styles.section} ${styles.section2}`}>
            <div className={styles.secTitle}>
               <Header quiet size='large' text='Standard Patron benefits' type={4} />
            </div>

            {/* patron benefits list */}
            <div className={styles.secList}>
               <UlListPrimary
                  items={[
                     "All standard patron benefits",
                     "text to image generation",
                     `upcoming "smart" features`
                  ]}
                  icon='checkmarkFilled'
               />
            </div>
         </section>
         {/* <div className={styles.button}>
            <Primary title='Who is behind Shrood?' type='1' cta={{ handleClick: () => {} }} />
         </div> */}
         <div className='spacer--page-bottom'></div>
      </div>
   );
};
