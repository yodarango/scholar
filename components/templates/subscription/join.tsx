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

export const JoinTemplate = () => {
   // router
   const router = useRouter();

   //  create a session
   const oneTimePurchase = process.env.NEXT_PUBLIC_STRIPE_CUSTOM_ONE_TIME_ID;
   const stdSubscription = process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_ID;

   const handleCheckout = async (price_id: string | undefined, payment_mode: string) => {
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
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.close}>
            <CloseContent cta={{ handleClick: () => router.back() }} />
         </div>
         <div className={styles.layer}>
            <div className={styles.graphics}></div>
         </div>
         <div className={styles.button}>
            <Primary
               title='Support with only 3.99/mo'
               type='2'
               cta={{ handleClick: () => handleCheckout(stdSubscription, CHECKOUT_MODE_PAYMENT) }}
            />
         </div>
         <div className={`${styles.cancel} ${styles.cancelFirst}`}>
            <Parragraph italics size='small' align='center' text='Cancel anytime!' />
         </div>

         <div className={styles.button}>
            <Primary
               title='One time love donation ♡'
               type='2'
               cta={{ handleClick: () => handleCheckout(oneTimePurchase, CHECKOUT_MODE_PAYMENT) }}
            />
         </div>
         <div className={styles.cancel}>
            <Parragraph italics size='small' align='center' text='Thank you, in advance!' />
         </div>

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
