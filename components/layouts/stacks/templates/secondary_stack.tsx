/**********************************************************************************************************
-  Content holder that is rendered directly from a page or from a high level component.
**********************************************************************************************************/
// comps
import { useEffect } from "react";
import { CloseContent } from "../../../fragments/buttons/close_content";
import { CategoryTag } from "../../../fragments/chunks/category_tag";
import { Icon } from "../../../fragments/chunks/icons";
import { ToggleMenu } from "../../../fragments/chunks/toggle_menu";
import { Header } from "../../../fragments/Typography/header";

// styles
import styles from "./secondary_stack.module.css";

type TPrimaryStackprops = {
   title: string;
   children: (string | JSX.Element) | (string | JSX.Element)[];
   icon?: string;
   menuType?: number;
   cta?: {
      handleClose: () => void;
   };
   href?: string;
   withOnScrollEvt?: (value: boolean) => void;
   minScrollPercentage?: number; // at what percentage of scrolling down to make the call;
};

export const SecondaryStack = ({
   minScrollPercentage = 5,
   withOnScrollEvt,
   title,
   children,
   menuType,
   icon,
   cta,
   href
}: TPrimaryStackprops) => {
   const reachedBottom = (e: any) => {
      if (withOnScrollEvt) {
         const scrolledHeight = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
         const totalHeight = e.target.scrollHeight + e.target.scrollTop + e.target.clientHeight;
         const makeCall = (scrolledHeight / totalHeight) * 100 < minScrollPercentage;

         withOnScrollEvt(makeCall);
      }
   };

   useEffect(() => {
      const body = document.getElementById("__next");
      if (body) body.style.display = "none";

      return () => {
         if (body) body.style.display = "block";
      };
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.gradientBkg}>
            <div className={styles.title}>
               <Header size='large' type={1} text={title} lineHieght='.9em' />
               {icon && (
                  <div className={styles.icon}>
                     <Icon size='2rem' name={icon} color='#F1EAFF' />
                  </div>
               )}
            </div>
         </div>
         <div className={styles.toggleIcon}>
            {menuType === 1 && <ToggleMenu type={1} />}
            {menuType === 2 && <CategoryTag informativeOnly={false} />}
            {cta?.handleClose && !href && <CloseContent cta={{ handleClick: cta?.handleClose }} />}
            {!cta?.handleClose && href && <CloseContent href={href} />}
         </div>
         <div className={styles.subWrapper}>
            {!withOnScrollEvt && <div className={styles.contentHolder}>{children}</div>}
            {withOnScrollEvt && (
               <div className={styles.contentHolder} onScroll={reachedBottom}>
                  {children}
               </div>
            )}
         </div>
      </div>
   );
};
