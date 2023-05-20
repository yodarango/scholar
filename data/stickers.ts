type Sticker = {
   id: number;
   name: string;
   path: string;
   description: string;
   categories: string[];
};

const stickers: Sticker[] = [
   {
      id: 1,
      name: "Sticker 1",
      path: "https://i.imgur.com/1.png",
      description: "Sticker 1",
      categories: ["category1", "category2"]
   }
];
