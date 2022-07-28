/*************************************************************************************** 
 - This helpers validates that there is indeed a "next" or a "prev" page to go to 
 ***************************************************************************************/
export function handleBibleChapterPagination(
   prevChapter: string | undefined | null,
   nextChapter: string | undefined | null
) {
   // if there is both forth and prev verses return the values and show both buttons
   if (nextChapter && prevChapter) {
      return {
         showForthbutton: nextChapter,
         showBackbutton: prevChapter
      };
   }

   // if the passage being read is Genesis 1  there wont be a prev passage, handle this scenario
   if (!prevChapter) {
      return {
         showForthbutton: nextChapter,
         showBackbutton: null
      };
   }

   // if the passage being read is Geensis is 22 there wont be a next passage, handle this scenario
   if (!nextChapter) {
      return {
         showForthbutton: null,
         showBackbutton: prevChapter
      };
   }
}
