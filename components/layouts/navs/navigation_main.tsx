import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import { Icon } from "../../fragments/chunks/icons";
//styles
import styles from "./navigation_main.module.css";

export const NavigationMain = ({ children }: any) => {
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
         } else if (router.asPath.includes("/verse-by-verse")) {
            setcurrentPage("commentary");
         } else if (router.asPath.includes("/read")) {
            setcurrentPage("read");
         } else if (router.asPath.includes("/users")) {
            setcurrentPage("profile");
         }
      }
   }, [router.isReady]);

   return (
      <>
         {children}
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
               <Link href={"/verse-by-verse"}>
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
      </>
   );
};
