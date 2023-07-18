export const handleFileConvertion = (file: any, size: number) =>
   new Promise((resolve, reject) => {
      if (file) {
         if (file.size > size) {
            reject("File is too large");
         }
         const reader = new FileReader();
         reader.onload = (e) => {
            resolve(e.target?.result);
         };
         reader.readAsDataURL(file);
      }
   });
