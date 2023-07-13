import React, { useEffect } from "react";
import styles from "./images_from_verse_grid.module.css";
import Image from "next/image";
import { Empty } from "../../../common/feedback/empty";
import { getImagesFromVerse } from "../../../../helpers/functions/reading/get_images_from_verse";
import { CONTENT_LAST_ID } from "../../../../constants/defaults";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { Error } from "../../../common/feedback/error";
import { Primary } from "../../../fragments/buttons/primary";
import { SmallLoader } from "../../../fragments/chunks/small_loader";

type TImageGridProps = {
   VERSE_ID: string;
   trigger?: number; // to trigger a new fetch from parent
};

export const ImagesFromVerseGrid = ({ VERSE_ID, trigger }: TImageGridProps) => {
   const [images, setImages] = React.useState<any[]>([]);
   const [lastId, setLastId] = React.useState<number>(CONTENT_LAST_ID);
   const [loading, setLoading] = React.useState<string>("loading");

   const [canLoadMore, setCanLoadMore] = React.useState<boolean>(false);

   const getData = async (isLoadMore?: boolean) => {
      if (isLoadMore) setLoading("loadingSmall");

      try {
         const { data, error, status } = await getImagesFromVerse({ VERSE_ID, last_id: lastId });

         if (status === "done") {
            setLoading("done");

            if (data.length === 6) setCanLoadMore(true);
            else setCanLoadMore(false);

            if (isLoadMore) setImages((prev) => [...prev, ...data]);
            else setImages(data);

            if (data.length > 0) setLastId(data[data.length - 1].ID);
         } else if (error) {
            console.error(error);
            setLoading("error");
         }
      } catch (error) {
         console.error(error);
         console.error(error);
      }
   };

   const handleGetMore = async () => {
      getData(true);
   };

   useEffect(() => {
      getData();
   }, [trigger]);

   return (
      <div className={styles.mainWrapper}>
         {(loading === "done" || loading === "loadingSmall") &&
            images.length > 0 &&
            images.map((img) => (
               <div key={img?.ID} className={styles.imgWrapper} onClick={() => img?.ID}>
                  <Image
                     layout='fill'
                     src={img?.img_url}
                     alt='Image created by AI from a bible verse'
                  />
               </div>
            ))}

         {loading === "done" && canLoadMore && (
            <Primary title='See more' cta={{ handleClick: handleGetMore }} type='1' />
         )}

         {loading === "loadingSmall" && <SmallLoader />}

         {images.length === 0 && loading === "done" && (
            <div className={styles.feedback}>
               <Empty />
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.feedback}>
               <RoundLoader />
            </div>
         )}

         {loading === "error" && (
            <div className={styles.feedback}>
               <Error />
            </div>
         )}
      </div>
   );
};
