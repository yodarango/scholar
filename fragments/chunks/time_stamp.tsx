/**************************************************************************************
-  renders a time stamp that calculates ellapsed time since the date of the post by 
   the help of a helper fucntion.
-  Three kind of cards can be rendered:
      1. default which is a css { background-color:var(--secondary-color)} 
      2. custom color wich has inline styles with style={{backgroundColor: custom color}}
         the customColor is passed in the props 
      3. Pass a css id in the props wich will assign a background by based in the 
         globals.css
***************************************************************************************/
import { useState } from "react";

// comps
import { Parragraph } from "../Typography/parragraph";
import { Icon } from "./icons";

// styles
import styles from "./time_stamp.module.css";

// helpers
import { calcElapsedTime } from "../../helpers/Time/calc_time_elapsed";

type TimeStampProps = {
   time: string;
   niceTime: string;
   quiet: boolean;
   fontSize?: string;
   customColor?: string;
   shadowColor?: string;
   customFontColor?: string;
   colorId?: string;
};

export const TimeStamp = ({
   time,
   fontSize,
   quiet,
   niceTime,
   customColor,
   shadowColor,
   colorId,
   customFontColor
}: TimeStampProps) => {
   const formatedTime = calcElapsedTime(time);

   const [isOpenTimeStamp, setisOpenTimeStamp] = useState<boolean>(false);

   return (
      <div className={`${styles.mainWrapper}`}>
         {!isOpenTimeStamp && !customColor && (
            <div
               className={`${styles.closed} ${colorId && styles.hasColorId}`}
               id={`${colorId && colorId}`}
               onClick={() => setisOpenTimeStamp(true)}>
               <Parragraph
                  size={fontSize ? fontSize : "xxsmall"}
                  bold={true}
                  text={formatedTime ? `${formatedTime} ago` : "sometime ago"}
                  quiet={quiet}
                  lineHieght={"1em"}
                  color={
                     colorId === "category-YLW" ||
                     colorId === "category-CYN" ||
                     colorId === "category-PNK"
                        ? "#2a2438"
                        : "#f1eaff"
                  }
               />
            </div>
         )}

         {/* -- opne time stamp. Might add some nice css animations like stretch in the future -- */}
         {isOpenTimeStamp && !customColor && (
            <div
               className={`${styles.open}  ${colorId && styles.hasColorId}`}
               id={`${colorId && colorId}`}>
               <Parragraph
                  size={fontSize ? fontSize : "xxsmall"}
                  bold={true}
                  text={niceTime}
                  quiet={quiet}
                  lineHieght={"1em"}
                  color={
                     colorId === "category-YLW" ||
                     colorId === "category-CYN" ||
                     colorId === "category-PNK"
                        ? "#2a2438"
                        : "#f1eaff"
                  }
               />
               <div
                  className={`${styles.closeBtnWrapper}  ${colorId && styles.hasColorId}`}
                  onClick={() => setisOpenTimeStamp(false)}
                  id={`${colorId && colorId}`}>
                  <Icon
                     name='remove'
                     color={
                        colorId === "category-YLW" ||
                        colorId === "category-CYN" ||
                        colorId === "category-PNK"
                           ? "#2a2438"
                           : "#f1eaff"
                     }
                     size='2rem'
                     strokeWidth='42'
                  />
               </div>
            </div>
         )}

         {/* ---------------------------------- if custom color is needed render this options --------------------- */}

         {!isOpenTimeStamp && customColor && (
            <div
               className={`${styles.closed}`}
               onClick={() => setisOpenTimeStamp(true)}
               style={{
                  backgroundColor: customColor,
                  boxShadow: `.2rem .2rem .4rem ${shadowColor}`
               }}>
               <Parragraph
                  size={fontSize ? fontSize : "xxsmall"}
                  bold={true}
                  text={formatedTime ? `${formatedTime} ago` : "sometime ago"}
                  quiet={quiet}
                  lineHieght={"1em"}
                  color={customFontColor ? customFontColor : "#f1eaff"}
               />
            </div>
         )}

         {isOpenTimeStamp && customColor && (
            <div
               className={`${styles.open}`}
               style={{
                  backgroundColor: customColor,
                  boxShadow: `.2rem .2rem .4rem ${shadowColor}`
               }}>
               <Parragraph
                  size={fontSize ? fontSize : "xxsmall"}
                  bold={true}
                  text={niceTime}
                  quiet={quiet}
                  lineHieght={"1em"}
                  color={customFontColor ? customFontColor : "#f1eaff"}
               />
               <div
                  className={styles.closeBtnWrapper}
                  onClick={() => setisOpenTimeStamp(false)}
                  style={{
                     backgroundColor: customColor,
                     boxShadow: `.2rem .2rem .4rem ${shadowColor}`
                  }}>
                  <Icon
                     name='remove'
                     color={customFontColor ? customFontColor : "#f1eaff"}
                     size='2rem'
                     strokeWidth='42'
                  />
               </div>
            </div>
         )}
      </div>
   );
};
