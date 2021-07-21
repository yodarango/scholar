export type IdropdownOptions = {
   name: string;
   id: string;
   abbreviation: string;
   newClass?: string;
};

export const dropdownOptions: IdropdownOptions[] = [
   {
      name: "Biblica® Open Polish Living New Testament",
      id: "fbb8b0e1943b417c-01",
      abbreviation: "BOPLNT"
   },
   { name: "Updated Gdansk Bible", id: "1c9761e0230da6e0-01", abbreviation: "UGB" }
];
