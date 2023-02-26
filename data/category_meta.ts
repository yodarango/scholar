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

export type TcategoryMeta = {
   title: string;
   key: string;
   categoryID: number;
   color: string;
   tag: string;
   textColor: string;
   subjects: string[];
};

export const categoryMeta: TcategoryMeta[] = [
   {
      title: "Black",
      key: "Black",
      categoryID: 1,
      color: "#252525",
      tag: "#BLK",
      textColor: "#f1eaff",
      subjects: ["Context", "Original", "Manuscripts", "Septuagint", "gematria"]
   },
   {
      title: "Blue",
      key: "Blue",
      categoryID: 2,
      tag: "#BL",
      textColor: "#f1eaff",
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
      textColor: "#f1eaff",
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
      textColor: "#1e1a29",
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
      color: "#a1df9f",
      textColor: "#1e1a29",
      subjects: ["Heaven", "Earth", "New Jerusalem", "Salvation", "Repentance", "Born Again"]
   },
   {
      title: "Orange",
      key: "Orange",
      categoryID: 6,
      tag: "#OR",
      textColor: "#1e1a29",
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
      textColor: "#1e1a29",
      color: "#ffa6c1",
      subjects: ["Remarkable", "Women", "For Women", "Family", "Marriage", "Relationships"]
   },
   {
      title: "Purple",
      key: "Purple",
      categoryID: 8,
      tag: "#PPL",
      textColor: "#f1eaff",
      color: "#9381ff",
      subjects: ["Father", "Son", "Holy Spirit", "Christ", "Anointing", "Oneness"]
   },
   {
      title: "Red",
      key: "Red",
      categoryID: 9,
      tag: "#RD",
      textColor: "#f1eaff",
      color: "#dd5254",
      subjects: ["Love", "Mercy", "Compassion", "Peace", "Grace", "Hope", "Gifts", "Happiness"]
   },
   {
      title: "Yellow",
      key: "Yellow",
      categoryID: 10,
      tag: "#YLW",
      textColor: "#1e1a29",
      color: "#ffed91",
      subjects: ["Faith", "Obedience", "Growth", "Fruit", "Fellowship", "Common Life", "Birth"]
   },
   {
      title: "No Tag",
      key: "No Tag",
      categoryID: 11,
      tag: "*",
      textColor: "#f1eaff",
      color: "#5c5470",
      subjects: ["All"]
   }
];
