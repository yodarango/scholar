// components
import { CloseContent } from "../../../fragments/buttons/close_content";
import { Icon } from "../../../fragments/chunks/icons";
import { Header } from "../../../fragments/Typography/header";

// styles
import styles from "./primary_stack_header.module.css";

type TPrimaryStackHeaderProps = {
   cta?: { handleClose: () => void };
   href?: string;
   icon?: string;
   title: string;
};
export const PrimaryStackHeader = ({ cta, icon, title, href }: TPrimaryStackHeaderProps) => {
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
         {cta && cta.handleClose && (
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: cta.handleClose }} />
            </div>
         )}
         {href && (
            <div className={styles.close}>
               <CloseContent href={href} />
            </div>
         )}
         <div className={styles.trim}></div>
      </div>
   );
};
