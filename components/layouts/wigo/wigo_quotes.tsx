/**************************************************************************************** 
-  A display of quotes for the WIGO page. This should only pull the last 20 quotes and 
   redirected to quotes page if "see all" is clicked
****************************************************************************************/
// components
import { QuoteOneLineCarrousel } from "../scrollers/user_content/quote_one_line_carrousel";
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";

// style
import styles from "./wigo_quotes.module.css";

export const WigoQuotes = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Quotes' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/quote"} />
            </div>
         </div>
         <div className={styles.carrousel}>
            <QuoteOneLineCarrousel />
         </div>
      </div>
   );
};
