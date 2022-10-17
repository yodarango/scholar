// comp
import { useState } from "react";

// comps
import { Parragraph } from "../../fragments/Typography/parragraph";
import { OTCVerification } from "../../layouts/forms/otc_verification";
import { Layer1 } from "../../styles/layouts/backgrounds/layer_1";

// styles
import styles from "./account_verification.module.css";

type TAccountVerificationprops = {
   email: string;
};

export const AccountVerification = ({ email }: TAccountVerificationprops) => {
   return (
      <div className={styles.mainWrapper}>
         <Layer1 />
         <div className={styles.logoWrapper}>
            <div className={styles.logo}></div>
            <div className={styles.title}>
               <Parragraph align='center' bold size='large' text='Welcome to scholar' />
            </div>
            <div className={styles.desc}>
               <Parragraph
                  align='center'
                  size='large'
                  text={`Thank you for registering. A verification code was sent to ${
                     email ? email : "your email"
                  } Please enter it below`}
               />
            </div>
         </div>
         <div className={styles.form}>
            <OTCVerification />
         </div>
      </div>
   );
};
