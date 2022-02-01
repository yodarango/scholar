// const noAuth = {
//    id: "",
//    signature: "",
//    iat: 0,
//    exp: 0
// };
//let parsedUser: any;

const parseJwt = (token: string) => {
   if (!token) {
      //parsedUser = noAuth;
      return;
   }
   const base64Url = token.split(".")[1];
   const base64 = base64Url.replace("-", "+").replace("_", "/");
   return JSON.parse(window.atob(base64));
};

export default parseJwt;
