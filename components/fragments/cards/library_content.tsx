import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// comps
import { Header } from "../Typography/header";
import { ContentReviews } from "../content_reviews";

//styles
import styles from "./library_content.module.css";
// import { SelectStarRating } from "../../layouts/menus/select_star_rating";

type TLibraryContentProps = {
   id: string;
   title: string;
   stars: number;
   reviews: number;
   img: {
      src: string;
      alt: string;
   };
   showDescriptionModal: boolean;
   description?: string;
   link: string;
};

export const LibraryContent = ({
   img,
   title,
   stars,
   reviews,
   id,
   showDescriptionModal,
   link,
   description
}: TLibraryContentProps) => {
   // ------------------ states ------------
   const [showContentReviewMenu, setshowContentReviewMenu] = useState<boolean>(false);

   // ------------------ open the preview modal
   const handleShowDescriptionModal = (id: string) => {};

   return (
      <>
         {/* {showContentReviewMenu && (
            <SelectStarRating cta={{ handleCloseModal: () => setshowContentReviewMenu(false) }} />
         )} */}
         <div className={styles.mainWrapper}>
            {showDescriptionModal && (
               <div className={styles.image} onClick={() => handleShowDescriptionModal(id)}>
                  <Image src={img.src} alt={img.alt} layout='fill' />
               </div>
            )}
            {!showDescriptionModal && (
               <Link href={link}>
                  <a className={styles.image} onClick={() => handleShowDescriptionModal(id)}>
                     <Image src={img.src} alt={img.alt} layout='fill' />
                  </a>
               </Link>
            )}
            <div className={styles.footer}>
               <div className={styles.title}>
                  <Header type={4} size='xsmall' text={title} />
               </div>
               <div className={styles.reviews}>
                  <ContentReviews
                     stars={stars}
                     reviews={reviews}
                     cta={{ handleShowStartRatingMenu: () => setshowContentReviewMenu(true) }}
                  />
               </div>
            </div>
         </div>
      </>
   );
};
