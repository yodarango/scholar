// core
import React, { useState } from "react";
import Link from "next/link";

// styles
import libraryFilterStyles from "../../styles/buttons/LibraryFilter.module.css";

type libraryFilterProps = {
   params: string;
};
const LibraryFilter = ({ params }: libraryFilterProps) => {
   // ====================   FUNCTINO 1: Sort contnent by letter    =========== //
   const [sortByLetterState, setSortByLetterState] = useState<boolean>(false);

   ///// ======= fetch from A to Z
   const handleSortingByLetterAtoZ = () => {
      setSortByLetterState(true);
   };

   //// ========= fetch from Z to A
   const handleSortingByLetterZtoA = () => {
      setSortByLetterState(false);
   };

   // ====================   FUNCTINO 2: Sort contnent by Date    =========== //
   const [sortByDateState, setSortByDateState] = useState<boolean>(false);

   ///// ======= fetch from A to Z
   const handleSortingByDateNtoO = () => {
      setSortByDateState(true);
   };

   //// ========= fetch from Z to A
   const handleSortingByDateOtoN = () => {
      setSortByDateState(false);
   };

   return (
      <div className={`${libraryFilterStyles.mainWrapper}`}>
         <Link href={`/library/authors?content=${params}`}>
            <a className={`std-button ${libraryFilterStyles.stdButton}`}>
               <p
                  className={`std-button_gradient-text ${libraryFilterStyles.stdButtonTextGradient}`}>
                  By Author
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

export default LibraryFilter;
