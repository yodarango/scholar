// comps
import { Primary } from "../fragments/buttons/primary";
import { BackgroundSelection } from "../fragments/chunks/background_selection";
import { CategorySelection } from "../fragments/chunks/category_selection";

//styles
import styles from "./quote_editor_actions.module.css";

type TQuoteEditorActionsProps = {
   categoryId?: string;
   background?: string;
   cta: {
      handleCategory: (cat: string) => void;
      handleBkg: (background: string | { light: string; dark: string }) => void;
      handlePost: () => void;
   };
};
export const QuoteEditorActions = ({ categoryId, cta, background }: TQuoteEditorActionsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.buttons}>
            <div className={styles.categoryButton}>
               <CategorySelection
                  categoryId={categoryId}
                  cta={{ handleSelection: cta.handleCategory }}
               />
            </div>
            <div className={styles.backgroundButton}>
               <BackgroundSelection
                  background={background}
                  cta={{ handleSelection: cta.handleBkg }}
               />
            </div>
         </div>

         <div className={styles.post}>
            <Primary type='1' cta={{ handleClick: cta.handlePost }} title='Post' />
         </div>
      </div>
   );
};
