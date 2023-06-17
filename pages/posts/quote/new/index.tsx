// components
import { QuoteEditor } from "../../../../components/templates/content/quote_editor";
import { REQUEST_TYPE_IS_NEW_QUOTE } from "../../../../helpers/functions/posts/content_post";
import { UseIsAuth } from "../../../../hooks/use_check_auth";

// styles
import styles from "./index.module.css";

const Index = () => {
   return (
      <UseIsAuth redirect='/login'>
         <div className={styles.mainWrapper}>
            <QuoteEditor requestType={REQUEST_TYPE_IS_NEW_QUOTE} renderClose={true} />
         </div>
      </UseIsAuth>
   );
};

export default Index;
