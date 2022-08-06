/**********************************************************************************************************
-  Just a simple background layer that acts as a layover "page" on top of whatever contnent is calling it.
   It is usefull in cases where the majority of the data to be rendered has already been loaded and thus is
   cheaper to render this data in the current page without having to navigate away. 
-  It is also useful in instances where the data has not been saved to the DB and the data must not be lost
   as in post createion
-  This component is used more specifically for the thought post although it might get reused in other 
    components in the future
**********************************************************************************************************/

// comps
import { CloseContent } from "../../../fragments/buttons/close_content";

// styles
import styles from "./preview_thought_stack.module.css";

type TPrimaryStackprops = {
   content: JSX.Element;
   cta: React.MouseEventHandler<HTMLDivElement>;
   image: string;
};

export const PrimaryThoughtStack = ({ content, cta, image }: TPrimaryStackprops) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.imgBkg} style={{ backgroundImage: `url(${image})` }}></div>
         <div className={styles.close}>
            <CloseContent cta={cta} />
         </div>
         <div className={styles.subWrapper}>
            <div className={styles.contentHolder}>{content}</div>
         </div>
      </div>
   );
};
