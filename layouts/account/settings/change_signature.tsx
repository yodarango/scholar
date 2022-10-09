/**************************************************************************************** 
-   Updates the user's signature
****************************************************************************************/
import { useState } from "react";
import { Primary } from "../../../fragments/buttons/primary";

// components
import { SettingsFieldButton } from "../../../fragments/buttons/settings_field_button";
import { InputPrimary } from "../../../fragments/inputs/input_primary";
import Portal from "../../../hoc/potal";
import { FourthStack } from "../../stacks/templates/fourth_stack";

// styles
import styles from "./change_signature.module.css";

type TChangeUsernameProps = {
   signature: string;
};

export const ChangeSignature = ({ signature }: TChangeUsernameProps) => {
   // state
   const [showModal, setshowModal] = useState<boolean>(false);
   const [currSignature, setcurrSignature] = useState<string>("");

   // update the signature
   const handeUpdateSignature = async () => {
      console.log(currSignature);
   };
   return (
      <div className={styles.mainWrapper}>
         <Portal>
            {showModal && (
               <FourthStack
                  actionName='Back'
                  title='Change signature'
                  cta={{ handleClose: () => setshowModal(false) }}>
                  <div className={styles.input}>
                     <InputPrimary
                        maxL={80}
                        placeholder='signature'
                        value={signature}
                        type='text'
                        cta={{ handleValue: (value: string) => setcurrSignature(value) }}
                     />
                  </div>

                  <div className={styles.button}>
                     <Primary type='1' title='Update' cta={{ handleClick: handeUpdateSignature }} />
                  </div>
               </FourthStack>
            )}
         </Portal>
         <SettingsFieldButton
            label='Signature'
            value={signature}
            cta={{ handleClick: () => setshowModal(true) }}
         />
      </div>
   );
};
