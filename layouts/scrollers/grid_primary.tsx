import styles from "./grid_primary.module.css";

type TGridPrimaryProps = {
   children: JSX.Element[];
};

export const GridPrimary = ({ children }: TGridPrimaryProps) => {
   console.log(children);
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
