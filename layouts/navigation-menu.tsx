// core
import React from "react";
import Link from "next/link";

// components

//styles
import navigationMenuStyles from "../styles/layouts/NavigationMenu.module.css";

const NavigationMenu = () => {
   return (
      <div className={`${navigationMenuStyles.mainWrapper}`}>
         <div className={navigationMenuStyles.subWrapper}>
            <Link href={"/"}>
               <a className={`${navigationMenuStyles.home} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
            <Link href={"/library"}>
               <a
                  className={`${navigationMenuStyles.library} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
            <Link href={"/wigo"}>
               <a className={`${navigationMenuStyles.feed} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
            <Link href={"/read"}>
               <a className={`${navigationMenuStyles.read} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
            <Link href={"/users/123"}>
               <a
                  className={`${navigationMenuStyles.profile} ${navigationMenuStyles.menuOption}`}></a>
            </Link>
         </div>
      </div>
   );
};

export default NavigationMenu;
