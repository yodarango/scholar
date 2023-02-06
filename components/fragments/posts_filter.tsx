import React from "react";
import styles from "./posts_filter.module.css";
import { Parragraph } from "./Typography/parragraph";

export const PostFilter = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.link}>
            <Parragraph
               quiet
               size='main'
               align='center'
               text='Commentaries'
               href='/posts/commentary'
            />
         </div>
         <div className={styles.link}>
            <Parragraph quiet size='main' align='center' text='Quotes' href='/posts/quote' />
         </div>
         <div className={styles.link}>
            <Parragraph quiet size='main' align='center' text='Thoughts' href='/posts/thought' />
         </div>
      </div>
   );
};
