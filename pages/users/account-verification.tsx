// comps
import { AccountVerification } from "../../components/templates/account/account_verification";

// styles
import styles from "../page_global.module.css";

const AccountVerificationPage = () => {
   return (
      <div className={styles.mainWrapper}>
         <AccountVerification />
      </div>
   );
};

export default AccountVerificationPage;
