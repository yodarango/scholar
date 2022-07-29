// comps
import { Icon } from "../chunks/icons";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./back_link.module.css";

type TBackLinkProps = {
   title: string;
   link: string;
};
export const BackLink = ({ title, link }: TBackLinkProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.icon}>
            <Icon name='arrowBack' size='2rem' color='#F1EAFF' strokeWidth='64' />
         </div>
         <div className={styles.text}>
            <Parragraph text={title} size='main' />
         </div>
      </div>
   );
};
