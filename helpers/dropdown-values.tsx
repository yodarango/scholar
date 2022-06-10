export const valuesType = [
   {
      title: "Commentary",
      key: "Commentary"
   },
   {
      title: "Quote",
      key: "Quote"
   },
   {
      title: "Thought",
      key: "Thought"
   },
   {
      title: "Sermon Notes",
      key: "Sermon-notes"
   }
];

export type IvaluesCat = {
   title: string;
   key: string;
   categoryID: number;
   color: string;
   tag: string;
   subjects: string[];
};

export const valuesCat: IvaluesCat[] = [
   {
      title: "Black",
      key: "Black",
      categoryID: 1,
      color: "rgb(37, 37, 37)",
      tag: "#BLK",
      subjects: ["Context", "Original", "Manuscripts", "Septuagint", "gematria"]
   },
   {
      title: "Blue",
      key: "Blue",
      categoryID: 2,
      tag: "#BL",
      color: "#8093f1",
      subjects: [
         "Worship",
         "Prayer",
         "Praise",
         "Doctrine",
         "Angels",
         "Miracles",
         "Power of God",
         "Blessings",
         "Revelation",
         "Justice",
         "Commandments",
         "Word of God"
      ]
   },
   {
      title: "Brown",
      key: "Brown",
      categoryID: 3,
      tag: "#BR",
      color: "#d3ab9e",
      subjects: [
         "Satan",
         "Fallen Angels",
         "Demons",
         "Sin",
         "Hell",
         "Death",
         "Idolatry",
         "Heresy",
         "End Times",
         "Antichrist",
         "Temptation",
         "Rebellion",
         "Judgment",
         "Pain",
         "Suffering"
      ]
   },
   {
      title: "Cyan",
      key: "Cyan",
      categoryID: 4,
      tag: "#CYN",
      color: "#55d6c2",
      subjects: [
         "Wisdom",
         "Teaching",
         "Lessons",
         "Science",
         "Philosophy",
         "Art",
         "Academical",
         "Sports"
      ]
   },
   {
      title: "Green",
      key: "Green",
      categoryID: 5,
      tag: "#GRN",
      color: "#6ba969",
      subjects: ["Heaven", "Earth", "New Jerusalem", "Salvation", "Repentance", "Born Again"]
   },
   {
      title: "Orange",
      key: "Orange",
      categoryID: 6,
      tag: "#OR",
      color: "#fcab64",
      subjects: [
         "Prophesy",
         "History",
         "Times",
         "Places",
         "Genealogies",
         "Remarkable Men",
         "Symbolism",
         "Covenants",
         "Visions"
      ]
   },
   {
      title: "Pink",
      key: "Pink",
      categoryID: 7,
      tag: "#PNK",
      color: "#ffa6c1",
      subjects: ["Remarkable", "Women", "For Women", "Family", "Marriage", "Relationships"]
   },
   {
      title: "Purple",
      key: "Purple",
      categoryID: 8,
      tag: "#PPL",
      color: "#9381ff",
      subjects: ["Father", "Son", "Holy Spirit", "Christ", "Anointing", "Oneness"]
   },
   {
      title: "Red",
      key: "Red",
      categoryID: 9,
      tag: "#RD",
      color: "#dd5254",
      subjects: ["Love", "Mercy", "Compassion", "Peace", "Grace", "Hope", "Gifts", "Happiness"]
   },
   {
      title: "Yellow",
      key: "Yellow",
      categoryID: 10,
      tag: "#YLW",
      color: "#ffe45e",
      subjects: ["Faith", "Obedience", "Growth", "Fruit", "Fellowship", "Common Life", "Birth"]
   }
];
