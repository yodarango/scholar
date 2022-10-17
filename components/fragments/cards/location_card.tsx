import Image from "next/image";
import { useState } from "react";

// props
import { Parragraph } from "../Typography/parragraph";
import { Header } from "../Typography/header";

// styles
import styles from "./location_card.module.css";

// types
import { TLocation } from "../../types/libray_content";

type TLocationProps = {
   location: TLocation;
   cta: {
      handleShowLocationInfo: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const LocationCard = ({ location, cta }: TLocationProps) => {
   const [noLogoAvailable, setnoLogoAvailable] = useState<boolean>(false);

   // select a css id at random
   const randomNum: number = Math.floor(Math.random() * 19);
   const randomID: string = `quote-bkg--${randomNum}`;

   // parse the string to get the initials only
   const locationName = location.name
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase())
      .toString()
      .replaceAll(",", "");

   return (
      <div className={styles.mainWrapper} onClick={cta.handleShowLocationInfo}>
         <div className={styles.card}>
            {!noLogoAvailable && (
               <div className={styles.logo}>
                  <Image
                     src={location.logo}
                     alt='church logo'
                     layout='fill'
                     onError={() => setnoLogoAvailable(true)}
                  />
               </div>
            )}
            {noLogoAvailable && (
               <div className={styles.customLogo} id={randomID}>
                  <Header type={3} size='xxxlarge' text={locationName} />
               </div>
            )}
         </div>

         <div className={styles.title}>
            <Parragraph size='xsmall' text={location.name} quiet={true} bold={true} />
         </div>
      </div>
   );
};
