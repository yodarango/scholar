import { TrustedUserApplication } from "../components/templates/users/trusted_user_application";
import styles from "./page_global.module.css";

const UserVerification = () => {
   return (
      <div className={styles.mainWrapper}>
         <TrustedUserApplication />
      </div>
   );
};

export default UserVerification;
