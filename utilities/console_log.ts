type Toptions = string[];

export const console_log = (data: any, options?: Toptions) => {
   const colors = ["#48cae4", "#fb5607", "#390099", "#a7c957", "#f07167", "#a98467", "#7678ed"];
   const index = Math.floor(Math.random() * colors.length);

   let opts = ["14px"];
   if (options) opts = options.map((o, i) => (opts[i] = o || opts[i]));

   const style = `font-size: ${opts[0]}; color: ${colors[index]}; background-color: white;`;

   console.log(index);
   if (typeof data === "object") {
      console.log(`%c${JSON.stringify(data)}`, style);
   } else {
      console.log(`%c${data}`, style);
   }
};
