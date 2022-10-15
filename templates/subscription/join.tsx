import { useRouter } from "next/router";

// graphql
import client from "../../apollo-client";
import { CREATE_CHECKOUT_SESSION } from "../../graphql/billing/billing";

//comps
import { Primary } from "../../fragments/buttons/primary";
import { Header } from "../../fragments/Typography/header";
import { Parragraph } from "../../fragments/Typography/parragraph";

// styles
import styles from "./join.module.css";
import { Icon } from "../../fragments/chunks/icons";
import { CloseContent } from "../../fragments/buttons/close_content";

export const JoinTemplate = () => {
   // router
   const router = useRouter();

   //  Create checkout Session if user does not have any
   const productId = process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID;
   const handleCheckout = async () => {
      const { data } = await client.mutate({
         mutation: CREATE_CHECKOUT_SESSION,
         variables: {
            price_id: `${productId}`
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
            <Primary title='Join only for 3.99/mo' type='2' cta={{ handleClick: handleCheckout }} />
         </div>
         <div className={styles.cancel}>
            <Parragraph italics size='small' align='center' text='Cancel anytime!' />
         </div>

         {/* why to be a patron list */}
         <section className={`${styles.section} ${styles.section1}`}>
            <div className={styles.secTitle}>
               <Header
                  quiet
                  size='large'
                  text='When you become a patron you help Scholar to:'
                  type={4}
               />
            </div>
            <div className={styles.secList}>
               <ul>
                  <li>Stay alive</li>
                  <li>Keep looking slick</li>
                  <li>Work great</li>
                  <li>Bring new features</li>
                  <li>Continue to grow and improve</li>
               </ul>
            </div>
         </section>

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
               <ul>
                  <li>
                     <div>
                        <span className={styles.listIcon}>
                           <Icon name='checkmarkFilled' color='#F1EAFF' />
                        </span>
                        <Parragraph text='Unlimited posts' size='main' lineHieght='.9em' />
                     </div>
                  </li>
                  <li>
                     <div>
                        <span className={styles.listIcon}>
                           <Icon name='checkmarkFilled' color='#F1EAFF' />
                        </span>
                        <Parragraph
                           text='Unlimited reactions to posts'
                           size='main'
                           lineHieght='.9em'
                        />
                     </div>
                  </li>
                  <li>
                     <div>
                        <span className={styles.listIcon}>
                           <Icon name='checkmarkFilled' color='#F1EAFF' />
                        </span>
                        <Parragraph
                           text='First access to upcoming features'
                           size='main'
                           lineHieght='.9em'
                        />
                     </div>
                  </li>
                  {/* <li>Custom content folder</li> */}
               </ul>
            </div>
         </section>
         <div className='spacer--page-bottom'></div>
      </div>
   );
};
