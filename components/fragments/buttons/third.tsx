import Link from "next/link";
import { Parragraph } from "../Typography/parragraph";
import styles from "./third.module.css";

type TPrimaryProps = {
   icon: string;
   type: string;
   title: string;
   htmlType?: any;
   link?: string;
   cta?: {
      handleClick: (args: any) => void;
   };
};

export const Third = ({ title, cta, type, icon, htmlType = "button", link }: TPrimaryProps) => {
   return (
      <>
         {type === "1" && (
            <div className={` ${styles.mainWrapper} ${!icon ? styles.noIcon : ""}`}>
               {cta && !link && (
                  <button className={`${styles.primary}`} type={htmlType} onClick={cta.handleClick}>
                     {icon && <span className={styles.icon}>{icon}</span>}
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </button>
               )}
               {link && !cta && (
                  <Link href={link}>
                     <a className={styles.primary}>
                        <span className={styles.icon}>{icon}</span>
                        <Parragraph
                           text={title}
                           size='main'
                           bold={true}
                           lineHieght='.9em'
                           align='center'
                        />
                     </a>
                  </Link>
               )}
            </div>
         )}
         {type === "2" && (
            <div className={`${styles.mainWrapper} ${!icon ? styles.noIcon : ""}`}>
               {cta && !link && (
                  <button
                     className={`${styles.secondary}`}
                     type={htmlType}
                     onClick={cta.handleClick}>
                     {icon && <span className={styles.icon}>{icon}</span>}
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </button>
               )}
               {link && !cta && (
                  <Link href={link}>
                     <a className={styles.secondary}>
                        <span className={styles.icon}>{icon}</span>
                        <Parragraph
                           text={title}
                           size='main'
                           bold={true}
                           lineHieght='.9em'
                           align='center'
                        />
                     </a>
                  </Link>
               )}
            </div>
         )}
      </>
   );
};
