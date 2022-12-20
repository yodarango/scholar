import { ViewQuote } from "../../../components/templates/posts/view_quote";
import styles from "./index.module.css";

const Index = () => {
   return (
      <div className={styles.singleQuoteMainWrapper}>
         <ViewQuote />
      </div>
   );
};
export default Index;
