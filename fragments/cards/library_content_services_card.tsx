import Image from "next/image";
import Link from "next/link";

// comps
import { Header } from "../Typography/header";

// styles
import styles from "./library_content_services_card.module.css";

type TLibraryContentServicesCardProps = {
   img: {
      alt: string;
      src: string;
   };
   title: string;
   link: string;
};
export const LibraryContentServicesCard = ({
   img,
   title,
   link
}: TLibraryContentServicesCardProps) => {
   return (
      <div className={styles.mainWrapper}>
         <Link href={link}>
            <a>
               <div className={styles.image}>
                  <Image src={img.src} alt={img.alt} layout='fill' />
               </div>
               <div className={styles.title}>
                  <Header type={4} text={title} size='main' />
               </div>
            </a>
         </Link>
      </div>
   );
};
