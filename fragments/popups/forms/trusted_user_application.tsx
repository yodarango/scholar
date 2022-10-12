import { useState } from "react";

// comps
import { InputPrimary } from "../../inputs/input_primary";
import { RadioPrimary } from "../../inputs/radio_primary";
import { Parragraph } from "../../Typography/parragraph";

// styles
import styles from "./trusted_user_application.module.css";

export const TrustedUserApplicationForm = () => {
   // state
   const [HLEducation, setHLEducation] = useState<number>(0);
   return (
      <div className={styles.mainWrapper}>
         <form>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value=''
                  type='text'
                  placeholder='First name'
                  cta={{ handleValue: () => {} }}
               />
            </div>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value=''
                  type='text'
                  placeholder='Last name'
                  cta={{ handleValue: () => {} }}
               />
            </div>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value=''
                  type='text'
                  placeholder='Local church'
                  cta={{ handleValue: () => {} }}
               />
            </div>
            <div className={styles.input}>
               <InputPrimary
                  maxL={100}
                  value=''
                  type='text'
                  placeholder='Active ministry'
                  cta={{ handleValue: () => {} }}
               />
            </div>

            <div className={styles.radioInput}>
               <div className={styles.parragraph}>
                  <Parragraph text='Are you at least 40 years or older?' size='main' />
               </div>
               <RadioPrimary
                  icon={{ primary: "close", secondary: "checkMark" }}
                  text={{ primary: "Yes", secondary: "No" }}
                  cta={{ handleOptionSelection: () => {} }}
               />
            </div>

            <div className={styles.radioInput}>
               <div className={styles.parragraph}>
                  <Parragraph
                     text='Have you been in the current ministry for at least 10 years?'
                     size='main'
                  />
               </div>
               <RadioPrimary
                  icon={{ primary: "close", secondary: "checkMark" }}
                  text={{ primary: "Yes", secondary: "No" }}
                  cta={{ handleOptionSelection: () => {} }}
               />
            </div>

            <div className={styles.radioInput}>
               <div className={styles.parragraph}>
                  <Parragraph text='Do you have any college-level biblical education' size='main' />
               </div>
               <RadioPrimary
                  icon={{ primary: "close", secondary: "checkMark" }}
                  text={{ primary: "Yes", secondary: "No" }}
                  cta={{ handleOptionSelection: (option: number) => setHLEducation(option) }}
               />
            </div>

            {HLEducation === 1 && (
               <div className={styles.input}>
                  <InputPrimary
                     maxL={100}
                     type='text'
                     value=''
                     placeholder='What is your highest Degree?'
                     cta={{ handleValue: () => {} }}
                  />
               </div>
            )}
         </form>
      </div>
   );
};
