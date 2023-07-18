import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import { Icon } from "../../fragments/chunks/icons";
//styles
import styles from "./navigation_main.module.css";

export const NavigationMain = ({ children }: any) => {
   const [shouldRender, setshouldRender] = useState<boolean>(true);
   // router
   const router = useRouter();
   // var ua = navigator.userAgent;
   // const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(ua);

   const [currentPage, setcurrentPage] = useState<string>("");

   // check the current page to change the color of the icon
   useEffect(() => {
      if (router.isReady) {
         if (router.asPath === "/") {
            setcurrentPage("home");
         } else if (router.asPath.includes("/explore")) {
            setcurrentPage("commentary");
         } else if (router.asPath.includes("/read")) {
            setcurrentPage("read");
         } else if (router.asPath.includes("/users")) {
            setcurrentPage("users");
         }

         const shouldNotRenderRouters = [
            "/commentary",
            "/quote",
            "/article",
            "/sermon-note",
            "/login",
            "/register",
            "/forgot-password",
            "/reset-password"
         ];

         let renderIt;

         shouldNotRenderRouters.forEach((item) => {
            const cantRender = router.asPath.includes(item);
            if (cantRender) renderIt = false;
         });

         if (renderIt === false) {
            setshouldRender(false);
         } else {
            setshouldRender(true);
         }
      }
   }, [router]);

   return (
      <>
         {children}
         {shouldRender && (
            <div className={`${styles.mainWrapper}`}>
               <div className={styles.subWrapper}>
                  <Link href={"/"}>
                     <a
                        onClick={() => setcurrentPage("home")}
                        className={`${styles.home} ${styles.menuOption} ${
                           currentPage === "home" && styles.active
                        }`}>
                        <Icon name='home' size='3rem' color='#F1EAFF' />
                     </a>
                  </Link>

                  <Link href={"/explore"}>
                     <a
                        onClick={() => setcurrentPage("commentary")}
                        className={`${styles.feed} ${styles.menuOption} ${
                           currentPage === "commentary" && styles.active
                        }`}>
                        <Icon name='sparkles' size='3rem' color='#F1EAFF' />
                     </a>
                  </Link>
                  <Link href={"/read/@me"}>
                     <a
                        onClick={() => setcurrentPage("read")}
                        className={`${styles.read} ${styles.menuOption} ${
                           currentPage === "read" && styles.active
                        }`}>
                        <Icon name='book' size='3rem' color='#F1EAFF' />
                     </a>
                  </Link>
                  <Link href={"/users/@me"}>
                     <a
                        onClick={() => setcurrentPage("users")}
                        className={`${styles.profile} ${styles.menuOption} ${
                           currentPage === "users" && styles.active
                        }`}>
                        <Icon name='profile' size='3rem' color='#F1EAFF' />
                     </a>
                  </Link>
               </div>
            </div>
         )}
      </>
   );
};
