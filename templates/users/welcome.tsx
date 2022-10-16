import { Primary } from "../../fragments/buttons/primary";
import { UlListPrimary } from "../../fragments/lists/ul_list_primary";
import { Header } from "../../fragments/Typography/header";
import { InternalLink } from "../../fragments/Typography/internal_link";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Layer2 } from "../../styles/layouts/backgrounds/layer_2";

// styles
import styles from "./welcome.module.css";

export const WelcomeTemplate = () => {
   return (
      <Layer2>
         <div className={styles.mainWrapper}>
            <div className={styles.logoWrapper}>
               <div className={styles.logo}></div>
               <div className={styles.title}>
                  <Header type={3} align='center' size='large' text='Welcome to scholar' />
               </div>
               <div className={styles.desc}>
                  <Parragraph
                     align='center'
                     size='large'
                     text='Thank you for registering It is the goal of Scholar to help you love, learn, and share Word of God with others. '
                  />
               </div>
            </div>

            <section className={styles.list}>
               <div className={styles.title}>
                  <Header
                     type={4}
                     size='large'
                     text='Here are some ways you can help scholar be a safe and Godly platform:'
                  />
               </div>
               <UlListPrimary
                  icon='checkmarkFilled'
                  items={[
                     "Pray for the platform",
                     "Be kind",
                     "Think before you post",
                     "be honest and truthful",
                     "Report negative activity",
                     "Share this app with friends and family"
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
               <Primary type='2' title='Continue' href='/users/@me' />
            </div>
         </div>
      </Layer2>
   );
};
