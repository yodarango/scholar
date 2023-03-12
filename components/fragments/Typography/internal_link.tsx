import Link from "next/link";

import styles from "./internal_link.module.css";

type TExternalLinkProps = {
   href?: string;
   italics?: boolean;
   children: string;
   type: string;
   align?: string;
   size?: string;
   cta?: {
      onClick: () => void;
   };
};
export const InternalLink = ({
   href,
   children,
   italics,
   type,
   size = "main",
   align = "center",
   cta
}: TExternalLinkProps) => {
   let fontSize: string = "";
   let fontAlign: string = "";
   let linkType: string = "";

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

   switch (type) {
      case "1":
         linkType = styles.one;
         break;
      case "2":
         linkType = styles.two;
         break;
      case "3":
         linkType = styles.three;
         break;
   }
   return (
      <span className={styles.mainWrapper}>
         {!cta && href && (
            <Link href={href}>
               <a className={`${styles.link} ${linkType} ${fontAlign} ${fontSize}`}>
                  {" "}
                  {italics && <i>{children}</i>}
                  {!italics && children}
               </a>
            </Link>
         )}
         {cta && !href && (
            <div onClick={cta.onClick}>
               <p className={`${styles.button} ${linkType} ${fontAlign} ${fontSize}`}>
                  {italics && <i>{children}</i>}
                  {!italics && children}
               </p>
            </div>
         )}
      </span>
   );
};
