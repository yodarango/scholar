/**
 * Takes in a date string in format of UTC or a number/ string in format
 * of milliseconds and returns a social media-like format date
 * @param date - The input date, can be a string in "month day year hour:min:sec" format, number (milliseconds), or a Date object.
 * @returns Lapse - The time elapsed in a social media-like format.
 */
export function calcElapsedTime(date: string | number | Date): string {
   let postedTime: number = 0;

   if (typeof date === "string") {
      if (date.includes(" ")) {
         postedTime = new Date(date).getTime();
      } else {
         postedTime = parseInt(date);
      }
   } else if (typeof date === "number") {
      postedTime = date;
   } else if (date instanceof Date) {
      postedTime = date.getTime();
   } else {
      throw new Error(
         "Invalid date format. Please provide a valid date string, number (milliseconds), or Date object."
      );
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
      return `${Math.floor(timeInSeconds)} sec${s} ago`;
   } else if (timeInMinutes < 60) {
      const s = timeInMinutes < 2 ? "" : "s";
      return `${Math.floor(timeInMinutes)} min${s} ago`;
   } else if (timeInHours < 24) {
      const s = timeInHours < 2 ? "" : "s";
      return `${Math.floor(timeInHours)} hr${s} ago`;
   } else if (timeInDays < 7) {
      const s = timeInDays < 2 ? "" : "s";
      return `${Math.floor(timeInDays)} day${s} ago`;
   } else if (timeInDays < 31) {
      const s = timeInDays < 2 ? "" : "s";
      return `${Math.floor(timeInDays / 7)} wk${s} ago`;
   } else if (timeInMonths < 12) {
      const s = timeInMonths < 2 ? "" : "s";
      return `${Math.floor(timeInMonths)} mth${s} ago`;
   } else {
      const s = timeInYears < 2 ? "" : "s";
      return `${Math.floor(timeInYears)} yr${s} ago`;
   }
}
