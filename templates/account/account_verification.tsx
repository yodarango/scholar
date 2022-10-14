// comp
import { AccountVerificationForm } from "../../layouts/forms/account_verification";
import { BackgroundOne } from "../../public/images/backgrounds/top_half_gradient";

// styles
import styles from "./account_verification.module.css";

export const AccountVerification = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.svg}>
            <BackgroundOne />
         </div>
         <div className={styles.form}>
            <AccountVerificationForm />
         </div>
      </div>
   );
};
