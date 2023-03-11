import { Primary } from "../../fragments/buttons/primary";
import { Header } from "../../fragments/Typography/header";
import { Parragraph } from "../../fragments/Typography/parragraph";
import { Layer2 } from "../../layouts/backgrounds/layer_2";

// styles
import styles from "./goodbye.module.css";

export const GoodByeTemplate = () => {
   return (
      <Layer2>
         <div className={styles.mainWrapper}>
            <div className={styles.logoWrapper}>
               <div className={styles.logo}></div>
               <div className={styles.title}>
                  <Header type={3} align='center' size='large' text="We're sad to see you go" />
               </div>
               <div className={styles.desc}>
                  <Parragraph
                     align='center'
                     size='large'
                     text='We are deeply sorry to see you go but we understand your decision. Please contact Shrood at hey@shrood.app and tell us what made you go and how we can improve on it!'
                  />
               </div>
            </div>

            <div className={styles.continue}>
               <Primary type='2' title='Done' href='/' />
            </div>
         </div>
      </Layer2>
   );
};
