export type IdropdownOptions = {
   name: string;
   id: string;
   abbreviation: string;
   newClass?: string;
};

export const dropdownOptions: IdropdownOptions[] = [
   { name: "American Standard Version", id: "685d1470fe4d5c3b-01", abbreviation: "ASV" },
   { name: "Berean Study Bible", id: "bba9f40183526463-01", abbreviation: "BSB" },
   { name: "Brenton English Septuagint", id: "6bab4d6c61b31b80-01", abbreviation: "BES" },
   { name: "Free Bible Version", id: "65eec8e0b60e656b-01", abbreviation: "FBV" },
   { name: "Geneva Bible", id: "c315fa9f71d4af3a-01", abbreviation: "GB" },
   { name: "King James Version", id: "de4e12af7f28f599-02", abbreviation: "KJV" },
   { name: "Literal Standard Version", id: "01b29f4b342acc35-01", abbreviation: "LSV" },
   { name: "Revised Version 1885", id: "40072c4a5aba4022-01", abbreviation: "RV" },
   { name: "World English Bible", id: "9879dbb7cfe39e4d-04", abbreviation: "WEB" },
   {
      name: "World English Bible British Edition Version",
      id: "7142879509583d59-04",
      abbreviation: "WEBBE"
   },
   { name: "World Messianic Bible", id: "f72b840c855f362c-04", abbreviation: "WMB" }
];
