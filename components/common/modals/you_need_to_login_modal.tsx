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
      <PopupModal title='You are not login' open={open} onClose={onClose}>
         <img
            src='/images/bible_books/1.png'
            alt='Shroody, the mascot of the app is letting the user know that is not authenticated.'
            className={styles.image}
         />
         <Parragraph size='main' text={message} align='center' />
      </PopupModal>
   );
};
