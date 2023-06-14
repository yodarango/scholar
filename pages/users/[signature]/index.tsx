// comps
import { Profile } from "../../../components/templates/account/profile";
import { UseCheckAuth } from "../../../hooks/use_check_auth";

// styles
import styles from "./index.module.css";

const Me = () => {
   return (
      <div className={styles.mainWrapper}>
         <UseCheckAuth redirect='/login'>
            <Profile username='user' />
         </UseCheckAuth>
      </div>
   );
};
export default Me;
