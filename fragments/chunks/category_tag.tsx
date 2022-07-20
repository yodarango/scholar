import { useState } from "react";

// comps
import { Notification } from "../popups/notification";

// styles
import styles from "./category_tag.module.css";

// data
import { categoryMeta, TcategoryMeta } from "../../data/category_meta";

type TCategoryTagprops = {
   id: string;
   customSize?: boolean;
   cta?: React.MouseEventHandler<HTMLDivElement>;
};

export const CategoryTag = ({ id, customSize, cta }: TCategoryTagprops) => {
   const [isPopupOpen, setisPopupOpen] = useState<boolean | JSX.Element>(false);

   // ---------------- open the category popup -----------------
   const handleOpenNotificationPopup = () => {
      const category = categoryMeta.filter((item: TcategoryMeta) => item.tag === `#${id}`);

      const cardTitle = category[0].title;
      const cardBody = category[0].subjects.toString().split(",").join(", ");
      const cardColor = category[0].color;

      setisPopupOpen(
         <Notification
            title={cardTitle}
            body={cardBody}
            cta={() => setisPopupOpen(false)}
            type='custom'
            customColor={{ light: cardColor, dark: cardColor }}
         />
      );
   };
   return (
      <>
         {isPopupOpen}
         <div onClick={!cta ? () => handleOpenNotificationPopup() : cta}>
            {id === "BLK" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.blk}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "BL" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.bl}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "BR" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.br}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "CYN" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  }${styles.cyn}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "GRN" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.grn}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "OR" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.or}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "PNK" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.pnk}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "PPL" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.ppl}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "RD" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.rd}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
            {id === "YLW" && (
               <div
                  className={`${styles.mainWrapper} ${
                     customSize ? styles.mainWrapperCustomSize : ""
                  } ${styles.ylw}`}>
                  <span className={`${styles.tag}`}></span>
               </div>
            )}
         </div>
      </>
   );
};
