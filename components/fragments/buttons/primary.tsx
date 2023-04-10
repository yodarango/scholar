import { Parragraph } from "../Typography/parragraph";
import styles from "./primary.module.css";

type TPrimaryProps = {
   type?: string;
   title: string;
   href?: string;
   htmlType?: any;
   disabled?: boolean;
   customColor?: { text: string; button: string };
   cta?: {
      handleClick: () => any;
   };
};

export const Primary = ({
   title,
   cta,
   type,
   href,
   htmlType = "button",
   disabled,
   customColor
}: TPrimaryProps) => {
   return (
      <>
         {type === "1" && (
            <>
               {!href && cta && !disabled && (
                  <button
                     type={htmlType}
                     className={`${styles.primary} ${styles.mainWrapper}`}
                     onClick={cta.handleClick}>
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </button>
               )}
               {href && !cta && !disabled && (
                  <a className={`${styles.primary} ${styles.mainWrapper}`} href={href}>
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </a>
               )}
               {disabled && (
                  <button
                     disabled
                     type={htmlType}
                     className={`${styles.primary} ${styles.mainWrapper} ${styles.disabled}`}>
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </button>
               )}
            </>
         )}
         {type === "2" && (
            <>
               {!href && cta && !disabled && (
                  <button
                     type={htmlType}
                     className={`${styles.secondary} ${styles.mainWrapper}`}
                     onClick={cta.handleClick}>
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </button>
               )}

               {!cta && href && !disabled && (
                  <a className={`${styles.secondary} ${styles.mainWrapper}`} href={href}>
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </a>
               )}

               {disabled && (
                  <button
                     disabled
                     type={htmlType}
                     className={`${styles.secondary} ${styles.mainWrapper} ${styles.disabled}`}>
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </button>
               )}
            </>
         )}
         {customColor && !type && (
            <>
               {!href && cta && !disabled && (
                  <button
                     style={{ background: customColor.button }}
                     type={htmlType}
                     className={` ${styles.mainWrapper}`}
                     onClick={cta.handleClick}>
                     <Parragraph
                        text={title}
                        color={customColor.text}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </button>
               )}

               {!cta && href && !disabled && (
                  <a
                     style={{ background: customColor.button }}
                     className={` ${styles.mainWrapper}`}
                     href={href}>
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        color={customColor.text}
                        lineHieght='.9em'
                        align='center'
                     />
                  </a>
               )}

               {disabled && (
                  <button
                     style={{ background: customColor.button }}
                     disabled
                     type={htmlType}
                     className={`${styles.secondary} ${styles.mainWrapper} ${styles.disabled}`}>
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  </button>
               )}
            </>
         )}
      </>
   );
};
