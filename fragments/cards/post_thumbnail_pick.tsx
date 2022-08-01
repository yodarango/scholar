import Image from "next/image";
import { ExternalLink } from "../Typography/external_link";

//styles
import styles from "./post_thumbnail_pick.module.css";

type PostThumbnailPick = {
   image: string;
   alt: string;
   authorLink: string;
   author: string;
};

export const PostThumbnailPick = ({ image, alt, authorLink, author }: PostThumbnailPick) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.image}>
            <Image layout='fill' src={image} alt={alt} />
         </div>
         <div className={styles.author}>
            <ExternalLink href={authorLink} text={author} size='xsmall' type='2' />
         </div>
      </div>
   );
};
