export const handleUploadFile = (fileUploaded: any, maxSize: number, success: any, fail: any) => {
   if (fileUploaded.target.files.length > 0) {
      if (fileUploaded.target.files[0]?.size > maxSize) {
         fail();
      } else if (fileUploaded.target.files) {
         success(fileUploaded.target.files[0]);
      }
   }
};
