import styles from "./uneven_grid.module.css";

type TUnevenGridProps = {
   children: JSX.Element[];
};
export const UnevenGrid = ({ children }: TUnevenGridProps) => {
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
