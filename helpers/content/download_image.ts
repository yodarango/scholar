export const downloadImage: (imgSrc: string) => void = async (imgSrc: string) => {
   const image = await fetch(imgSrc);
   const imageBlog = await image.blob();
   const imageURL = URL.createObjectURL(imageBlog);

   const link = document.createElement("a");
   link.href = imageURL;
   link.download = "image file name here";
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
};
