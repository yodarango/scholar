/**************************************************************************************** 
-  handles the query to display the posts to show in the user's profile based on the 
   filters prop
****************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { Header } from "../../../fragments/Typography/header";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import { GridPrimary } from "../grid_primary";
import { Commentary } from "../../../fragments/cards/posts/commentary";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TCommentary } from "../../../../types/posts";

type TCommentariesGridProps = {
   verseCitation?: string;
   verse?: string;
   commentaries: TCommentary[];
   filters?: {
      folder?: string;
      verseId?: string;
      tag?: string;
   };
};

export const CommentariesGrid = ({
   verseCitation,
   verse,
   filters,
   commentaries
}: TCommentariesGridProps) => {
   return (
      <div className={styles.mainWrapper}>
         {verseCitation && verse && (
            <div className={styles.verseWrapper}>
               <div className={styles.citation}>
                  <Header text={verseCitation} quiet={true} type={4} size='main' />
               </div>
               <div className={styles.verse}>
                  <Parragraph text={verse} size='main' />
               </div>
            </div>
         )}
         <div className={styles.gridWrapper}>
            <GridPrimary>
               {commentaries.map((commentary: TCommentary, index: number) => (
                  <div key={index} className={styles.child}>
                     <Commentary
                        customWidth={true}
                        cta={{
                           handleDelete: () => console.log("handle show post")
                        }}
                        commentary={commentary}
                     />
                  </div>
               ))}
            </GridPrimary>
         </div>
      </div>
   );
};
