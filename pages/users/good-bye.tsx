import { GoodByeTemplate } from "../../components/templates/users/goodbye";
import styles from "../page_global.module.css";

const GoodBye = () => {
   return (
      <div className={styles.mainWrapper}>
         <GoodByeTemplate />
      </div>
   );
};

export default GoodBye;
