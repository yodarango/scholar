export const console_log = (data: any, color?: number, fontSize?: number) => {
   const colors = ["#8ac926", "#ff595e", "#ffca3a", "#1982c4", "#6a4c93"];
   const index = Math.floor(Math.random() * colors.length);

   let font = "16px";
   let col = colors[index];
   if (fontSize) font = `${fontSize}px`;
   if (color) col = colors[color];

   const style = `font-size: ${font}; color: ${col};`;

   if (typeof data === "object") {
      console.log(`%c${JSON.stringify(data)}`, style);
   } else {
      console.log(`%c${data}`, style);
   }
};
