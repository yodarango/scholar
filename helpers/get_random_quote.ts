const writingQuotes = [
   '"Write quickly and you will never write well; write well, and you will soon write quickly." ― Marcus Fabius Quintilianus',
   `"The first draft is just you telling yourself the story.” ― Terry Pratchett`,
   `"You can always edit a bad page. You can’t edit a blank page.” ― Jodi Picoult`,
   `"Start writing, no matter what. The water does not flow until the faucet is turned on." ― Louis L’Amour`,
   `"In writing. Don’t use adjectives which merely tell us how you want us to feel about the thing you are describing. 
   I mean, instead of telling us a thing was “terrible,” describe it so that we’ll be terrified. Don’t say it was 
   “delightful”; make us say “delightful” when we’ve read the description. You see, all those words (horrifying, wonderful, 
    hideous, exquisite) are only like saying to your readers, “Please will you do my job for me.” ― C.S. Lewis`,
   `“A good novel tells us the truth about its hero; but a bad novel tells us the truth about its author.” - G.K. Chesterton`
];

const commentaryQuotes = [
   `Nobody ever outgrows Scripture; the book widens and deepens with our years.  – Charles Spurgeon`,
   `The Bible is shallow enough for a child not to drown, yet deep enough for an elephant to swim.  – Saint Augustine`,
   `Where one man reads the Bible, a hundred read you and me.  – DL Moody`,
   `A readiness to believe every promise implicitly, to obey every command unhesitatingly, to stand perfect and complete in all the will of God, is the only true spirit of Bible study.  – Andrew Murray`,
   ` Nothing less than a whole Bible can make a whole Christian.  – AW Tosser`,
   ` My conscience is captive to the Word of God.  – Martin Luther`,
   `The most foolish person in the world is the one who has the opportunity to read, absorb, digest, live in, be immersed in worship-reading the Bible, but doesn’t do it because of PREOCCUPATION with other things of this world.  – Rex B. Andrews`,
   `Am I willing to trade my addiction to the world’s entertainment for more time with my Bible?  – Leslie Ludy`,
   `One of these days some simple soul will pick up the Book of God, read it and believe it.  – Leonard Ravenhill`,
   `The time I spend with God determines both the direction and quality of the time I spend elsewhere.  – Randy Alcorn`,
   `An honest man with an open Bible and a pad and pencil is sure to find out what is wrong with him very quickly.  ― AW Tozer`,
   `The Bible will keep you from sin, or sin will keep you from the Bible.  – DL Moody`
];
export const getRandomQuote = (type: number = 1) => {
   const quoteLength = type === 1 ? writingQuotes.length : commentaryQuotes.length;
   const randomIndex = Math.floor(Math.random() * quoteLength);
   const quote = type === 1 ? writingQuotes[randomIndex] : commentaryQuotes[randomIndex];
   return quote;
};
