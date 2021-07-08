// ============  MAY DELETE   ===============
type IreferencedScriptures = { id: string; abbreviation: string; name: string; nameLong: string };

const specialChar = "[[";

export const referencedScriptures: IreferencedScriptures[] = [
   {
      id: "GEN",
      abbreviation: "Gen",
      name: specialChar + "Genesis",
      nameLong: "The First Book of Moses, called Genesis"
   },
   {
      id: "EXO",
      abbreviation: "Exo",
      name: specialChar + "Exodus",
      nameLong: "The Second Book of Moses, called Exodus"
   },
   {
      id: "LEV",
      abbreviation: "Lev",
      name: specialChar + "Leviticus",
      nameLong: "The Third Book of Moses, called Leviticus"
   },
   {
      id: "NUM",
      abbreviation: "Num",
      name: specialChar + "Numbers",
      nameLong: "The Fourth Book of Moses, called Numbers"
   },
   {
      id: "DEU",
      abbreviation: "Deu",
      name: specialChar + "Deuteronomy",
      nameLong: "The Fifth Book of Moses, called Deuteronomy"
   },
   {
      id: "JOS",
      abbreviation: "Jos",
      name: specialChar + "Joshua",
      nameLong: "The Book of Joshua"
   },
   {
      id: "JDG",
      abbreviation: "Jdg",
      name: specialChar + "Judges",
      nameLong: "The Book of Judges"
   },
   {
      id: "RUT",
      abbreviation: "Rut",
      name: specialChar + "Ruth",
      nameLong: "The Book of Ruth"
   },
   {
      id: "1SA",
      abbreviation: "1Sa",
      name: specialChar + "1 Samuel",
      nameLong: "The First Book of Samuel Otherwise Called The First Book of the Kings"
   },
   {
      id: "2SA",
      abbreviation: "2Sa",
      name: "2 Samuel",
      nameLong: "The Second Book of Samuel Otherwise Called The Second Book of the Kings"
   },
   {
      id: "1KI",
      abbreviation: "1Ki",
      name: specialChar + "1 Kings",
      nameLong: "The First Book of the Kings, Commonly Called the Third Book of the Kings"
   },
   {
      id: "2KI",
      abbreviation: "2Ki",
      name: specialChar + "2 Kings",
      nameLong: "The Second Book of the Kings, Commonly Called the Fourth Book of the Kings"
   },
   {
      id: "1CH",
      abbreviation: "1Ch",
      name: specialChar + "1 Chronicles",
      nameLong: "The First Book of the Chronicles"
   },
   {
      id: "2CH",
      abbreviation: "2Ch",
      name: specialChar + "2 Chronicles",
      nameLong: "The Second Book of the Chronicles"
   },
   {
      id: "EZR",
      abbreviation: "Ezr",
      name: specialChar + "Ezra",
      nameLong: "Ezra"
   },
   {
      id: "NEH",
      abbreviation: "Neh",
      name: specialChar + "Nehemiah",
      nameLong: "The Book of Nehemiah"
   },
   {
      id: "EST",
      abbreviation: "Est",
      name: specialChar + "Esther",
      nameLong: "The Book of Esther"
   },
   {
      id: "JOB",
      abbreviation: "Job",
      name: specialChar + "Job",
      nameLong: "The Book of Job"
   },
   {
      id: "PSA",
      abbreviation: "Psa",
      name: specialChar + "Psalms",
      nameLong: "The Book of Psalms"
   },
   {
      id: "PRO",
      abbreviation: "Pro",
      name: specialChar + "Proverbs",
      nameLong: "The Proverbs"
   },
   {
      id: "ECC",
      abbreviation: "Ecc",
      name: specialChar + "Ecclesiastes",
      nameLong: "Ecclesiastes or, the Preacher"
   },
   {
      id: "SNG",
      abbreviation: "Sng",
      name: specialChar + "Song of Solomon",
      nameLong: "The Song of Solomon"
   },
   {
      id: "ISA",
      abbreviation: "Isa",
      name: "Isaiah",
      nameLong: "The Book of the Prophet Isaiah"
   },
   {
      id: "JER",
      abbreviation: "Jer",
      name: specialChar + "Jeremiah",
      nameLong: "The Book of the Prophet Jeremiah"
   },
   {
      id: "LAM",
      abbreviation: "Lam",
      name: specialChar + "Lamentations",
      nameLong: "The Lamentations of Jeremiah"
   },
   {
      id: "EZK",
      abbreviation: "Ezk",
      name: specialChar + "Ezekiel",
      nameLong: "The Book of the Prophet Ezekiel"
   },
   {
      id: "DAN",
      abbreviation: "Dan",
      name: specialChar + "Daniel",
      nameLong: "The Book of Daniel"
   },
   {
      id: "HOS",
      abbreviation: "Hos",
      name: specialChar + "Hosea",
      nameLong: "Hosea"
   },
   {
      id: "JOL",
      abbreviation: "Jol",
      name: specialChar + "Joel",
      nameLong: "Joel"
   },
   {
      id: "AMO",
      abbreviation: "Amo",
      name: specialChar + "Amos",
      nameLong: "Amos"
   },
   {
      id: "OBA",
      abbreviation: "Oba",
      name: specialChar + "Obadiah",
      nameLong: "Obadiah"
   },
   {
      id: "JON",
      abbreviation: "Jon",
      name: specialChar + "Jonah",
      nameLong: "Jonah"
   },
   {
      id: "MIC",
      abbreviation: "Mic",
      name: specialChar + "Micah",
      nameLong: "Micah"
   },
   {
      id: "NAM",
      abbreviation: "Nam",
      name: specialChar + "Nahum",
      nameLong: "Nahum"
   },
   {
      id: "HAB",
      abbreviation: "Hab",
      name: specialChar + "Habakkuk",
      nameLong: "Habakkuk"
   },
   {
      id: "ZEP",
      abbreviation: "Zep",
      name: specialChar + "Zephaniah",
      nameLong: "Zephaniah"
   },
   {
      id: "HAG",
      abbreviation: "Hag",
      name: specialChar + "Haggai",
      nameLong: "Haggai"
   },
   {
      id: "ZEC",
      abbreviation: "Zec",
      name: specialChar + "Zechariah",
      nameLong: "Zechariah"
   },
   {
      id: "MAL",
      abbreviation: "Mal",
      name: specialChar + "Malachi",
      nameLong: "Malachi"
   },

   //New Testament

   {
      id: "MAT",
      abbreviation: "Mat",
      name: specialChar + "Matthew",
      nameLong: "THE GOSPEL ACCORDING TO ST. MATTHEW"
   },
   {
      id: "MRK",
      abbreviation: "Mrk",
      name: specialChar + "Mark",
      nameLong: "THE GOSPEL ACCORDING TO ST. MARK"
   },
   {
      id: "LUK",
      abbreviation: "Luk",
      name: specialChar + "Luke",
      nameLong: "THE GOSPEL ACCORDING TO ST. LUKE"
   },
   {
      id: "JHN",
      abbreviation: "Jhn",
      name: specialChar + "John",
      nameLong: "THE GOSPEL ACCORDING TO ST. JOHN"
   },
   {
      id: "ACT",
      abbreviation: "Act",
      name: specialChar + "Acts",
      nameLong: "THE ACTS OF THE APOSTLES"
   },
   {
      id: "ROM",
      abbreviation: "Rom",
      name: specialChar + "Romans",
      nameLong: "THE EPISTLE OF PAUL THE APOSTLE TO THE ROMANS"
   },
   {
      id: "1CO",
      abbreviation: "1Co",
      name: "1 Corinthians",
      nameLong: "THE FIRST EPISTLE OF PAUL THE APOSTLE TO THE CORINTHIANS"
   },
   {
      id: "2CO",
      abbreviation: "2Co",
      name: specialChar + "2 Corinthians",
      nameLong: "THE SECOND EPISTLE OF PAUL THE APOSTLE TO THE CORINTHIANS"
   },
   {
      id: "GAL",
      abbreviation: "Gal",
      name: specialChar + "Galatians",
      nameLong: "THE EPISTLE OF PAUL THE APOSTLE TO THE GALATIANS"
   },
   {
      id: "EPH",
      abbreviation: "Eph",
      name: specialChar + "Ephesians",
      nameLong: "THE EPISTLE OF PAUL THE APOSTLE TO THE EPHESIANS"
   },
   {
      id: "PHP",
      abbreviation: "Php",
      name: specialChar + "Philippians",
      nameLong: "THE EPISTLE OF PAUL THE APOSTLE TO THE PHILIPPIANS"
   },
   {
      id: "COL",
      abbreviation: "Col",
      name: "Colossians",
      nameLong: "THE EPISTLE OF PAUL THE APOSTLE TO THE COLOSSIANS"
   },
   {
      id: "1TH",
      abbreviation: "1Th",
      name: specialChar + "1 Thessalonians",
      nameLong: "THE FIRST EPISTLE OF PAUL THE APOSTLE TO THE THESSALONIANS"
   },
   {
      id: "2TH",
      abbreviation: "2Th",
      name: specialChar + "2 Thessalonians",
      nameLong: "THE SECOND EPISTLE OF PAUL THE APOSTLE TO THE THESSALONIANS"
   },
   {
      id: "1TI",
      abbreviation: "1Ti",
      name: specialChar + "1 Timothy",
      nameLong: "THE FIRST EPISTLE OF PAUL THE APOSTLE TO TIMOTHY"
   },
   {
      id: "2TI",
      abbreviation: "2Ti",
      name: specialChar + "2 Timothy",
      nameLong: "THE SECOND EPISTLE OF PAUL THE APOSTLE TO TIMOTHY"
   },
   {
      id: "TIT",
      abbreviation: "Tit",
      name: specialChar + "Titus",
      nameLong: "THE EPISTLE OF PAUL THE APOSTLE TO TITUS"
   },
   {
      id: "PHM",
      abbreviation: "Phm",
      name: specialChar + "Philemon",
      nameLong: "THE EPISTLE OF PAUL THE APOSTLE TO PHILEMON"
   },
   {
      id: "HEB",
      abbreviation: "Heb",
      name: specialChar + "Hebrews",
      nameLong: "THE EPISTLE OF PAUL THE APOSTLE TO THE HEBREWS"
   },
   {
      id: "JAS",
      abbreviation: "Jas",
      name: specialChar + "James",
      nameLong: "THE GENERAL EPISTLE OF JAMES"
   },
   {
      id: "1PE",
      abbreviation: "1Pe",
      name: specialChar + "1 Peter",
      nameLong: "THE FIRST EPISTLE GENERAL OF PETER"
   },
   {
      id: "2PE",
      abbreviation: "2Pe",
      name: specialChar + "2 Peter",
      nameLong: "THE SECOND EPISTLE GENERAL OF PETER"
   },
   {
      id: "1JN",
      abbreviation: "1Jn",
      name: specialChar + "1 John",
      nameLong: "THE FIRST EPISTLE GENERAL OF JOHN"
   },
   {
      id: "2JN",
      abbreviation: "2Jn",
      name: specialChar + "2 John",
      nameLong: "THE SECOND EPISTLE OF JOHN"
   },
   {
      id: "3JN",
      abbreviation: "3Jn",
      name: specialChar + "3 John",
      nameLong: "THE THIRD EPISTLE OF JOHN"
   },
   {
      id: "JUD",
      abbreviation: "Jud",
      name: specialChar + "Jude",
      nameLong: "THE GENERAL EPISTLE OF JUDE"
   },
   {
      id: "REV",
      abbreviation: "Rev",
      name: specialChar + "Revelation",
      nameLong: "THE REVELATION OF ST. JOHN THE DIVINE"
   }
];
