import { QuoteOneLineCarrousel } from "../scrollers/user_content/quote_one_line_carrousel";
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";

// style
import styles from "./wigo_quotes.module.css";

// types
import { TQuote } from "../../types/posts";

export type TWigoQuotesProsp = {
   quotes: TQuote[];
};
export const WigoQuotes = ({ quotes }: TWigoQuotesProsp) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.link}>
            <LinkWithArrow title='See all quotes' link='wigo' quiet={true} />
         </div>
         <div className={styles.carrousel}>
            <QuoteOneLineCarrousel quotes={quotes} />
         </div>
      </div>
   );
};
