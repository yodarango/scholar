/// function only checks that an input is not empty

export const validateEmptyInput: (i: string) => boolean = (input: any) => {
   if (!input) {
      return false;
   }
   return true;
};
