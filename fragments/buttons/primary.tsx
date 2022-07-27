import { Parragraph } from "../Typography/parragraph";
import styles from "./primary.module.css";

type TPrimaryProps = {
   type: string;
   title: string;
   cta: {
      handleClick: React.MouseEventHandler<HTMLButtonElement>;
   };
};

export const Primary = ({ title, cta, type }: TPrimaryProps) => {
   return (
      <>
         {type === "1" && (
            <button className={`${styles.primary} ${styles.mainWrapper}`} onClick={cta.handleClick}>
               <Parragraph text={title} size='main' bold={true} lineHieght='.9em' align='center' />
            </button>
         )}
         {type === "2" && (
            <button
               className={`${styles.secondary} ${styles.mainWrapper}`}
               onClick={cta.handleClick}>
               <Parragraph text={title} size='main' bold={true} lineHieght='.9em' align='center' />
            </button>
         )}
      </>
   );
};
