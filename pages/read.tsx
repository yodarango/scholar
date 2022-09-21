import Head from "next/head";
import HeadContent from "../SEO/head-content";
import { useState, useEffect } from "react";

// comps
import { ReadBibleModal } from "../templates/read_bible_modal";

// styles
import styles from "./read.module.css";

const Read = () => {
   const [theme, settheme] = useState<string | undefined>(undefined);

   // get the theme settings
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSParsed = JSON.parse(LSExists);
         settheme(LSParsed.theme);
      }
   }, []);

   return (
      <main
         className={`${styles.mainWrapper} ${
            theme === "1"
               ? styles.firstTheme
               : theme === "2"
               ? styles.secondTheme
               : theme === "4"
               ? styles.fourthTheme
               : styles.thirdTheme // default one
         }`}>
         <div className={styles.readBibleTemplate}>
            <ReadBibleModal cta={{ handleTheme: (theme: string) => settheme(theme) }} />
         </div>
      </main>
   );
};
export default Read;
