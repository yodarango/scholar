// core
import { useEffect, useState } from "react";
import Link from "next/link";

// components

//styles
import navigationMenuStyles from "../styles/layouts/NavigationMenu.module.css";

const NavigationMenu = () => {
   const [displayLib, setDisplayLib] = useState<boolean>(true);
   // check if user is on mobile
   const goFullscreen = () => {
      var ua = navigator.userAgent;
      var isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(ua);

      if (isMobile) {
         setDisplayLib(false);
      }
   };

   useEffect(() => {
      goFullscreen();
   }, []);

   return (
      <div className={`${navigationMenuStyles.mainWrapper}`}>
         <div className={navigationMenuStyles.subWrapper}>
            <Link href={"/"}>
               <a className={`${navigationMenuStyles.home} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
            {displayLib && (
               <Link href={"/library"}>
                  <a
                     className={`${navigationMenuStyles.library} ${navigationMenuStyles.menuOption}`}></a>
               </Link>
            )}
            <Link href={"/wigo"}>
               <a className={`${navigationMenuStyles.feed} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
            <Link href={"/read"}>
               <a className={`${navigationMenuStyles.read} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
            <Link href={"/users/me"}>
               <a
                  className={`${navigationMenuStyles.profile} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
         </div>
      </div>
   );
};

export default NavigationMenu;
