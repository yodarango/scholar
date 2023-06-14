// comps
import { Profile } from "../../../components/templates/account/profile";
import { UseIsAuth } from "../../../hooks/use_check_auth";

// styles
import styles from "./index.module.css";

const Me = () => {
   return (
      <div className={styles.mainWrapper}>
         <UseIsAuth redirect='/login'>
            <Profile username='user' />
         </UseIsAuth>
      </div>
   );
};
export default Me;
