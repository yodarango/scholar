// comps
import Link from "next/link";
import { Icon } from "../chunks/icons";

// styles
import styles from "./close_content.module.css";
import { FONT_COLOR } from "../../../constants/tokens";

type TCloseContentProps = {
   size?: string;
   color?: string;
   cta?: { handleClick: () => void };
   href?: string;
};

export const CloseContent = ({
   size = "3rem",
   color = FONT_COLOR,
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
