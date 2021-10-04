// core
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// styles
import libraryFilterStyles from "../../styles/buttons/LibraryFilter.module.css";
const LibraryFilterBlog = () => {
   // ====================   FUNCTINO 1: Sort contnent by letter    =========== //
   const [sortByLetterState, setSortByLetterState] = useState<boolean>(false);

   const router = useRouter();
   ///// ======= fetch from A to Z
   const handleSortingByLetterAtoZ = () => {
      setSortByLetterState(true);
      router.push({ pathname: router.route, query: { alphOrd: "desc" } });
   };

   //// ========= fetch from Z to A
   const handleSortingByLetterZtoA = () => {
      setSortByLetterState(false);
      router.push({ pathname: router.route, query: { alphOrd: "asc" } });
   };

   // ====================   FUNCTINO 2: Sort contnent by Date    =========== //
   const [sortByDateState, setSortByDateState] = useState<boolean>(false);

   ///// ======= fetch from A to Z
   const handleSortingByDateNtoO = () => {
      setSortByDateState(true);
      setSortByLetterState(false);
      router.push({ pathname: router.route, query: { dateOrd: "asc" } });
   };

   //// ========= fetch from Z to A
   const handleSortingByDateOtoN = () => {
      setSortByDateState(false);
      setSortByLetterState(false);
      router.push({ pathname: router.route, query: { dateOrd: "desc" } });
   };

   return (
      <div className={`${libraryFilterStyles.mainWrapper}`}>
         <Link href={`/library/blog-writers`}>
            <a className={`std-button ${libraryFilterStyles.stdButton}`}>
               <p
                  className={`std-button_gradient-text ${libraryFilterStyles.stdButtonTextGradient}`}>
                  By Writter
               </p>
            </a>
         </Link>
         {!sortByLetterState && (
            <span
               className={`${libraryFilterStyles.aTozButton}`}
               onClick={handleSortingByLetterAtoZ}>
               A → Z
            </span>
         )}
         {sortByLetterState && (
            <span
               className={`${libraryFilterStyles.aTozButton}`}
               onClick={handleSortingByLetterZtoA}>
               Z → A
            </span>
         )}
         {!sortByDateState && (
            <span
               className={`${libraryFilterStyles.newToOldButton}`}
               onClick={handleSortingByDateNtoO}>
               New → Old
            </span>
         )}
         {sortByDateState && (
            <span
               className={`${libraryFilterStyles.newToOldButton}`}
               onClick={handleSortingByDateOtoN}>
               Old → New
            </span>
         )}
      </div>
   );
};

export default LibraryFilterBlog;
