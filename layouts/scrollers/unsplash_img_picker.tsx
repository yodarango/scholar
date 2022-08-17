/***********************************************************************************************
 - since two loaders are needed: one that renders at the bottom of an existing array of images
   and one that renders on the initial search, toloading states are used
-  returns a string with the chosen image background to the parent
************************************************************************************************/

// components
import { useState, useEffect } from "react";

// comps
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
      handleCloseModal: () => void;
   };
};
export const UnsplasImgPicker = ({ cta }: TUnsplasImgPickerProps) => {
   //state
   const [images, setimages] = useState<any>([]); /* images API call  */
   const [page, setpage] = useState<number>(1); /* current page of the API call  */
   const [currentSearch, setcurrentSearch] = useState<string>(""); /* current search string */
   const [loading, setloading] = useState<string>("done"); /* loading spinner on initial search  */
   const [loadingAfterFetch, setloadingAfterFetch] =
      useState<string>(""); /* loading after initial search  */

   // fetch images from unsplash on click
   const handleSearchGo = async (search: string) => {
      setcurrentSearch(search);

      try {
         const request = await fetch(
            `https://api.unsplash.com/search/photos/?page=${page}&per_page=20&query=${search}&orientation=landscape&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS}`
         );
         const response = await request.json();

         if (response.results) {
            setimages([...images, ...response.results]);

            // reset loaders
            setloading("done");
            setloadingAfterFetch("");
         } else {
            setimages([]);
            setloading("error");
            setloadingAfterFetch("");
         }
      } catch (error) {
         setimages([]);

         // reset loaders
         setloading("error");
         setloadingAfterFetch("");
         console.log(error);
      }
   };

   useEffect(() => {
      handleSearchGo(currentSearch);
   }, [page]);

   // handle the initial search
   const handleInitialSearch = (value: string) => {
      handleSearchGo(value);
      setloading("loading");
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.close}>
            <CloseContent cta={{ handleClick: cta.handleCloseModal }} />
         </div>
         <div className={styles.search}>
            <SearchInput
               placeholder='Search'
               maxL={30}
               cta={{ handleSearchGo: handleInitialSearch }}
            />
         </div>
         {loading === "done" && (
            <section className={styles.imageWrapper}>
               {images.map((img: any, index: number) => (
                  <div className={styles.thumbnail} key={index}>
                     <UnsplashImageThumbnail
                        customSize={true}
                        link={"#"}
                        author={`${index} by ${img.first_name} ${img.last_name}`}
                        alt={img.alt_description}
                        src={img.urls.thumb}
                        cta={{
                           handleImgSelection: () => cta.handleImgSelection(img.urls.regular)
                        }}
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
         {/* Bottom loader. It gets called only from the "Load More" button on an already queried search value */}
         {loadingAfterFetch === "loading_after" && (
            <div className={styles.loaderAfter}>
               <RoundLoader />
            </div>
         )}
         {/* Bottom loader. It gets called only from the "Search" button on the initial search for a specific string */}
         {loading === "error" && (
            <div className={styles.errorFetching}>
               <ResourceNotFoundError />
            </div>
         )}

         {loading === "done" && images.length === 0 && (
            <div className={styles.noImages}>#COMEBACK Start Searching graphics</div>
         )}
         {images.length >= 20 && (
            <div className={styles.loadMore}>
               <Primary
                  title='Load more'
                  cta={{
                     handleClick: () => (setpage(page + 1), setloadingAfterFetch("loading_after"))
                  }}
                  type='1'
               />
            </div>
         )}
      </div>
   );
};
