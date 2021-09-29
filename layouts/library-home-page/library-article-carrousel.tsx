// core
import React from "react";

// components
import Article from "../../fragments/library-items/article";

// styles
import libraryArticlesCarrouselStyles from "../../styles/layouts/library-home-page/LibraryArticlesCarrousel.module.css";

// types
import { articleProps } from "../../fragments/library-items/article";

type LibraryArticleCarrouselProps = {
   articles: articleProps[];
};
const LibraryArticleCarrousel = ({ articles }: LibraryArticleCarrouselProps) => {
   return (
      <div className={`${libraryArticlesCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryArticlesCarrouselStyles.title}>ARTICLES</h1>
         <div className={libraryArticlesCarrouselStyles.scrollSection}>
            {articles.map((article: articleProps) => {
               return (
                  <Article
                     key={article.id}
                     id={article.id}
                     userId={article.userId}
                     categoryTags={article.categoryTags}
                     tagColors={article.tagColors}
                     title={article.title}
                     author={article.user === null ? "" : article.user.fullName}
                     currentRanking={article.currentRanking}
                     description={article.description}
                     fileUrl={article.fileUrl}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default LibraryArticleCarrousel;
