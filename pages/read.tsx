import Head from "next/head";
import HeadContent from "../SEO/head-content";
import { useState } from "react";

// comps
import { ReadBibleTemplate } from "../templates/read_bible_modal";

// styles
import styles from "./read.module.css";

const Read = () => {
   const [theme, settheme] = useState<string | undefined>(undefined);
   return (
      <main
         className={`${styles.mainWrapper} ${
            theme === "1"
               ? styles.firstTheme
               : theme === "2"
               ? styles.secondTheme
               : theme === "3"
               ? styles.thirdTheme
               : styles.fourthTheme
         }`}>
         <ReadBibleTemplate handleTheme={(theme: string) => settheme(theme)} />
      </main>
   );
};
export default Read;
