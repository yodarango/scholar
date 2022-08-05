export const getCookie = (cookie_name: string) => {
   let name = cookie_name + "=";
   let decodedCookie = decodeURIComponent(document.cookie);
   let cookie_attributes = decodedCookie.split(";");
   for (let i = 0; i < cookie_attributes.length; i++) {
      let c = cookie_attributes[i];
      while (c.charAt(0) == " ") {
         c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
      }
   }
   return "";
};

