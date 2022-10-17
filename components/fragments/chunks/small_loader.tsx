// core
import React from "react";

// stlyes
import styles from "./small_loader.module.css";

type TSmallLoaderProps = {
   inline?: boolean;
   customColors?: string[];
};

export const SmallLoader = ({ inline, customColors }: TSmallLoaderProps) => {
   return (
      <div className={`${styles.mainWrapper} ${inline ? styles.inline : ""}`}>
         <div className={styles.loader}>
            <svg
               version='1.1'
               id='Layer_1'
               x='0px'
               y='0px'
               width='24px'
               height='30px'
               viewBox='0 0 24 30'
               className={styles.svg}>
               <rect
                  x='0'
                  y='0'
                  width='4'
                  height='10'
                  fill={!customColors ? "#7350ec" : customColors[0]}>
                  <animateTransform
                     attributeType='xml'
                     attributeName='transform'
                     type='translate'
                     values='0 0; 0 20; 0 0'
                     begin='0'
                     dur='0.6s'
                     repeatCount='indefinite'
                  />
               </rect>
               <rect
                  x='10'
                  y='0'
                  width='4'
                  height='10'
                  fill={!customColors ? "#b293fe" : customColors[1]}>
                  <animateTransform
                     attributeType='xml'
                     attributeName='transform'
                     type='translate'
                     values='0 0; 0 20; 0 0'
                     begin='0.2s'
                     dur='0.6s'
                     repeatCount='indefinite'
                  />
               </rect>
               <rect
                  x='20'
                  y='0'
                  width='4'
                  height='10'
                  fill={!customColors ? "#7350ec" : customColors[2]}>
                  <animateTransform
                     attributeType='xml'
                     attributeName='transform'
                     type='translate'
                     values='0 0; 0 20; 0 0'
                     begin='0.4s'
                     dur='0.6s'
                     repeatCount='indefinite'
                  />
               </rect>
            </svg>
         </div>
      </div>
   );
};
