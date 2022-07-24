import { CloseContent } from "../../fragments/buttons/close_content";
import { Icon } from "../../fragments/chunks/icons";
import { Header } from "../../fragments/Typography/header";
import styles from "./primary_stack.module.css";

type TPrimaryStackprops = {
   title: string;
   content: JSX.Element;
   cta: React.MouseEventHandler<HTMLDivElement>;
   icon?: string;
};

export const PrimaryStack = ({ title, content, cta, icon }: TPrimaryStackprops) => {
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
         <div className={styles.close}>
            <CloseContent cta={cta} />
         </div>
         <div className={styles.subWrapper}>{content}</div>
      </div>
   );
};
