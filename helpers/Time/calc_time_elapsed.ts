/**************************************************************************
 * takes in a date string in format of UTC or a number/ string in format
 * of milliseconds and returns a social media like format date
 * @param date
 * @returns lapse
 */

export function calcElapsedTime(date: string | number | Date) {
   // check if we are passing milliseconds so we can convert to days
   let postedTime: number = 0;

   if (typeof date === "string") {
      // the date is in the format "month day year hour:min:sec"
      if (date.includes(" ")) {
         postedTime = new Date(date).getTime();
      }
      postedTime = parseInt(date);
   } else if (typeof date === "number") {
      postedTime = date;
   }

   const now: number = Date.now();
   const timeLapsed: number = now - postedTime;
   const timeInSeconds: number = timeLapsed / 1000;
   const timeInMinutes: number = timeInSeconds / 60;
   const timeInHours: number = timeInMinutes / 60;
   const timeInDays: number = timeInHours / 24;
   const timeInMonths: number = timeInDays / 30;
   const timeInYears: number = timeInMonths / 12;

   if (timeInSeconds < 60) {
      const s = timeInSeconds < 2 ? "" : "s";
      return `${Math.floor(timeInSeconds)}sec${s} ago`;
   } else if (timeInSeconds > 60 && timeInMinutes < 60) {
      const s = timeInMinutes < 2 ? "" : "s";
      return `${Math.floor(timeInMinutes)}min${s} ago`;
   } else if (timeInMinutes > 60 && timeInHours < 60) {
      const s = timeInHours < 2 ? "" : "s";
      return `${Math.floor(timeInHours)}hr${s} ago`;
   } else if (timeInHours > 60 && timeInDays < 30) {
      const s = timeInDays < 2 ? "" : "s";
      return `${Math.floor(timeInDays)}day${s} ago`;
   } else if (timeInDays > 30 && timeInMonths < 12) {
      const s = timeInMonths < 2 ? "" : "s";
      return `${Math.floor(timeInMonths)}mth${s} ago`;
   } else if (timeInMonths > 12) {
      const s = timeInMonths < 2 ? "" : "s";
      return `${Math.floor(timeInYears)}yr${s} ago`;
   } else {
      return "sometime ago";
   }
}
