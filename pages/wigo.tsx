// components
import { Wigo as WigoTemplate } from "../templates/wigo";

// styles
import styles from "./wigo.module.css";

const Wigo = () => {
   return (
      <div className={styles.mainWrapper}>
         <WigoTemplate />
      </div>
   );
};

export default Wigo;
