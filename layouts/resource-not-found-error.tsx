// core
import Image from "next/image";

import resourceNotFoundError from "../styles/layouts/ResourceNotFoundError.module.css";

const ResourceNotFoundError = () => {
   return (
      <div className={resourceNotFoundError.errorImage}>
         <Image
            layout='fill'
            alt='resource not found'
            src={"/images/layouts/resource_not_found.png"}
         />
         <p>resource not found</p>
      </div>
   );
};

export default ResourceNotFoundError;
