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
         {articles.length > 0 && (
            <div className={articleCarrouselStyles.gridWrapper}>
               {articles.map((article: articleProps) => (
                  <Article
                     id={article.id}
                     totalReviews={article.totalReviews}
                     key={article.id}
                     title={article.title}
                     userId={article.userId}
                     tagColors={article.tagColors}
                     author={article.user === null ? "" : article.user.fullName}
                     categoryTags={article.categoryTags}
                     currentRanking={article.currentRanking}
                     fileUrl={article.fileUrl}
                     newClass={articleCarrouselStyles.articleWRapper}
                  />
               ))}
            </div>
         )}
         {articles.length === 0 && <h2 className={"no-content-text"}>no content found</h2>}
      </div>
   );
};

export default ArticlesCarrousel;
