/**************************************************************************************** 
-  handles the query to display the posts to show in the user's profile based on the 
   filters prop
****************************************************************************************/

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { Header } from "../../../fragments/Typography/header";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import { GridPrimary } from "../grid_primary";
import { Commentary } from "../../../fragments/cards/posts/commentary";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TCommentary } from "../../../../types/posts";
import { Primary } from "../../../fragments/buttons/primary";
import {
   handleGetCommentaries,
   TgetcommentariesVariables
} from "../../../../helpers/functions/posts/commentary_get";
import { SmallLoader } from "../../../fragments/chunks/small_loader";

type TCommentariesGridProps = {
   verseCitation?: string;
   verse?: string;
   commentaries: TCommentary[];
   showLoadMore: boolean;
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
   showLoadMore,
   commentaries
}: TCommentariesGridProps) => {
   const [commentariesArray, setcommentariesArray] = useState<any>(commentaries);
   const router = useRouter();
   // //const [last_id, set_last_id] = useState<number>(9999999999);
   // const [loading, setloading] = useState("done");

   // // fetch data
   // const handleLoadMore = async () => {
   //    setloading("loading");
   //    const last_id = commentariesArray ? commentariesArray.at(-1).ID : 9999999;
   //    try {
   //       const { data, status } = await handleGetCommentaries({ last_id });
   //       if (data && data.commentary) {
   //          setcommentariesArray((prev: any) => [...prev, ...data.commentary]);

   //          console.log(data);
   //       }
   //       setloading(status);
   //    } catch (error) {
   //       console.error(error);
   //       setcommentariesArray([]);
   //       setloading("done");
   //    }
   // };
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
               {commentariesArray.map((commentary: TCommentary, index: number) => (
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

            {showLoadMore && (
               <div className={styles.loadMore}>
                  <Primary
                     title='Load more'
                     type='1'
                     cta={{
                        handleClick: () =>
                           router.push({
                              pathname: router.pathname,
                              query: { last_id: commentariesArray.at(-1).ID, ...router.query }
                           })
                     }}
                  />
               </div>
            )}
            {!showLoadMore && (
               <div className={styles.smallLoader}>
                  <SmallLoader />
               </div>
            )}
         </div>
      </div>
   );
};
