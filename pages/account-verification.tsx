import { AccountVerification } from "../templates/account/account_verification";
import styles from "./page_global.module.css";

const AccountVerificationPage = () => {
   return (
      <div className={styles.mainWrapper}>
         <AccountVerification />
      </div>
   );
};

export default AccountVerificationPage;
