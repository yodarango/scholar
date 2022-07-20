import styles from "./header.module.css";

type THeaderProps = {
   align?: string;
   color?: string;
   lineHieght?: string;
   quiet?: boolean;
   size: string;
   type: number;
   text: string | number | JSX.Element;
   weight?: number;
};

export const Header = ({
   type,
   size,
   quiet,
   weight,
   color,
   align,
   text,
   lineHieght
}: THeaderProps) => {
   // defaults
   let fontSize: string = "";
   let fontAlign: string = "";
   let fontColor = color ? color : quiet ? "#5C5470" : "#F1EAFF";
   let fontWeight = "";
   let fontLineHeight = lineHieght ? lineHieght : "1.6em";

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

   // determine the thickness
   switch (weight) {
      case 400:
         fontWeight = styles.b4;
         break;
      case 500:
         fontWeight = styles.b5;
         break;
      case 700:
         fontWeight = styles.b7;
         break;
      case 800:
         fontWeight = styles.b9;
         break;
   }

   return (
      <>
         {type === 1 && (
            <h1
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </h1>
         )}

         {type === 2 && (
            <h2
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </h2>
         )}

         {type === 3 && (
            <h3
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </h3>
         )}

         {type === 4 && (
            <h4
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </h4>
         )}

         {type === 5 && (
            <h5
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </h5>
         )}

         {type === 6 && (
            <h6
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight}`}
               style={{ color: fontColor, lineHeight: fontLineHeight }}>
               {text}
            </h6>
         )}
      </>
   );
};
