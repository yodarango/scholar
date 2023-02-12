export function countDown(countTo: string) {
   const currDate = new Date().getTime();
   let timeLeft = new Date(countTo).getTime() - currDate;
   let h = Math.floor((timeLeft % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));
   let m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
   let s = Math.floor((timeLeft % (1000 * 60)) / 1000);

   let result = { time: "", done: true };
   if (timeLeft < 0) {
      result = { time: "00:00:00", done: true };
   } else if (timeLeft > 0) {
      result = { time: `${h}:${m}:${s}`, done: false };
   }

   return result;
}
