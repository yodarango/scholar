import { Parragraph } from "../Typography/parragraph";
import styles from "./third.module.css";

type TPrimaryProps = {
   icon: string;
   type: string;
   title: string;
   cta: {
      handleClick: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const Third = ({ title, cta, type, icon }: TPrimaryProps) => {
   return (
      <>
         {type === "1" && (
            <div className={` ${styles.mainWrapper}`} onClick={cta.handleClick}>
               <button className={`${styles.primary}`}>
                  <span className={styles.icon}>{icon}</span>
                  <Parragraph
                     text={title}
                     size='main'
                     bold={true}
                     lineHieght='.9em'
                     align='center'
                  />
               </button>
            </div>
         )}
         {type === "2" && (
            <div className={`${styles.mainWrapper}`} onClick={cta.handleClick}>
               <button className={`${styles.secondary}`}>
                  <span className={styles.icon}>{icon}</span>
                  <Parragraph
                     text={title}
                     size='main'
                     bold={true}
                     lineHieght='.9em'
                     align='center'
                  />
               </button>
            </div>
         )}
      </>
   );
};
