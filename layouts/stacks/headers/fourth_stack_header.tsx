// comps
import Link from "next/link";
import { BackLink } from "../../../fragments/buttons/back_link";
import { Header } from "../../../fragments/Typography/header";

// styles
import styles from "./fourth_stack_header.module.css";

type TFourthStackProps = {
   title: string;
   actionName: string;
   link?: string;
   cta?: {
      handleClose: () => void;
   };
};
export const FourthStackHeader = ({ cta, actionName, title, link }: TFourthStackProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.header}>
            <div className={styles.title}>
               <Header text={title} size='large' quiet={true} type={3} />
            </div>
            {cta && !link && (
               <div className={styles.back}>
                  <BackLink cta={{ handleClick: cta.handleClose }} title={actionName} />
               </div>
            )}
            {!cta && link && (
               <div className={styles.back}>
                  <BackLink link={link} title={actionName} />
               </div>
            )}
         </div>
      </div>
   );
};
