// ************************** PURPOSE **************************** //
// *** This is only a wrapper to display each individual ********* //
// *** article component by calling a map on the props  ********** //
// *** passed in this component, which is an array of the ******** //
// *** article fetched from the library. ************************* //

// core
import React from "react";

//components
import Article from "../../fragments/library-items/article";

// styles
import articleCarrouselStyles from "../../styles/layouts/library-individual-pages/ArticlesCarrousel.module.css";

// types
import { articleProps } from "../../fragments/library-items/article";

type articleCarrouselProps = {
   articles: articleProps[];
};

const ArticlesCarrousel = ({ articles }: articleCarrouselProps) => {
   return (
      <div className={articleCarrouselStyles.mainWrapper}>
         <div className={articleCarrouselStyles.gridWrapper}>
            {articles.map((article: articleProps) => (
               <Article
                  id={article.id}
                  key={article.id}
                  title={article.title}
                  colors={article.colors}
                  author={article.author}
                  tags={article.tags}
                  reviews={article.reviews}
                  stars={article.stars}
                  file={article.file}
                  newClass={articleCarrouselStyles.articleWRapper}
               />
            ))}

            {/* ====== TEMPORARY data jsut to create more content ======= */}
            {articles.map((article: articleProps) => (
               <Article
                  id={article.id}
                  key={article.id}
                  title={article.title}
                  colors={article.colors}
                  author={article.author}
                  tags={article.tags}
                  reviews={article.reviews}
                  stars={article.stars}
                  file={article.file}
                  newClass={articleCarrouselStyles.articleWRapper}
               />
            ))}
         </div>
      </div>
   );
};

export default ArticlesCarrousel;
