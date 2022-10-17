// comps
import Link from "next/link";
import { Icon } from "../chunks/icons";

// styles
import styles from "./close_content.module.css";

type TCloseContentProps = {
   size?: string;
   color?: string;
   cta?: { handleClick: () => void };
   href?: string;
};

export const CloseContent = ({
   size = "2.5rem",
   color = "#F1EAFF",
   cta,
   href
}: TCloseContentProps) => {
   return (
      <>
         {cta && (
            <div className={`${styles.mainWrapper}`} onClick={cta.handleClick}>
               <Icon name='close' color={color} size={size} strokeWidth='60' />
            </div>
         )}
         {href && (
            <Link href={href}>
               <a className={`${styles.mainWrapper}`}>
                  <Icon name='close' color={color} size={size} strokeWidth='60' />
               </a>
            </Link>
         )}
      </>
   );
};
