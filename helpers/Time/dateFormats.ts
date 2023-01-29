export const MM_DD_YYYY = (splitter: string = "-") => {
   const month = new Date().getMonth();
   const day = new Date().getDate();
   const year = new Date().getFullYear();

   return `${month + 1}${splitter}${day}${splitter}${year}`;
};
