// comps
import { Icon } from "../chunks/icons";

// styles
import styles from "./add_content.module.css";

type TAddContentProps = {
   cta: { handleClick: React.MouseEventHandler<HTMLDivElement> };
};

export const AddContent = ({ cta }: TAddContentProps) => {
   return (
      <div className={styles.mainWrapper} onClick={cta.handleClick}>
         <button className={styles.button}>
            <Icon name='add' color='#F1EAFF' size='2rem' strokeWidth='64' />
         </button>
      </div>
   );
};
