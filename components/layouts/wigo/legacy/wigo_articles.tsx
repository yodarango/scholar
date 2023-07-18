// components
import { LinkWithArrow } from "../../../fragments/buttons/link_with_arrow";
import { Header } from "../../../fragments/Typography/header";
import { ArticlesOneLineCarrousel } from "../../scrollers/user_content/articles_one_line_carrousel";

// styles
import styles from "./wigo_thoughts.module.css";

// types
import { TArticle } from "../../../../types/posts";
import { useEffect, useState } from "react";

// helpers
import { handleGetArticleIn24 } from "../../../../helpers/functions/posts/article_get";

export const WigoArticles = () => {
   const [thoughts, setthoughts] = useState<TArticle[]>([]);
   const [loading, setloading] = useState<string>("loading");

   // fetch data
   const fetchData = async () => {
      try {
         const { data, status } = await handleGetArticleIn24();
         data && setthoughts(data);

         setloading(status);
      } catch (error) {
         console.error(error);
         setthoughts([]);
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
               <Header type={3} text='Articles' size='large' quiet={true} />
            </div>
            <div>
               <LinkWithArrow title='See all' link={"/posts/article"} />
            </div>
         </div>
         <div className={styles.carrousel}>
            <ArticlesOneLineCarrousel thoughts={thoughts} loadingState={loading} />
         </div>
      </div>
   );
};
