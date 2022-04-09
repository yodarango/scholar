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
      color: "rgb(37, 37, 37)",
      tag: "#BLK",
      subjects: ["Context", "Original", "Manuscripts", "Septuagint", "gematria"]
   },
   {
      title: "Blue",
      key: "Blue",
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
      tag: "#GRN",
      color: "#6ba969",
      subjects: ["Heaven", "Earth", "New Jerusalem", "Salvation", "Repentance", "Born Again"]
   },
   {
      title: "Orange",
      key: "Orange",
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
      tag: "#PNK",
      color: "#ffa6c1",
      subjects: ["Remarkable", "Women", "For Women", "Family", "Marriage", "Relationships"]
   },
   {
      title: "Purple",
      key: "Purple",
      tag: "#PPL",
      color: "#9381ff",
      subjects: ["Father", "Son", "Holy Spirit", "Christ", "Anointing", "Oneness"]
   },
   {
      title: "Red",
      key: "Red",
      tag: "#RD",
      color: "#dd5254",
      subjects: ["Love", "Mercy", "Compassion", "Peace", "Grace", "Hope", "Gifts", "Happiness"]
   },
   {
      title: "Yellow",
      key: "Yellow",
      tag: "#YLW",
      color: "#ffe45e",
      subjects: ["Faith", "Obedience", "Growth", "Fruit", "Fellowship", "Common Life", "Birth"]
   }
];
