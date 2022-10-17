import styles from "./round_loader.module.css";

type TRoundLoaderProps = {
   customSize?: boolean;
};

export const RoundLoader = ({ customSize }: TRoundLoaderProps) => {
   return (
      <div className={`${styles.loaderWrapper} ${customSize && styles.loaderWrapperCustomSize}`}>
         <div className={styles.loader}></div>
      </div>
   );
};
