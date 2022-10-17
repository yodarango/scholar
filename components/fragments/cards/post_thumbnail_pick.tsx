import Image from "next/image";
import { ExternalLink } from "../Typography/external_link";

//styles
import styles from "./post_thumbnail_pick.module.css";

type PostThumbnailPick = {
   imageUrl: string;
   alt: string;
   authorLink: string;
   author: string;
   cta: {
      handleSelectImage: (imageUrl: string) => void;
   };
};

export const PostThumbnailPick = ({
   imageUrl,
   alt,
   authorLink,
   author,
   cta
}: PostThumbnailPick) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.image} onClick={() => cta.handleSelectImage(imageUrl)}>
            <Image layout='fill' src={imageUrl} alt={alt} />
         </div>
         <div className={styles.author}>
            <ExternalLink href={authorLink} text={author} size='xsmall' type='2' />
         </div>
      </div>
   );
};
