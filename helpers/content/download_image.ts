//? currently working on this feature. A the time of writing 02/13/23 it might
//? not be worth including this feature since most apps can do this so it can wait

export const downloadImage: (imgSrc: string) => void = async (imgSrc: string) => {
   // const image = await fetch(imgSrc);
   // const imageBlog = await image.blob();
   // const imageURL = URL.createObjectURL(imageBlog);

   // const link = document.createElement("a");
   // link.href = imageURL;
   // link.download = "image file name here";
   // document.body.appendChild(link);
   // link.click();
   // document.body.removeChild(link);

   // setup the canvas
   let canvas = document.createElement("canvas");
   let ctx = canvas.getContext("2d");
   canvas.width = 200;
   canvas.height = 205;

   // setup the text
   let text = document.createElement("p");
   text.innerHTML = "THIS IS MY SAMPLE TEXT";
   //let link = document.getElementById("link");

   // Draw something
   let img = document.createElement("img");
   img.src = imgSrc;

   ctx?.drawImage(img, 10, 10);
   document.appendChild(canvas);

   //ctx.fillStyle = "green";
   //ctx.fillRect(0, 0, 200, 200);

   //link.addEventListener("click", clickHandler, false);

   // function clickHandler() {
   //    ctx.clearRect(0, 225, 200, 20); // Clear just the text part
   //    ctx.font = "20px serif";
   //    ctx.fillText(text.value, 0, 220);

   //    var a = document.createElement("a");
   //    a.download = "filename.png";
   //    a.href = canvas.toDataURL();
   //    document.body.appendChild(a);
   //    a.click();
   //    document.body.removeChild(a);
   //    delete a;
   // }
};
