import styles from "./icon_ghost.module.css";

type TIconGhostProps = {
   icon: any;
   cta: React.MouseEventHandler<HTMLDivElement>;
};

export const IconGhost = ({ icon, cta }: TIconGhostProps) => {
   return (
      <div className={styles.mainWrapper} onClick={cta}>
         <div className={styles.iconWrapper}>{icon}</div>
      </div>
   );
};
