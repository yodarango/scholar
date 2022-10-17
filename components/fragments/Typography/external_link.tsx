import styles from "./external_link.module.css";

type TExternalLinkProps = {
   href: string;
   text: string;
   type: string;
   align?: string;
   size: string;
};
export const ExternalLink = ({ href, text, type, size, align }: TExternalLinkProps) => {
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
         {type === "2" && (
            <a
               href={href}
               className={`${styles.link} ${styles.two} ${styles.fontAlign} ${styles.fontSize}`}>
               {text}
            </a>
         )}
      </span>
   );
};
