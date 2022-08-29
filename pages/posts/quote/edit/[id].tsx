import { useEffect } from "react";

// components
import { QuoteEditor } from "../../../../templates/content/quote_editor";

// styles
import styles from "./index.module.css";

const EditCommentary = () => {
   useEffect(() => {
      // get the user and post data
   }, []);
};

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <QuoteEditor renderClose={true} />
      </div>
   );
};

export default Index;
