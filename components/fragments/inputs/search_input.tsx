/****************************************************************************************
-  returns a string with the current input value wither in the handleOnchange or in the 
   handleSearchGo
*****************************************************************************************/

import { useRef } from "react";

// components
import { IconButton } from "../buttons/icon_button";
import { Icon } from "../chunks/icons";

// styles
import styles from "./search_input.module.css";

type TSearchInputProps = {
   placeholder: string;
   maxL: number;
   initialValue?: string;
   bounceTime?: number;
   cta: {
      handleOnChange?: (value: string) => void;
      handleSearchGo?: (value: string) => void;
   };
};
export const SearchInput = ({
   placeholder,
   initialValue = "",
   maxL,
   cta,
   bounceTime = 1000
}: TSearchInputProps) => {
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
   };
   return (
      <>
         {cta?.handleOnChange && (
            <div className={styles.mainWrapper}>
               <input
                  type='type'
                  maxLength={maxL}
                  role='hidden'
                  className={styles.input}
                  placeholder={placeholder}
                  onChange={handleSearch}
                  defaultValue={initialValue}
               />

               <div className={styles.icon}>
                  <Icon name='search' size='2rem' color='#5C5470' />
               </div>
            </div>
         )}
         {cta.handleSearchGo && (
            <div className={styles.mainWrapperWBtn}>
               <input
                  type='type'
                  maxLength={maxL}
                  role='hidden'
                  className={styles.inputWBtn}
                  placeholder={placeholder}
                  defaultValue={initialValue}
                  ref={input}
               />

               <div className={styles.searchButton} onClick={handleSearchGo}>
                  <IconButton backgroundColor='1' icon='search' />
               </div>
            </div>
         )}
      </>
   );
};
