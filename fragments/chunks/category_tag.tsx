// styles
import styles from "./category_tag.module.css";

type TCategoryTagprops = {
   id: string;
   customSize?: boolean;
   informativeOnly?: boolean;
   cta?: React.MouseEventHandler<HTMLDivElement>;
};

export const CategoryTag = ({ id, customSize, informativeOnly = true, cta }: TCategoryTagprops) => {
   const handleOpenNotificationPopup = () => {};
   return (
      <div onClick={informativeOnly ? () => handleOpenNotificationPopup() : cta}>
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
               className={`${styles.mainWrapper} ${customSize ? styles.mainWrapperCustomSize : ""}${
                  styles.cyn
               }`}>
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
   );
};
