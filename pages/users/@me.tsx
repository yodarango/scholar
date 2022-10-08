// comps
import { Profile } from "../../templates/account/profile";

// styles
import styles from "./me.module.css";

const Me = () => {
   return (
      <div className={styles.mainWrapper}>
         <Profile username='user' />
      </div>
   );
};
export default Me;
