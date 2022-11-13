import { CloseContent } from "../../fragments/buttons/close_content";
import styles from "./grid_primary.module.css";

type TGridPrimaryProps = {
   children: JSX.Element[] | any;
};

export const GridPrimary = ({ children }: TGridPrimaryProps) => {
   return (
      <div className={styles.mainWrapper}>
         {children.map((child: JSX.Element, index: number) => (
            <div className={styles.child} key={index}>
               {child}
            </div>
         ))}
      </div>
   );
};
