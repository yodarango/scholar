// core
import React from "react";

// styles
import congregationStyles from "../../styles/fragments/library-items/Congregation.module.css";

export type congregationProps = {
   address: string;
   city: string;
   id: string;
   location: string;
   logo: string;
   name: string;
   schedule: string[];
   state: string;
   zip: string;
};
const Congregation = ({
   address,
   city,
   id,
   location,
   logo,
   name,
   schedule,
   state,
   zip
}: congregationProps) => {
   return (
      <div className={congregationStyles.mainWrapper}>
         <div style={{ backgroundImage: `url(${logo})` }} className={congregationStyles.logo}></div>
         <h2 className={congregationStyles.name}>{name}</h2>
         <p className={congregationStyles.address}>{address}</p>
         <a href='https://factv.org' target='_blank' rel='noopener noreferrer'>
            Visit website
         </a>
         <a href={location}>Get Directions</a>
      </div>
   );
};

export default Congregation;
