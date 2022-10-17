import { Parragraph } from "../Typography/parragraph";
import styles from "./input_secondary.module.css";

type TInputSecondaryProps = {
   maxL?: number;
   quiet?: boolean;
   fontSize?: string;
   label: string;
   type?: string;
   defaultValue?: string;
   cta: {
      handleValue: (value: string) => void;
   };
};

export const InputSecondary = ({
   maxL = 150,
   label,
   fontSize = "small",
   type = "text",
   defaultValue,
   quiet = false,
   cta
}: TInputSecondaryProps) => {
   let fontSz: string = "";

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

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.label}>
            <Parragraph size={fontSize} text={label} />
         </div>
         <div className={styles.input}>
            <input
               type={type}
               defaultValue={defaultValue}
               className={`${fontSz} ${quiet && styles.quiet}`}
               onChange={(e) => cta.handleValue(e.target.value)}
               maxLength={maxL}
            />
         </div>
      </div>
   );
};
