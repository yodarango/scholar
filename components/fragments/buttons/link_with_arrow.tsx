import Link from "next/link";

// comps
import { Icon } from "../chunks/icons";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./link_with_arrow.module.css";

type TLinkWithArrowProps = {
   title: string;
   link: string;
   size?: string;
   color?: string;
   quiet?: boolean;
};
export const LinkWithArrow = ({
   title,
   link,
   size = "small",
   color,
   quiet = true
}: TLinkWithArrowProps) => {
   return (
      <div className={styles.mainWrapper}>
         <Link href={link}>
            <a className={styles.link}>
               <div className={styles.text}>
                  {!color && (
                     <Parragraph
                        text={<u>{title}</u>}
                        size={size}
                        lineHieght='.9em'
                        quiet={quiet}
                     />
                  )}
                  {color && (
                     <Parragraph
                        text={<u>{title}</u>}
                        size={size}
                        lineHieght='.9em'
                        color={color}
                     />
                  )}
               </div>
               <div className={styles.icon}>
                  {!color && quiet && <Icon name='arrowForthLong' color='#5C5470' size='2rem' />}
                  {!color && !quiet && <Icon name='arrowForthLong' color='#F1EAFF' size='2rem' />}
                  {color && <Icon name='arrowForthLong' color={color} size='2rem' />}
               </div>
            </a>
         </Link>
      </div>
   );
};
