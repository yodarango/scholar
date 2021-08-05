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
   color: string;
   tag: string;
   subjects: string[];
};

export const valuesCat: IvaluesCat[] = [
   {
      title: "Black",
      key: "Black",
      color: "rgb(32, 32, 32)",
      tag: "#BLK",
      subjects: ["Context", "Original", "Manuscripts", "Septuagint", "gematria"]
   },
   {
      title: "Blue",
      key: "Blue",
      tag: "#BL",
      color: "rgb(1, 96, 240)",
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
      tag: "#BR",
      color: "#9c6644",
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
      tag: "#CYN",
      color: "rgb(50, 190, 167)",
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
      tag: "#GRN",
      color: "rgb(21, 158, 2)",
      subjects: ["Heaven", "Earth", "New Jerusalem", "Salvation", "Repentance", "Born Again"]
   },
   {
      title: "Orange",
      key: "Orange",
      tag: "#OR",
      color: "rgb(247, 99, 0)",
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
      tag: "#PNK",
      color: "rgb(255, 84, 170)",
      subjects: ["Remarkable", "Women", "For Women", "Family", "Marriage", "Relationships"]
   },
   {
      title: "Purple",
      key: "Purple",
      tag: "#PPL",
      color: "rgb(142, 54, 224)",
      subjects: ["Father", "Son", "Holy Spirit", "Christ", "Anointing", "Oneness"]
   },
   {
      title: "Red",
      key: "Red",
      tag: "#RD",
      color: "rgb(224, 0, 0)",
      subjects: ["Love", "Mercy", "Compassion", "Peace", "Grace", "Hope", "Gifts", "Happiness"]
   },
   {
      title: "Yellow",
      key: "Yellow",
      tag: "#YLW",
      color: "rgb(255, 174, 0)",
      subjects: ["Faith", "Obedience", "Growth", "Fruit", "Fellowship", "Common Life", "Birth"]
   }
];
