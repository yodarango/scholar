import { useState } from "react";
import { QuoteEditor } from "../../../../templates/content/quote_editor";
import styles from "./index.module.css";

const Index = () => {
   const [quoteBackground, setquoteBackground] = useState<string>("");

   return (
      <div className={styles.mainWrapper} id={quoteBackground}>
         <QuoteEditor cta={{ handleBkgChange: (bkg: string) => setquoteBackground(bkg) }} />
      </div>
   );
};

export default Index;
