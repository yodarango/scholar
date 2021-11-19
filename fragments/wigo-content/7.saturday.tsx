/******************************************************************************************************/
/*** This content will be rendere only on saturdays and its mainpurpose is to share random and ********/
/*** Interesting news going on. From Christian persecuton to global events that might concern  ********/
/*** Christians ***************************************************************************************/

// core
import React, { useState } from "react";
import Image from "next/image";

// comps
import PopupWrapper from "../../layouts/popup-wrapper";

// styles
import saturdayStyles from "../../styles/fragments/wigo-content/7.Saturday.module.css";

type saturdayProps = {
   saturdayContent: {
      title: string;
      context: string;
      image: string;
      link?: string;
      html?: string;
   };
};
const Saturday = ({ saturdayContent }: saturdayProps) => {
   console.log(saturdayContent.image);
   const [seeWholeNewsPostState, setseeWholeNewsPostState] = useState<boolean | JSX.Element>(false);
   return (
      <>
         {seeWholeNewsPostState && (
            <PopupWrapper
               closeModal={() => setseeWholeNewsPostState(false)}
               content={
                  <>
                     {!saturdayContent.html && (
                        <div className={saturdayStyles.popupWrapper}>
                           <h2 className={saturdayStyles.popupTitle}>{saturdayContent.title}</h2>
                           <div className={saturdayStyles.popupImage}>
                              <Image
                                 layout='fill'
                                 alt='thumbnail of a news article'
                                 src={saturdayContent.image}
                              />
                           </div>
                           {saturdayContent.context && (
                              <p className={saturdayStyles.popupContext}>
                                 {saturdayContent.context}
                              </p>
                           )}
                           {saturdayContent.link && (
                              <a
                                 href={saturdayContent.link}
                                 className={saturdayStyles.popupLink}
                                 id={saturdayStyles.popupLink}>
                                 See more sources
                              </a>
                           )}
                        </div>
                     )}
                     {saturdayContent.html && (
                        <div
                           dangerouslySetInnerHTML={{ __html: saturdayContent.html }}
                           className={saturdayStyles.popupHtml}
                        />
                     )}
                  </>
               }
            />
         )}
         <div className={saturdayStyles.mainWrapper}>
            <h3 className={saturdayStyles.title}>{saturdayContent.title}</h3>
            <div className={saturdayStyles.image}>
               <Image layout='fill' alt='thumbnail of a news article' src={saturdayContent.image} />
            </div>
            <p className={saturdayStyles.context}>{saturdayContent.context}</p>
            <span
               className={`${saturdayStyles.seeMore} std-vector-icon`}
               onClick={() => setseeWholeNewsPostState(true)}></span>
         </div>
      </>
   );
};

export default Saturday;
