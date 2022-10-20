// components
import { Wigo as WigoTemplate } from "../components/templates/wigo";

// styles
import styles from "./wigo.module.css";

const Wigo = () => {
   return (
      <main className={styles.mainWrapper}>
         <WigoTemplate />
      </main>
   );
};

export default Wigo;
