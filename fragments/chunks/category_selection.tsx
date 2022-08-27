// components
import { Parragraph } from "../Typography/parragraph";
import { CategoryTag } from "./category_tag";

// styles
import styles from "./background_selection.module.css";

type TBackgroundSelectionProps = {
   categoryId: string;
   cta: {
      handleSelection: (background: string | { light: string; dark: string }) => void;
   };
};

export const CategorySelectionSelection = ({ categoryId, cta }: TBackgroundSelectionProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.text}>
            <Parragraph text='Category' quiet={true} size='xsmall' bold={true} />
         </div>
         <div className={styles.button}>
            <CategoryTag
               informativeOnly={false}
               cta={{ handleSelection: cta.handleSelection }}
               id={categoryId}
            />
         </div>
      </div>
   );
};
