// components
import { useState, useEffect } from "react";
import { CloseContent } from "../../fragments/buttons/close_content";
import { Primary } from "../../fragments/buttons/primary";
import { UnsplashImageThumbnail } from "../../fragments/cards/unsplash_image_thumbnail";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { SearchInput } from "../../fragments/inputs/search_input";

// styles
import styles from "./unsplash_img_picker.module.css";

type TUnsplasImgPickerProps = {
   cta: {
      handleImgSelection: (url: string) => void;
      closeModal: () => void;
   };
};
export const UnsplasImgPicker = ({ cta }: TUnsplasImgPickerProps) => {
   //state
   const [images, setimages] = useState<any>([]);
   const [page, setpage] = useState<number>(1);
   const [currentSearch, setcurrentSearch] = useState<string>("");
   const [loading, setloading] = useState<string>("done");

   // fetch images from unsplash on click
   const handleSearchGo = async (search: string) => {
      setcurrentSearch(search);

      try {
         const request = await fetch(
            `https://api.unsplash.com/search/photos/?page=${page}&per_page=20&query=${search}&orientation=landscape&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS}`
         );
         const response = await request.json();
         console.log(response.results);
         if (response.results) {
            if (images.length === 0) {
               setimages(response.results);
            } else {
               setimages([...images, ...response.results]);
            }

            setloading("done");
         } else {
            setimages([]);
            setloading("error");
         }
      } catch (error) {
         setimages([]);
         setloading("error");
         console.log(error);
      }
   };

   useEffect(() => {
      handleSearchGo(currentSearch);
   }, [page]);
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.close}>
            <CloseContent cta={{ handleClick: cta.closeModal }} />
         </div>
         <div className={styles.search}>
            <SearchInput placeholder='Search' maxL={30} cta={{ handleSearchGo }} />
         </div>
         {loading === "done" && (
            <section className={styles.imageWrapper}>
               {images.map((img: any, index: number) => (
                  <div className={styles.thumbnail} key={index}>
                     <UnsplashImageThumbnail
                        customSize={true}
                        link={"#"}
                        author={`by ${img.first_name} ${img.last_name}`}
                        alt={img.alt_description}
                        src={img.urls.thumb}
                        cta={{ handleImgSelection: () => cta.handleImgSelection(img.urls.regular) }}
                     />
                  </div>
               ))}
            </section>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.errorFetching}>
               <ResourceNotFoundError />
            </div>
         )}
         {images.length >= 20 && (
            <div className={styles.loadMore}>
               <Primary title='Load more' cta={{ handleClick: () => setpage(page + 1) }} type='1' />
            </div>
         )}
      </div>
   );
};
