import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head />
            <body>
               <Main />
               <div id='myportal' style={{ position: "relative", zIndex: 10 }} />
               <div id='myportal_secondary' style={{ position: "relative", zIndex: 12 }} />
               <NextScript />
            </body>
         </Html>
      );
   }
}
