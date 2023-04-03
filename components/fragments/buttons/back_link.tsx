import Link from "next/link";
import { FONT_COLOR, THIRD_COLOR } from "../../../constants/tokens";

// comps
import { Icon } from "../chunks/icons";
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./back_link.module.css";

type TBackLinkProps = {
   title: string;
   link?: string;
   quiet?: boolean;
   arrowLeft?: boolean;
   arrowRight?: boolean;
   cta?: {
      handleClick: () => void;
   };
};
export const BackLink = ({ arrowLeft, arrowRight, title, link, cta, quiet }: TBackLinkProps) => {
   return (
      <>
         {cta && !link && (
            <div className={styles.mainWrapper} onClick={cta?.handleClick}>
               {arrowLeft && (
                  <div className={styles.icon}>
                     <Icon
                        name='arrowBack'
                        size='2rem'
                        color={quiet ? THIRD_COLOR : FONT_COLOR}
                        strokeWidth='64'
                     />
                  </div>
               )}
               <div className={styles.text}>
                  <Parragraph text={title} size='main' quiet={quiet} />
               </div>
               {arrowRight && (
                  <div className={styles.icon}>
                     <Icon
                        name='arrowForth'
                        size='2rem'
                        color={quiet ? THIRD_COLOR : FONT_COLOR}
                        strokeWidth='64'
                     />
                  </div>
               )}
            </div>
         )}
         {link && !cta && (
            <Link href={link}>
               <a className={styles.mainWrapper}>
                  {arrowLeft && (
                     <div className={styles.icon}>
                        <Icon
                           name='arrowBack'
                           size='2rem'
                           color={quiet ? THIRD_COLOR : FONT_COLOR}
                           strokeWidth='64'
                        />
                     </div>
                  )}
                  <div className={styles.text}>
                     <Parragraph text={title} size='main' quiet={quiet} />
                  </div>

                  {arrowRight && (
                     <div className={styles.icon}>
                        <Icon
                           name='arrowForth'
                           size='2rem'
                           color={quiet ? THIRD_COLOR : FONT_COLOR}
                           strokeWidth='64'
                        />
                     </div>
                  )}
               </a>
            </Link>
         )}
      </>
   );
};
