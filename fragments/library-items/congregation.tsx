// core
import React, { useState } from "react";
import Image from "next/image";

//components
import PopupWrapper from "../../layouts/popup-wrapper";
import ChurchInfo from "../popup-content/church-info";

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
   website?: string;
   iFrame?: string;
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
   zip,
   website,
   iFrame
}: congregationProps) => {
   // set the images not directly from props but by state to set img fallback if it does not exist
   const [imageLogoState, setImageLogoState] = useState<string>(logo);
   // ================== FUNCTION 1: Opent the church info in a popup  =============== //
   const [churchInfoState, setChurchInfoState] = useState<JSX.Element | boolean>(false);
   const hanleSeeChurchInfo = () => {
      setChurchInfoState(
         <PopupWrapper
            closeModal={() => setChurchInfoState(false)}
            content={
               <ChurchInfo
                  address={address}
                  city={city}
                  id={id}
                  location={location}
                  logo={imageLogoState}
                  name={name}
                  schedule={schedule}
                  state={state}
                  zip={zip}
                  website={website}
                  iFrame={iFrame}
               />
            }
         />
      );
   };

   return (
      <>
         {churchInfoState}
         <div className={congregationStyles.mainWrapper}>
            <div className={congregationStyles.logo}>
               <Image
                  layout='fill'
                  src={`${imageLogoState}`}
                  onClick={hanleSeeChurchInfo}
                  onError={() => setImageLogoState("/Parks10.png")}
               />
            </div>
            <h2 className={congregationStyles.name}>{name}</h2>
            <p className={congregationStyles.address}>
               {city}, {state}
            </p>
            {website && (
               <a
                  href={website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={congregationStyles.website}
                  id={congregationStyles.website}>
                  Visit website
               </a>
            )}
            <a
               href={location}
               target='_blank'
               rel='noopener noreferrer'
               className={congregationStyles.location}
               id={congregationStyles.location}>
               Get Directions
            </a>
         </div>
      </>
   );
};

export default Congregation;
