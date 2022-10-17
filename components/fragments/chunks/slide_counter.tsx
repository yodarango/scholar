//cmomps
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./slide_counter.module.css";

type TSlideCounterProps = {
   currIndex: number;
   length: number;
   textSize?: string;
   textQuiet?: boolean;
   textColor?: string;
   backgroundColor?: string;
   shadowColor?: string;
};

export const SlideCounter = ({
   currIndex,
   length,
   textSize = "small",
   textQuiet = false,
   backgroundColor,
   textColor,
   shadowColor = "#1A1723"
}: TSlideCounterProps) => {
   return (
      <>
         {!backgroundColor && (
            <div className={styles.mainWrapper}>
               {!textColor && (
                  <Parragraph
                     size={textSize}
                     text={`${currIndex} of ${length}`}
                     align='center'
                     quiet={textQuiet}
                  />
               )}
               {textColor && (
                  <Parragraph
                     size={textSize}
                     text={`${currIndex} of ${length}`}
                     align='center'
                     quiet={textQuiet}
                     color={textColor}
                  />
               )}
            </div>
         )}
         {backgroundColor && (
            <div
               className={styles.mainWrapper}
               style={{ backgroundColor, boxShadow: `.4rem .4rem ${shadowColor}` }}>
               {!textColor && (
                  <Parragraph
                     size={textSize}
                     text={`${currIndex} of ${length}`}
                     align='center'
                     quiet={textQuiet}
                  />
               )}
               {textColor && (
                  <Parragraph
                     size={textSize}
                     text={`${currIndex} of ${length}`}
                     align='center'
                     quiet={textQuiet}
                     color={textColor}
                  />
               )}
            </div>
         )}
      </>
   );
};
