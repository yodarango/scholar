// comps
import { Icon } from "../chunks/icons";

// styles
import styles from "./close_content.module.css";

type TCloseContentProps = {
   size?: string;
   color?: string;
   cta: React.MouseEventHandler<HTMLDivElement>;
};

export const CloseContent = ({ size = "2rem", color = "#F1EAFF", cta }: TCloseContentProps) => {
   return (
      <div className={`${styles.mainWrapper}`} onClick={cta}>
         <Icon name='close' color={color} size={size} strokeWidth='60' />
      </div>
   );
};
