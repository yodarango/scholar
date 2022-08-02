export const contDown = (countTo: string) => {
   const now = new Date().getTime();
   let countToDate = new Date(countTo).getTime() - now;
   let h = Math.floor((countToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   let m = Math.floor((countToDate % (1000 * 60 * 60)) / (1000 * 60));
   let s = Math.floor((countToDate % (1000 * 60)) / 1000);

   if (now < 0) {
      return "00:00:00";
   }
   return `${h}:${m}:${s}`;
};
