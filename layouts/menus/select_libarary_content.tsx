import Link from "next/link";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_primary_option";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

export type TSelectpostOptionsProps = {
   cta: {
      handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
   };
};

export const SelectLibraryContent = ({ cta }: TSelectpostOptionsProps) => {
   const menuOptions = [
      {
         color: "#F1EAFF",
         description: "Popular",
         url: "popular",
         icon: "flame"
      },
      {
         color: "#F1EAFF",
         description: "Articles",
         url: "articles",
         icon: "article"
      },
      {
         color: "#F1EAFF",
         description: "Books",
         url: "books",
         icon: "book"
      },
      {
         color: "#F1EAFF",
         description: "Locations",
         url: "locations",
         icon: "location"
      },
      {
         color: "#F1EAFF",
         description: "Podcast",
         url: "podcasts",
         icon: "mic"
      },
      {
         color: "#F1EAFF",
         description: "Watch",
         url: "watch",
         icon: "tv"
      },
      {
         color: "#F1EAFF",
         description: "Web",
         url: "web",
         icon: "web"
      }
   ];

   return (
      <>
         <PrimaryMenuBkg
            color='1'
            cta={cta.handleCloseModal}
            content={menuOptions.map((option, index) => (
               <div className={styles.menuOption} key={index}>
                  <Link href={`/library/${option.url}`}>
                     <a>
                        <MenuPrimaryOption
                           textType='text'
                           iconType='icon'
                           optionProperties={{
                              icon: <Icon name={option.icon} color={option.color} size='2rem' />,
                              iconShadow: option.color,
                              text: option.description
                           }}
                           cta={() => {}}
                        />
                     </a>
                  </Link>
               </div>
            ))}
         />
      </>
   );
};
