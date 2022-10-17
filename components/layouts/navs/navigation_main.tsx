//! component does not work on stories since it is using next router
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// components
import { Icon } from "../fragments/chunks/icons";
//styles
import styles from "./navigation_main.module.css";

export const NavigationMain = () => {
   //-------------- router -------------
   const router = useRouter();

   // --------------- state ------------------
   const [displayLib, setDisplayLib] = useState<boolean>(true);
   const [currentPage, setcurrentPage] = useState<string>("");

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

   // ------------ check the current page to change the color of the icon ----------
   useEffect(() => {
      if (router.isReady) {
         if (router.asPath === "/") {
            setcurrentPage("home");
         } else if (router.asPath.includes("/library")) {
            setcurrentPage("library");
         } else if (router.asPath.includes("/commentary")) {
            setcurrentPage("commentary");
         } else if (router.asPath.includes("/read")) {
            setcurrentPage("read");
         } else if (router.asPath.includes("/users")) {
            setcurrentPage("profile");
         }
      }
   }, [router.isReady]);

   return (
      <div className={`${styles.mainWrapper}`}>
         <div className={styles.subWrapper}>
            <Link href={"/"}>
               <a
                  className={`${styles.home} ${styles.menuOption} ${
                     currentPage === "home" && styles.active
                  }`}>
                  <Icon name='home' size='2rem' color='#F1EAFF' />
               </a>
            </Link>
            {displayLib && (
               <Link href={"/library"}>
                  <a
                     className={`${styles.library} ${styles.menuOption} ${
                        currentPage === "library" && styles.active
                     }`}>
                     <Icon name='library' size='2rem' color='#F1EAFF' />
                  </a>
               </Link>
            )}
            <Link href={"/commentary"}>
               <a
                  className={`${styles.feed} ${styles.menuOption} ${
                     currentPage === "commentary" && styles.active
                  }`}>
                  <Icon name='chat' size='2rem' color='#F1EAFF' />
               </a>
            </Link>
            <Link href={"/read"}>
               <a
                  className={`${styles.read} ${styles.menuOption} ${
                     currentPage === "read" && styles.active
                  }`}>
                  <Icon name='book' size='2rem' color='#F1EAFF' />
               </a>
            </Link>
            <Link href={"/users/me"}>
               <a
                  className={`${styles.profile} ${styles.menuOption} ${
                     currentPage === "users" && styles.active
                  }`}>
                  <Icon name='profile' size='2rem' color='#F1EAFF' />
               </a>
            </Link>
         </div>
      </div>
   );
};
