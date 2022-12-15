// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { QuoteOneLineCarrousel } from "../scrollers/user_content/quote_one_line_carrousel";

// styles
import styles from "./fast_facts.module.css";

// types
import { TQuote } from "../../../types/posts";

type TQuoteDisplayProps = {
   quotes: TQuote[];
};

export const QuoteDisplay = ({ quotes }: TQuoteDisplayProps) => {
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

         <div className={styles.quotes}>
            <QuoteOneLineCarrousel quotes={quotes} />
         </div>
      </div>
   );
};
