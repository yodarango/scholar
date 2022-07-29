import { Icon } from "../chunks/icons";
import styles from "./search_input.module.css";

type TSearchInputProps = {
   placeholder: string;
   maxL: number;
   cta: { handleOnChange: (value: string) => void };
};
export const SearchInput = ({ placeholder, maxL, cta }: TSearchInputProps) => {
   let lastinput: number;

   const handleSearch = (e: any) => {
      // set the time at function call
      lastinput = Date.now();

      setTimeout(() => {
         // time at timeout
         let currTime = Date.now();

         // if more than 1000 milliseconda have ellapsed since last time call the callback
         if (currTime - lastinput > 1000) {
            cta.handleOnChange(e.target.value);
         }
      }, 1000);
   };

   return (
      <div className={styles.mainWrapper}>
         <input
            type='text'
            maxLength={maxL}
            role='hidden'
            className={styles.input}
            placeholder={placeholder}
            onChange={handleSearch}
         />

         <div className={styles.icon}>
            <Icon name='search' size='2rem' color='#5C5470' />
         </div>
      </div>
   );
};
