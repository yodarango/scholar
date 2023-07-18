// comps
import { LinkWithArrow } from "../../fragments/buttons/link_with_arrow";
import { Header } from "../../fragments/Typography/header";
import { ArticlesOneLineCarrousel } from "../scrollers/user_content/articles_one_line_carrousel";

// styles
import styles from "./fast_facts.module.css";

// types
import { TArticle } from "../../../types/posts";

type TArticlesDisplayProps = {
   articles: TArticle[];
};
export const ArticlesDisplay = ({ articles }: TArticlesDisplayProps) => {
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

         <div className={styles.articles}>
            <ArticlesOneLineCarrousel articles={articles} />
         </div>
      </div>
   );
};
