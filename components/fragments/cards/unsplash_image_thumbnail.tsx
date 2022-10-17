import Image from "next/image";

// styles
import styles from "./unsplash_image_thumbnail.module.css";

type UnsplashImageThumbnail = {
   src: string;
   alt: string;
   author: string;
   link: string;
   customSize?: boolean;
   cta: {
      handleImgSelection: (link: string) => void;
   };
};

export const UnsplashImageThumbnail = ({
   src,
   alt,
   link,
   author,
   cta,
   customSize
}: UnsplashImageThumbnail) => {
   return (
      <div className={`${!customSize ? styles.mainWrapper : styles.mainWrapperCustomSize}`}>
         <div className={styles.image} onClick={() => cta.handleImgSelection(link)}>
            <img src={src} alt={alt} />
         </div>
         <a href={link} className={styles.author}>
            {author}
         </a>
      </div>
   );
};
