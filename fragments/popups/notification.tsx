import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";

type notificatrionPopupProps = {
   title: string;
   content: string | JSX.Element;
   newClass?: string;
   closeModal: React.MouseEventHandler;
};
export const NotificationPopup = ({
   title,
   closeModal,
   newClass,
   content
}: notificatrionPopupProps) => {
   return (
      <div className={`notification-wrapper ${newClass}`}>
         <div className='closeModal' onClick={closeModal}>
            X
         </div>
         <Header type={2} text={title} size='main' />
         <Parragraph text={content} size='small' />
         <p className={`notification-wrapper_content`}>{content}</p>
      </div>
   );
};
