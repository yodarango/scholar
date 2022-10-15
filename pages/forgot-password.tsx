import { ForgotPasswordTemplate } from "../templates/account/forgot_password";

// styles
import styles from "./page_global.module.css";

const ForgotPassword = () => {
   return (
      <div className={styles.mainWrapper}>
         <ForgotPasswordTemplate />
      </div>
   );
};

export default ForgotPassword;
