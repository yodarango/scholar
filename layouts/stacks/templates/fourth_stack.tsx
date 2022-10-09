import { BackLink } from "../../../fragments/buttons/back_link";
import { Header } from "../../../fragments/Typography/header";
import styles from "./fourth_stack.module.css";

type TFourthStackProps = {
   title: string;
   actionName: string;
   children: (string | JSX.Element) | (string | JSX.Element)[];
   cta: {
      handleClose: () => void;
   };
};
export const FourthStack = ({ cta, actionName, title, children }: TFourthStackProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.header}>
            <div className={styles.title}>
               <Header text={title} size='large' quiet={true} type={3} />
            </div>
            <div className={styles.back}>
               <BackLink cta={{ handleClick: cta.handleClose }} title={actionName} />
            </div>
         </div>
         <div className={styles.content}>{children}</div>
      </div>
   );
};
