import { useEffect, useState } from "react";

// styles
import styles from "./icon_ghost.module.css";

type TIconGhostProps = {
   className?: string;
   icon: any;
   cta: React.MouseEventHandler<HTMLDivElement>;
};

export const IconGhost = ({ className, icon, cta }: TIconGhostProps) => {
   return (
      <div className={`${styles.mainWrapper} ${className}`} onClick={cta}>
         <div className={styles.iconWrapper}>{icon}</div>
      </div>
   );
};
