import { Parragraph } from "../Typography/parragraph";
import styles from "./primary.module.css";

type TPrimaryProps = {
   type: string;
   title: string;
   href?: string;
   htmlType?: any;
   cta?: {
      handleClick: () => any;
   };
};

export const Primary = ({ title, cta, type, href, htmlType = "button" }: TPrimaryProps) => {
   return (
      <>
         {type === "1" &&
            (!href && cta ? (
               <button
                  type={htmlType}
                  className={`${styles.primary} ${styles.mainWrapper}`}
                  onClick={cta.handleClick}>
                  <Parragraph
                     text={title}
                     size='main'
                     bold={true}
                     lineHieght='.9em'
                     align='center'
                  />
               </button>
            ) : (
               <a className={`${styles.primary} ${styles.mainWrapper}`} href={href}>
                  <Parragraph
                     text={title}
                     size='main'
                     bold={true}
                     lineHieght='.9em'
                     align='center'
                  />
               </a>
            ))}
         {type === "2" &&
            (!href && cta ? (
               <button
                  type={htmlType}
                  className={`${styles.secondary} ${styles.mainWrapper}`}
                  onClick={cta.handleClick}>
                  <Parragraph
                     text={title}
                     size='main'
                     bold={true}
                     lineHieght='.9em'
                     align='center'
                  />
               </button>
            ) : (
               <a className={`${styles.secondary} ${styles.mainWrapper}`} href={href}>
                  <Parragraph
                     text={title}
                     size='main'
                     bold={true}
                     lineHieght='.9em'
                     align='center'
                  />
               </a>
            ))}
      </>
   );
};
