import Link from "next/link";

// comps
import { Icon } from "../chunks/icons";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./link_with_arrow.module.css";

type TLinkWithArrowProps = {
   title: string;
   link: string;
};
export const LinkWithArrow = ({ title, link }: TLinkWithArrowProps) => {
   return (
      <div className={styles.mainWrapper}>
         <Link href={link}>
            <a className={styles.link}>
               <div className={styles.text}>
                  <Parragraph text={<u>title</u>} size='xsmall' lineHieght='.9em' quiet={true} />
               </div>
               <div className={styles.icon}>
                  <Icon name='arrowForthLong' color='#5C5470' size='2rem' />
               </div>
            </a>
         </Link>
      </div>
   );
};
