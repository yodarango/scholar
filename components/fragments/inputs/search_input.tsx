/****************************************************************************************
-  returns a string with the current input value wither in the handleOnchange or in the 
   handleSearchGo
*****************************************************************************************/

import React, { useRef, useState } from "react";

// components
import { IconButton } from "../buttons/icon_button";
import { Icon } from "../chunks/icons";

// styles
import styles from "./search_input.module.css";
import { type } from "os";
import { FONT_COLOR, THIRD_COLOR } from "../../../constants/tokens";

type TSearchInputProps = {
   placeholder: string;
   maxL: number;
   initialValue?: string;
   bounceTime?: number;
   className?: string;
   inputIconRight?: string | number | JSX.Element | React.ReactNode;
   iconButton?: {
      styles?: any;
      shadowColor?: string;
      className?: string;
      type?: string;
   };
   cta: {
      handleOnChange?: (value: string) => void;
      handleSearchGo?: (value: string) => void;
      handleInputStretch?: (val: boolean) => void;
   };
};
export const SearchInput = ({
   placeholder,
   initialValue = "",
   maxL,
   cta,
   className,
   iconButton,
   bounceTime = 1000,
   inputIconRight
}: TSearchInputProps) => {
   const showSearchInput = iconButton ? false : true;
   const [stretchSearchInput, setstretchSearchInput] = useState(showSearchInput);

   // references
   const input = useRef<HTMLInputElement>(null);
   let lastinput: number;

   const handleSearch = (e: any) => {
      // set the time at function call
      lastinput = Date.now();

      setTimeout(() => {
         // time at timeout
         let currTime = Date.now();

         // if more than 1000 milliseconda have ellapsed since last time call the callback
         if (cta.handleOnChange && currTime - lastinput > bounceTime) {
            cta.handleOnChange(e.target.value);
         }
      }, bounceTime);
   };

   // handle the search on button click
   const handleSearchGo = () => {
      if (input.current?.value && cta.handleSearchGo) {
         cta.handleSearchGo(input.current.value);
      }
      setstretchSearchInput(false);

      cta.handleInputStretch && cta.handleInputStretch(false);
   };

   return (
      <>
         {cta?.handleOnChange && stretchSearchInput && (
            <div className={`${styles.mainWrapper} ${className}`}>
               <input
                  autoFocus={iconButton ? true : false}
                  type='type'
                  maxLength={maxL}
                  role='hidden'
                  className={styles.input}
                  placeholder={placeholder}
                  onChange={handleSearch}
                  defaultValue={initialValue}
               />

               {/* display something on the right site of the input */}
               <div className={styles.rightInputIcon}>{inputIconRight}</div>

               <div
                  className={`${styles.icon} ${iconButton ? styles.searchButton : ""}`}
                  onClick={() => {
                     setstretchSearchInput(false);
                     cta.handleInputStretch && cta.handleInputStretch(false);
                  }}>
                  {
                     <Icon
                        name={iconButton ? "close" : "search"}
                        size='2rem'
                        color={iconButton ? FONT_COLOR : THIRD_COLOR}
                     />
                  }
               </div>
            </div>
         )}
         {cta.handleSearchGo && stretchSearchInput && (
            <div className={`${styles.mainWrapper} ${styles.mainWrapperWBtn} ${className}`}>
               <input
                  autoFocus={iconButton ? true : false}
                  type='type'
                  maxLength={maxL}
                  role='hidden'
                  className={styles.inputBtn}
                  placeholder={placeholder}
                  defaultValue={initialValue}
                  ref={input}
               />
               {/* display something on the right site of the input */}
               <div className={styles.rightInputIcon}>{inputIconRight}</div>
               <div className={styles.searchButton} onClick={handleSearchGo}>
                  <IconButton backgroundColor='1' icon='search' />
               </div>
            </div>
         )}

         {iconButton && !stretchSearchInput && (
            <IconButton
               style={iconButton.styles}
               shadowColor={iconButton.shadowColor}
               type={iconButton.type}
               icon='search'
               cta={{
                  handleClick: () => {
                     setstretchSearchInput(true);
                     cta.handleInputStretch && cta.handleInputStretch(true);
                  }
               }}
            />
         )}
      </>
   );
};
