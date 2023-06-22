import { Parragraph } from "../../fragments/Typography/parragraph";
import { PopupModal } from "../popup_modal";

import React, { useState } from "react";
import styles from "./modals.module.css";

type TLoginModalProps = {
   onClose: () => void;
   message?: string;
   open: boolean;
};

export const YouNeedToLoginModal = ({
   onClose,
   open,
   message = "please login to perform this action"
}: TLoginModalProps) => {
   return (
      <PopupModal maxWidth={38} title='You are not logged-in' open={open} onClose={onClose}>
         <img
            src='/images/mascot/min/passcode.webp'
            alt='Shroody, the mascot of the app is letting the user know that is not authenticated.'
            className={styles.image}
         />
         <Parragraph size='main' text={message} align='center' />
      </PopupModal>
   );
};
