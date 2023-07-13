import React, { useEffect } from "react";
import styles from "./images_from_verse_grid.module.css";
import Image from "next/image";
import { Empty } from "../../../common/feedback/empty";
import { getImagesFromVerse } from "../../../../helpers/functions/reading/get_images_from_verse";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";

type TImageGridProps = {
   maxWidth?: number;
   height?: number;
   VERSE_ID: string;
};

export const ImagesFromVerseGrid = ({
   maxWidth = 480,
   height = 400,
   VERSE_ID
}: TImageGridProps) => {
   const [images, setImages] = React.useState<any[]>([]);
   const [lastId, setLastId] = React.useState<number>(CONTENT_LAST_ID);

   const getData = async () => {
      try {
         const { data, error, status } = await getImagesFromVerse({ VERSE_ID, last_id: lastId });
         console.log(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getData();
   }, []);

   return (
      <div className={styles.mainWrapper}>
         {images.map((img) => (
            <div
               key={img.ID}
               className={styles.imgWrapper}
               style={{ maxWidth, height }}
               onClick={() => img.ID}>
               <Image src={img.img_url} />
            </div>
         ))}

         {images.length === 0 && (
            <div className={styles.feedback}>
               <Empty />
            </div>
         )}
      </div>
   );
};
