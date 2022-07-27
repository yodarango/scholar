import { Parragraph } from "../Typography/parragraph";
import styles from "./secondary.module.css";

type TPrimaryProps = {
   icon?: string;
   type: string;
   title: string;
   cta: {
      handleClick: React.MouseEventHandler<HTMLButtonElement>;
   };
};

export const Secondary = ({ title, cta, type, icon }: TPrimaryProps) => {
   return (
      <>
         {type === "1" && (
            <div className={`${styles.mainWrapper} ${icon && styles.withIcon}`}>
               {/* ----------------------- if the includes text only render this-----------------  */}
               <button
                  className={`${styles.primary} ${icon && styles.withIcon}`}
                  onClick={cta.handleClick}>
                  {!icon && (
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  )}
                  {/* ----------------------- if the button includes an icon render this-----------------  */}
                  {icon && (
                     <>
                        <span className={styles.icon}>{icon}</span>
                        <Parragraph text={title} size='main' bold={true} lineHieght='.9em' />
                     </>
                  )}
               </button>
            </div>
         )}

         {type === "2" && (
            <div className={`${styles.mainWrapper} ${icon && styles.withIcon}`}>
               <button
                  className={`${styles.secondary} ${icon && styles.withIcon}`}
                  onClick={cta.handleClick}>
                  {/* ----------------------- if the includes text only render this-----------------  */}
                  {!icon && (
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  )}
                  {/* ----------------------- if the button includes an icon render this-----------------  */}
                  {icon && (
                     <>
                        <span className={styles.icon}>{icon}</span>
                        <Parragraph text={title} size='main' bold={true} lineHieght='.9em' />
                     </>
                  )}
               </button>
            </div>
         )}
      </>
   );
};
