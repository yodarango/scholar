import Link from "next/link";

// comps
import { Icon } from "../chunks/icons";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./back_link.module.css";

type TBackLinkProps = {
   title: string;
   link?: string;
   cta?: {
      handleClick: () => void;
   };
};
export const BackLink = ({ title, link, cta }: TBackLinkProps) => {
   return (
      <>
         {cta && !link && (
            <div className={styles.mainWrapper} onClick={cta?.handleClick}>
               <div className={styles.icon}>
                  <Icon name='arrowBack' size='2rem' color='#F1EAFF' strokeWidth='64' />
               </div>
               <div className={styles.text}>
                  <Parragraph text={title} size='main' />
               </div>
            </div>
         )}
         {link && !cta && (
            <Link href={link}>
               <a className={styles.mainWrapper}>
                  <div className={styles.icon}>
                     <Icon name='arrowBack' size='2rem' color='#F1EAFF' strokeWidth='64' />
                  </div>
                  <div className={styles.text}>
                     <Parragraph text={title} size='main' />
                  </div>
               </a>
            </Link>
         )}
      </>
   );
};
