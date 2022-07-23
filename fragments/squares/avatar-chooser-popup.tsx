// core
import { useState } from "react";

//graphQL
import client from "../../apollo-client";
import { UPDATE_MY_AVATAR } from "../../graphql/users/profile";
// styles
import avatarChooserPopUpStyles from "../../styles/fragments/squares/AvatarChooserPopUp.module.css";
import SmallLoader from "../chunks/small_loader";
import NotificationPopup from "../popups/notification";

type avatarChooserPopupProps = {
   image: string;
   closePopUp: any;
};

const AvatarChooserPopup = ({ image, closePopUp }: avatarChooserPopupProps) => {
   const [smallLoaderState, setSmallLoaderState] = useState<boolean | JSX.Element>(false);
   const [notificationPopUpState, setNotificationPopUpState] =
      useState<boolean | JSX.Element>(false);

   const handleAvatarSelection = async (image: string) => {
      try {
         setSmallLoaderState(<SmallLoader />);
         client.mutate({
            mutation: UPDATE_MY_AVATAR,
            variables: { avatar: image }
         });
         closePopUp(image);
         setSmallLoaderState(false);
      } catch (error: any) {
         setSmallLoaderState(false);
         setNotificationPopUpState(
            <NotificationPopup
               closeModal={() => setNotificationPopUpState(false)}
               title={`You're not authorized! 👮‍♂️`}
               contentString={error.graphQLErrors[0].message} //'Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };
   return (
      <>
         {notificationPopUpState}
         <div className={avatarChooserPopUpStyles.overlayCard}>
            <div className={avatarChooserPopUpStyles.imageAvatarWrapper}>
               <img src={image} className={avatarChooserPopUpStyles.avatarImage} />
            </div>
            {!smallLoaderState && (
               <button className='std-button' onClick={() => handleAvatarSelection(image)}>
                  <p className='std-button_gradient-text'>Change Avatar</p>
               </button>
            )}
            {smallLoaderState}
         </div>
      </>
   );
};

export default AvatarChooserPopup;
