// core
import Image from "next/image";

import cardsLazyLoadingStyles from "../styles/layouts/ResourceNotFoundError.module.css";

const ResourceNotFoundError = () => {
   return (
      <div className={cardsLazyLoadingStyles.errorImage}>
         <Image
            layout='fill'
            alt='resource not found'
            src={"/image/layouts/reource_not_found.png"}
         />
      </div>
   );
};

export default ResourceNotFoundError;
