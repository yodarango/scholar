import { useState } from "react";
import { IconButton } from "../buttons/icon_button";
import { Parragraph } from "../Typography/parragraph";
import styles from "./radio_primary.module.css";

type TRadioPrimaryProps = {
   icon: {
      primary: string;
      secondary: string;
   };
   text: {
      primary: string;
      secondary: string;
   };
   displayV?: boolean;
   cta: {
      handleOptionSelection: (option: number) => void;
   };
};
export const RadioPrimary = ({ icon, text, cta, displayV }: TRadioPrimaryProps) => {
   const [currSelection, setcurrSelection] = useState<{ prim: string; sec: string }>({
      prim: "1",
      sec: "1"
   });
   return (
      <div className={styles.mainWrapper}>
         {/* primary option */}
         <div className={`${styles.first} ${styles.option} ${displayV && styles.displayV}`}>
            <div>
               <IconButton
                  backgroundColor={currSelection.prim}
                  icon={icon.primary}
                  cta={{
                     handleClick: () => (
                        cta.handleOptionSelection(1), setcurrSelection({ prim: "2", sec: "1" })
                     )
                  }}
               />
            </div>
            <div className={styles.optionText}>
               <Parragraph text={text.primary} size='small' align={displayV ? "center" : "left"} />
            </div>
         </div>

         {/* secondary option */}
         <div className={`${styles.second} ${styles.option} ${displayV && styles.displayV}`}>
            <div>
               <IconButton
                  backgroundColor={currSelection.sec}
                  icon={icon.secondary}
                  cta={{
                     handleClick: () => (
                        cta.handleOptionSelection(1), setcurrSelection({ prim: "1", sec: "2" })
                     )
                  }}
               />
            </div>

            <div className={styles.optionText}>
               <Parragraph
                  text={text.secondary}
                  size='small'
                  align={displayV ? "center" : "left"}
               />
            </div>
         </div>
      </div>
   );
};
