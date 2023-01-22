import { useEffect, useState } from "react";

// components
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { CommentaryOneLineCarrousel } from "../scrollers/user_content/commentaries_one_line_carrousel";
import { Header } from "../../fragments/Typography/header";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// styles
import styles from "./wigo_commentaries.module.css";

//helpers
import { handleGetCommentariesIn24 } from "../../../helpers/functions/posts/commentary_get";

// types
import { TCommentary } from "../../../types/posts";

export const WigoCommentaries = () => {
   const [commentaries, setcommentaries] = useState<TCommentary[]>([]);
   const [loading, setloading] = useState<string>("loading");

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetCommentariesIn24();
         data && setcommentaries(data);

         setloading(status);
      } catch (error) {
         console.error(error);
         setcommentaries([]);
         setloading("error");
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.top}>
            <div>
               <Header type={3} text='Commentaries' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/commentary"} />
            </div>
         </div>

         <div className={styles.carrousel}>
            <CommentaryOneLineCarrousel commentaries={commentaries} loadingState={loading} />
         </div>
      </div>
   );
};
