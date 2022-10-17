import styles from "./layer_2.module.css";

type TLayer2Props = {
   children: (string | JSX.Element) | (string | JSX.Element)[];
};

export const Layer2 = ({ children }: TLayer2Props) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}></div>
         <div className={styles.bottom}></div>
         <div className={styles.content}>{children}</div>
      </div>
   );
};
