// core
import { spawn } from "child_process";
import React from "react";

// component
import { congregationProps } from "../library-items/congregation";

//styles
import churchInfoStyles from "../../styles/fragments/popup-content/ChurchInfo.module.css";

const ChurchInfo = ({
   address,
   city,
   id,
   location,
   logo,
   name,
   schedule,
   state,
   zip,
   website,
   iFrame
}: congregationProps) => {
   return (
      <div className={churchInfoStyles.mainWrapper}>
         <div className={churchInfoStyles.gridLeft}>
            <h2 className={churchInfoStyles.name}>{name}</h2>
            <div
               style={{ backgroundImage: `url(${logo})` }}
               className={churchInfoStyles.logo}></div>
            {schedule && (
               <h3 className={churchInfoStyles.h3}>
                  schedule:
                  {schedule.map((sched) => (
                     <h4>{sched}</h4>
                  ))}
               </h3>
            )}
            {!schedule && (
               <h3 className={churchInfoStyles.schedule}>
                  schedule: <h4>Not available!</h4>
               </h3>
            )}
            <h3 className={churchInfoStyles.h3}>
               Address:
               <h4 className={churchInfoStyles.address}>{address}</h4>
               <h4 className={churchInfoStyles.cityState}>
                  {city}, {state}
               </h4>
               <h4 className={churchInfoStyles.zip}>{zip}</h4>
            </h3>
            <a href={website} className={churchInfoStyles.website}>
               For more info visit the website
            </a>
         </div>
         <div className={`${churchInfoStyles.locationMapWrapper} ${churchInfoStyles.gridRight}`}>
            <iframe
               className={churchInfoStyles.map}
               src={iFrame}
               width={400}
               height={300}
               allowFullScreen={true}
               loading={"lazy"}></iframe>
         </div>
      </div>
   );
};

export default ChurchInfo;
