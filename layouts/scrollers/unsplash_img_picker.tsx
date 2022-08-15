// components
import { CloseContent } from "../../fragments/buttons/close_content";
import { Primary } from "../../fragments/buttons/primary";
import { UnsplashImageThumbnail } from "../../fragments/cards/unsplash_image_thumbnail";
import { SearchInput } from "../../fragments/inputs/search_input";

// styles
import styles from "./unsplash_img_picker.module.css";

type TUnsplasImgPickerProps = {
   images: object[];
   cta: {
      handleImgSelection: (url: string) => void;
      closeModal: () => void;
   };
};
export const UnsplasImgPicker = ({ images, cta }: TUnsplasImgPickerProps) => {
   // handle the onchange event returned from the input
   const handleSearchGo = (value: string) => {
      console.log(value);
   };
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.close}>
            <CloseContent cta={{ handleClick: cta.closeModal }} />
         </div>
         <div className={styles.search}>
            <SearchInput placeholder='Search' maxL={30} cta={{ handleSearchGo }} />
         </div>
         <section className={styles.imageWrapper}>
            {images.map((img: object) => (
               <UnsplashImageThumbnail
                  link={""}
                  author={""}
                  alt={""}
                  src=''
                  cta={{ handleImgSelection: cta.handleImgSelection }}
               />
            ))}
         </section>
         <div className={styles.loadMore}>
            <Primary title='Load more' cta={{ handleClick: (e) => console.log(e) }} type='1' />
         </div>
      </div>
   );
};
