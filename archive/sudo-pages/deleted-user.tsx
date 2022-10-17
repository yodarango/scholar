// core
import Image from "next/image";

// styles
import deletedUserStyles from "../../styles/layouts/sudo-pages/DeletedUser.module.css";

const DeletedUser = () => {
   return (
      <>
         <div className={`dark-bkg `}>
            <div className={`${deletedUserStyles.contentWrapper}`}>
               <h2 className={`std-button_gradient-text ${deletedUserStyles.title}`}>
                  SCHOLAR IS SAD TO SEE YOU GO
               </h2>
               <div className={deletedUserStyles.introLogo}>
                  <Image src={"/images/logo.png"} alt='app logo' layout='fill' />
               </div>
               <section>
                  <p>
                     Thank you for giving Scholar a try 😔
                     <br />
                     We are deeply sorry to see you go but we understand your decision. Please
                     contact Scholar at <span className='std-url'>hey@biblescholar.app</span> and
                     tell us what made you go and how we can improve on it!
                  </p>
                  {/* <ul>
                     <li>Pray for the platform 🙏🏼</li>
                     <li>Be kind 💕</li>
                     <li>Think throughly every post ✍️</li>
                     <li>be honest and truthful 🌱</li>
                     <li>Report negative activity 🚫</li>
                     <li>Share this app with friends and family 📱</li>
                  </ul> */}
               </section>
               <a className='std-button' href='/'>
                  <p className='std-button_gradient-text'>Done</p>
               </a>
               <div className='large-spacer'></div>
            </div>
         </div>
      </>
   );
};

export default DeletedUser;
