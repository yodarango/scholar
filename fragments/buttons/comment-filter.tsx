import { stringify } from "querystring";
import React, { useState, MouseEvent } from "react";
import buttonStyles from "../../styles/components/CTA.module.css";

export default function CommentFilter() {
   type styleProps = {
      styleLeft: string;
      styleRight: string;
      styleMiddle: string;
   };
   const [resourceType, setresourceType] = useState<styleProps>({
      styleLeft: buttonStyles.commentFilterWrapperLeft,
      styleRight: buttonStyles.commentFilterWrapperRight,
      styleMiddle: buttonStyles.commentFilterWrapperMiddle
   });

   const fetchGeneralComments = (e: MouseEvent): void => {
      //const currTarget = e.currentTarget as Element;
      const target = e.currentTarget as Element;

      if (target.textContent === "General") {
         setresourceType({
            styleLeft: buttonStyles.commentFilterWrapperLeftActive,
            styleRight: buttonStyles.commentFilterWrapperRight,
            styleMiddle: buttonStyles.commentFilterWrapperMiddle
         });
      } else if (target.textContent === "Trusted") {
         setresourceType({
            styleLeft: buttonStyles.commentFilterWrapperLeft,
            styleRight: buttonStyles.commentFilterWrapperRight,
            styleMiddle: buttonStyles.commentFilterWrapperMiddleActive
         });
      } else {
         setresourceType({
            styleLeft: buttonStyles.commentFilterWrapperLeft,
            styleRight: buttonStyles.commentFilterWrapperRightActive,
            styleMiddle: buttonStyles.commentFilterWrapperMiddle
         });
      }
   };

   return (
      <div className={buttonStyles.commentFilterWrapper}>
         <div className={resourceType.styleLeft} onClick={fetchGeneralComments}>
            <p className='std-text-block'>General</p>
         </div>
         <div className={resourceType.styleMiddle} onClick={fetchGeneralComments}>
            <p className='std-text-block'>Trusted</p>
         </div>
         <div className={resourceType.styleRight} onClick={fetchGeneralComments}>
            <p className='std-text-block'>Classic</p>
         </div>
      </div>
   );
}
