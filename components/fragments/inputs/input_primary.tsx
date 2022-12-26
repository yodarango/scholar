import styles from "./input_primary.module.css";

type TInputPrimaryProps = {
   fontSize?: string;
   textColor?: string;
   darkText?: boolean;
   bold?: boolean;
   alignment?: string;
   transparent?: boolean;
   maxWidth?: string;
   customHeight?: boolean;
   value?: string;
   maxL: number;
   type: string;
   placeholder: string;
   cta: {
      handleValue: (value: string) => void;
   };
};

export const InputPrimary = ({
   fontSize,
   textColor,
   darkText = false,
   bold = false,
   alignment,
   maxL,
   maxWidth = "100%",
   customHeight = false,
   type,
   value,
   placeholder,
   transparent = false,
   cta
}: TInputPrimaryProps) => {
   let fontSz: string = "";
   let fontAlign: string = "";

   // determine the size
   switch (fontSize) {
      case "xxsmall":
         fontSz = styles.xxsmall;
         break;
      case "xsmall":
         fontSz = styles.xsmall;
         break;
      case "small":
         fontSz = styles.small;
         break;
      case "main":
         fontSz = styles.main;
         break;
      case "large":
         fontSz = styles.large;
         break;
      case "xlarge":
         fontSz = styles.xlarge;
         break;
      case "xxlarge":
         fontSz = styles.xxlarge;
         break;
      case "xxxlarge":
         fontSz = styles.xxxlarge;
         break;
   }

   // determine the alignment
   switch (alignment) {
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
      <div
         className={`${styles.mainWrapper} ${customHeight && styles.customHeight}`}
         style={{ maxWidth }}>
         {!transparent && (
            <input
               style={{ color: textColor }}
               onChange={(e) => cta.handleValue(e.target.value)}
               maxLength={maxL}
               type={type}
               defaultValue={value}
               placeholder={placeholder}
               className={`${styles.input} ${styles.dark} ${fontAlign} ${
                  bold ? styles.bold : ""
               } ${fontSz}  ${customHeight && styles.customHeight}`}
            />
         )}
         {transparent && (
            <input
               style={{ color: textColor }}
               onChange={(e) => cta.handleValue(e.target.value)}
               maxLength={maxL}
               type={type}
               defaultValue={value}
               placeholder={placeholder}
               className={`${styles.input} ${styles.transparent} ${fontAlign} ${
                  bold && styles.bold
               } ${fontSz} ${customHeight && styles.customHeight} ${darkText && styles.darkText}`}
            />
         )}
      </div>
   );
};
