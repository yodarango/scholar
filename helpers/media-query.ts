import { useEffect, useState } from "react";

const CheckMediaQuery = () => {
   const [width, setWidth] = useState<number>(0);

   function handleWindowSizeChange() {
      setWidth(window.innerWidth);
   }
   useEffect(() => {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
         window.removeEventListener("resize", handleWindowSizeChange);
      };
   }, []);

   return width;
};

export default CheckMediaQuery;
