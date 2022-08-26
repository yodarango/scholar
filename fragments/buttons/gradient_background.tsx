import styles from "./gradient_background.module.css";

type TGradientBackgroundProps = {
   background?: string;
   backgroundCustom?: {
      light: string;
      dark: string;
   };
   customSize?: boolean;
   cta?: {
      handleClick: (background: string | { light: string; dark: string }) => void;
   };
};
export const GradientBackground = ({
   backgroundCustom,
   background,
   cta,
   customSize
}: TGradientBackgroundProps) => {
   return (
      <>
         {background && (
            <button
               className={`${customSize ? styles.mainWrapperCustomSize : styles.mainWrapper}`}
               id={background}
               onClick={() => cta?.handleClick(background)}>
               <span className={styles.shadow} id={background}></span>
            </button>
         )}
         {backgroundCustom && (
            <button
               className={`${customSize ? styles.mainWrapperCustomSize : styles.mainWrapper}`}
               style={{
                  backgroundImage: `linear-gradient(-10deg, ${backgroundCustom.light}, ${backgroundCustom.dark} )`
               }}
               onClick={() => cta?.handleClick(backgroundCustom)}>
               <span
                  className={styles.shadow}
                  style={{
                     backgroundImage: `background: linear-gradient(-10deg, ${backgroundCustom.light}, ${backgroundCustom.dark} );`
                  }}></span>
            </button>
         )}
      </>
   );
};
