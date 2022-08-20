// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { ContentGraphicsPost } from "../../fragments/cards/content_graphics_post";
import { Header } from "../../fragments/Typography/header";

// styles
import styles from "./fast_facts.module.css";

type TFastFactsProps = {
   images: string[];
};
export const FastFacts = ({ images }: TFastFactsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Fast Facts' size='large' />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/wigo/fast-facts"} />
            </div>
         </div>
         <div className={styles.fastFacts}>
            <ContentGraphicsPost images={images} />
         </div>
      </div>
   );
};
