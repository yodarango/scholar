import Link from "next/link";

import styles from "./internal_link.module.css";

type TExternalLinkProps = {
   href: string;
   italics?: boolean;
   children: string;
   type: string;
   align?: string;
   size: string;
};
export const InternalLink = ({
   href,
   children,
   italics,
   type,
   size,
   align
}: TExternalLinkProps) => {
   let fontSize: string = "";
   let fontAlign: string = "";

   // determine the size
   switch (size) {
      case "xxsmall":
         fontSize = styles.xxsmall;
         break;
      case "xsmall":
         fontSize = styles.xsmall;
         break;
      case "small":
         fontSize = styles.small;
         break;
      case "main":
         fontSize = styles.main;
         break;
      case "large":
         fontSize = styles.large;
         break;
      case "xlarge":
         fontSize = styles.xlarge;
         break;
      case "xxlarge":
         fontSize = styles.xxlarge;
         break;
      case "xxxlarge":
         fontSize = styles.xxxlarge;
         break;
   }

   // determine the alignment
   switch (align) {
      case "right":
         fontAlign = styles.right;
         break;
      case "center":
         fontAlign = styles.center;
         break;
      case "justify":
         fontAlign = styles.justify;
         break;
   }
   return (
      <span className={styles.mainWrapper}>
         {type === "1" && (
            <Link href={href}>
               <a className={`${styles.link} ${styles.one} ${styles.fontAlign} ${styles.fontSize}`}>
                  {children}
               </a>
            </Link>
         )}
         {type === "2" && (
            <Link href={href}>
               <a className={`${styles.link} ${styles.two} ${styles.fontAlign} ${styles.fontSize}`}>
                  {italics && <i>{children}</i>}
                  {!italics && children}
               </a>
            </Link>
         )}

         {type === "3" && (
            <Link href={href}>
               <a
                  className={`${styles.link} ${styles.three} ${styles.fontAlign} ${styles.fontSize}`}>
                  {italics && <i>{children}</i>}
                  {!italics && children}
               </a>
            </Link>
         )}
      </span>
   );
};
