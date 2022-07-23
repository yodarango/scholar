export type Tbible = {
   bookBkg: string;
   bookId: string;
   bookTitle: string;
   chapters: number;
   verses: [number];
};

export const bible = [
   {
      bookBkg: "/images/commentaries_by_book/1.png",
      bookId: "GEN",
      bookTitle: "Genesis",
      chapters: 50,
      verses: [
         31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20,
         67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34,
         31, 22, 33, 26
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/2.png",
      bookId: "EXO",
      bookTitle: "Exodus",
      chapters: 40,
      verses: [
         22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33,
         18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/3.png",
      bookId: "LEV",
      bookTitle: "Leviticus",
      chapters: 27,
      verses: [
         17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44,
         23, 55, 46, 34
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/4.png",
      bookId: "NUM",
      bookTitle: "Numbers",
      chapters: 36,
      verses: [
         54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30,
         25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/5.png",
      bookId: "DEU",
      bookTitle: "Deuteronomy",
      chapters: 34,
      verses: [
         46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25,
         22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/6.png",
      bookId: "JOS",
      bookTitle: "Joshua",
      chapters: 24,
      verses: [
         18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16,
         33
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/7.png",
      bookId: "JDG",
      bookTitle: "Judges",
      chapters: 21,
      verses: [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25]
   },
   {
      bookBkg: "/images/commentaries_by_book/8.png",
      bookId: "RUT",
      bookTitle: "Ruth",
      chapters: 4,
      verses: [22, 23, 18, 22]
   },
   {
      bookBkg: "/images/commentaries_by_book/9.png",
      bookId: "1SA",
      bookTitle: "1 Samuel",
      chapters: 31,
      verses: [
         28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29,
         22, 44, 25, 12, 25, 11, 31, 13
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/10.png",
      bookId: "2SA",
      bookTitle: "2 Samuel",
      chapters: 24,
      verses: [
         27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39,
         25
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/11.png",
      bookId: "1KI",
      bookTitle: "1 Kings",
      chapters: 22,
      verses: [
         [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53]
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/12.png",
      bookId: "2KI",
      bookTitle: "2 Kings",
      chapters: 25,
      verses: [
         18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37,
         20, 30
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/13.png",
      bookId: "1CH",
      bookTitle: "1 Chronicles",
      chapters: 29,
      verses: [
         54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 18, 18, 8, 30, 19, 32,
         31, 31, 32, 34, 21, 30
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/14.png",
      bookId: "2CH",
      bookTitle: "2 Chronicles",
      chapters: 36,
      verses: [
         17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21,
         27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/15.png",
      bookId: "EZR",
      bookTitle: "Ezra",
      chapters: 10,
      verses: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44]
   },
   {
      bookBkg: "/images/commentaries_by_book/16.png",
      bookId: "NEH",
      bookTitle: "Nehemiah",
      chapters: 13,
      verses: [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31]
   },
   {
      bookBkg: "/images/commentaries_by_book/17.png",
      bookId: "EST",
      bookTitle: "Esther",
      chapters: 10,
      verses: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3]
   },
   {
      bookBkg: "/images/commentaries_by_book/18.png",
      bookId: "JOB",
      bookTitle: "Job",
      chapters: 42,
      verses: [
         22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17,
         25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/19.png",
      bookId: "PSA",
      bookTitle: "Psalms",
      chapters: 150,
      verses: [
         6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22,
         12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14,
         20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20,
         28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11,
         13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7,
         8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20,
         14, 9, 6
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/20.png",
      bookId: "PRO",
      bookTitle: "Proverbs",
      chapters: 31,
      verses: [
         33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35,
         34, 28, 28, 27, 28, 27, 33, 31
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/21.png",
      bookId: "ECC",
      bookTitle: "Ecclesiastes",
      chapters: 12,
      verses: [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14]
   },
   {
      bookBkg: "/images/commentaries_by_book/22.png",
      bookId: "SNG",
      bookTitle: "Song of Solomon",
      chapters: 8,
      verses: [17, 17, 11, 16, 16, 13, 13, 14]
   },
   {
      bookBkg: "/images/commentaries_by_book/23.png",
      bookId: "ISA",
      bookTitle: "Isaiah",
      chapters: 66,
      verses: [
         31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23,
         12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15,
         22, 26, 11
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/24.png",
      bookId: "JER",
      bookTitle: "Jeremiah",
      chapters: 52,
      verses: [
         19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40,
         10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28,
         7, 47, 39, 46
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/25.png",
      bookId: "LAM",
      bookTitle: "Lamentations",
      chapters: 5,
      verses: [22, 22, 66, 22, 22]
   },
   {
      bookBkg: "/images/commentaries_by_book/26.png",
      bookId: "EZK",
      bookTitle: "Ezekiel",
      chapters: 48,
      verses: [
         28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49,
         27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24,
         23, 35
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/27.png",
      bookId: "DAN",
      bookTitle: "Daniel",
      chapters: 12,
      verses: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13]
   },
   {
      bookBkg: "/images/commentaries_by_book/28.png",
      bookId: "HOS",
      bookTitle: "Hosea",
      chapters: 14,
      verses: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9]
   },
   {
      bookBkg: "/images/commentaries_by_book/29.png",
      bookId: "JOL",
      bookTitle: "Joel",
      chapters: 3,
      verses: [20, 32, 21]
   },
   {
      bookBkg: "/images/commentaries_by_book/30.png",
      bookId: "AMO",
      bookTitle: "Amos",
      chapters: 9,
      verses: [15, 16, 15, 13, 27, 14, 17, 14, 15]
   },
   {
      bookBkg: "/images/commentaries_by_book/31.png",
      bookId: "OBA",
      bookTitle: "Obadiah",
      chapters: 1,
      verses: [21]
   },
   {
      bookBkg: "/images/commentaries_by_book/32.png",
      bookId: "JON",
      bookTitle: "Jonah",
      chapters: 4,
      verses: [17, 10, 10, 11]
   },
   {
      bookBkg: "/images/commentaries_by_book/33.png",
      bookId: "MIC",
      bookTitle: "Micah",
      chapters: 7,
      verses: [16, 13, 12, 13, 15, 16, 20]
   },
   {
      bookBkg: "/images/commentaries_by_book/34.png",
      bookId: "NAM",
      bookTitle: "Nahum",
      chapters: 3,
      verses: [15, 13, 19]
   },
   {
      bookBkg: "/images/commentaries_by_book/35.png",
      bookId: "HAB",
      bookTitle: "Habakkuk",
      chapters: 3,
      verses: [17, 20, 19]
   },
   {
      bookBkg: "/images/commentaries_by_book/36.png",
      bookId: "ZEP",
      bookTitle: "Zephaniah",
      chapters: 3,
      verses: [18, 15, 20]
   },
   {
      bookBkg: "/images/commentaries_by_book/37.png",
      bookId: "HAG",
      bookTitle: "Haggai",
      chapters: 2,
      verses: [15, 23]
   },
   {
      bookBkg: "/images/commentaries_by_book/38.png",
      bookId: "ZEC",
      bookTitle: "Zechariah",
      chapters: 14,
      verses: [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21]
   },
   {
      bookBkg: "/images/commentaries_by_book/39.png",
      bookId: "MAL",
      bookTitle: "Malachi",
      chapters: 4,
      verses: [14, 17, 18, 4]
   },
   {
      bookBkg: "/images/commentaries_by_book/40.png",
      bookId: "MAT",
      bookTitle: "Matthew",
      chapters: 28,
      verses: [
         25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39,
         51, 46, 75, 66, 20
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/41.png",
      bookId: "MRK",
      bookTitle: "Mark",
      chapters: 16,
      verses: [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20]
   },
   {
      bookBkg: "/images/commentaries_by_book/42.png",
      bookId: "LUK",
      bookTitle: "Luke",
      chapters: 24,
      verses: [
         80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56,
         53
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/43.png",
      bookId: "JHN",
      bookTitle: "John",
      chapters: 28,
      verses: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25]
   },
   {
      bookBkg: "/images/commentaries_by_book/44.png",
      bookId: "ACT",
      bookTitle: "Acts",
      chapters: 21,
      verses: [
         26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35,
         27, 27, 32, 44, 31
      ]
   },
   {
      bookBkg: "/images/commentaries_by_book/45.png",
      bookId: "ROM",
      bookTitle: "Romans",
      chapters: 16,
      verses: [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27]
   },
   {
      bookBkg: "/images/commentaries_by_book/46.png",
      bookId: "1CO",
      bookTitle: "1 Corinthians",
      chapters: 16,
      verses: [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24]
   },
   {
      bookBkg: "/images/commentaries_by_book/47.png",
      bookId: "2CO",
      bookTitle: "2 Corinthians",
      chapters: 13,
      verses: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14]
   },
   {
      bookBkg: "/images/commentaries_by_book/48.png",
      bookId: "GAL",
      bookTitle: "Galatians",
      chapters: 6,
      verses: [24, 21, 29, 31, 26, 18]
   },
   {
      bookBkg: "/images/commentaries_by_book/49.png",
      bookId: "EPH",
      bookTitle: "Ephesians",
      chapters: 6,
      verses: [23, 22, 21, 32, 33, 24]
   },
   {
      bookBkg: "/images/commentaries_by_book/50.png",
      bookId: "PHP",
      bookTitle: "Philippians",
      chapters: 4,
      verses: [30, 30, 21, 23]
   },
   {
      bookBkg: "/images/commentaries_by_book/51.png",
      bookId: "COL",
      bookTitle: "Colossians",
      chapters: 4,
      verses: [29, 23, 25, 18]
   },
   {
      bookBkg: "/images/commentaries_by_book/52.png",
      bookId: "1TH",
      bookTitle: "1 Thessalonians",
      chapters: 5,
      verses: [10, 20, 13, 18, 28]
   },
   {
      bookBkg: "/images/commentaries_by_book/53.png",
      bookId: "2TH",
      bookTitle: "2 Thessalonians",
      chapters: 3,
      verses: [12, 17, 18]
   },
   {
      bookBkg: "/images/commentaries_by_book/54.png",
      bookId: "1TI",
      bookTitle: "1 Timothy",
      chapters: 6,
      verses: [20, 15, 16, 16, 25, 21]
   },
   {
      bookBkg: "/images/commentaries_by_book/55.png",
      bookId: "2TI",
      bookTitle: "2 Timothy",
      chapters: 4,
      verses: [18, 26, 17, 22]
   },
   {
      bookBkg: "/images/commentaries_by_book/56.png",
      bookId: "TIT",
      bookTitle: "Titus",
      chapters: 3,
      verses: [16, 15, 15]
   },
   {
      bookBkg: "/images/commentaries_by_book/57.png",
      bookId: "PHM",
      bookTitle: "Philemon",
      chapters: 1,
      verses: [25]
   },
   {
      bookBkg: "/images/commentaries_by_book/58.png",
      bookId: "HEB",
      bookTitle: "Hebrews",
      chapters: 13,
      verses: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25]
   },
   {
      bookBkg: "/images/commentaries_by_book/59.png",
      bookId: "JAS",
      bookTitle: "James",
      chapters: 5,
      verses: [27, 26, 18, 17, 20]
   },
   {
      bookBkg: "/images/commentaries_by_book/60.png",
      bookId: "1PE",
      bookTitle: "1 Peter",
      chapters: 5,
      verses: [25, 25, 22, 19, 14]
   },
   {
      bookBkg: "/images/commentaries_by_book/61.png",
      bookId: "2PE",
      bookTitle: "2 Peter",
      chapters: 3,
      verses: [21, 22, 18]
   },
   {
      bookBkg: "/images/commentaries_by_book/62.png",
      bookId: "1JN",
      bookTitle: "1 John",
      chapters: 5,
      verses: [10, 29, 24, 21, 21]
   },
   {
      bookBkg: "/images/commentaries_by_book/63.png",
      bookId: "2JN",
      bookTitle: "2 John",
      chapters: 1,
      verses: [13]
   },
   {
      bookBkg: "/images/commentaries_by_book/64.png",
      bookId: "3JN",
      bookTitle: "3 John",
      chapters: 1,
      verses: [14]
   },
   {
      bookBkg: "/images/commentaries_by_book/65.png",
      bookId: "JUD",
      bookTitle: "Jude",
      chapters: 1,
      verses: [25]
   },
   {
      bookBkg: "/images/commentaries_by_book/66.png",
      bookId: "REV",
      bookTitle: "Revelation",
      chapters: 22,
      verses: [
         20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21
      ]
   }
];
export type commentaries_by_book_query = {
   genesis: number;
   exodus: number;
   leviticus: number;
   numbers: number;
   deuteronomy: number;
   joshua: number;
   judges: number;
   ruth: number;
   one_samuel: number;
   two_samuel: number;
   one_kings: number;
   two_kings: number;
   one_chronicles: number;
   two_chronicles: number;
   ezra: number;
   nehemiah: number;
   esther: number;
   job: number;
   psalms: number;
   proverbs: number;
   ecclesiastes: number;
   sing_of_songs: number;
   isaiah: number;
   jeremiah: number;
   lamentations: number;
   ezekiel: number;
   daniel: number;
   hosea: number;
   joel: number;
   amos: number;
   obadiah: number;
   jonah: number;
   micah: number;
   nahum: number;
   habakkuk: number;
   zephaniah: number;
   haggai: number;
   zechariah: number;
   malachi: number;
   matthew: number;
   mark: number;
   luke: number;
   john: number;
   acts: number;
   romans: number;
   one_corinthians: number;
   two_corinthians: number;
   galatians: number;
   ephesians: number;
   philippians: number;
   colossians: number;
   one_thessalonians: number;
   two_thessalonians: number;
   one_timothy: number;
   two_timothy: number;
   titus: number;
   philemon: number;
   hebrews: number;
   james: number;
   one_peter: number;
   two_peter: number;
   one_john: number;
   two_john: number;
   three_john: number;
   jude: number;
   revelation: number;
};
