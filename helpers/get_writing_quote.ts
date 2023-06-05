const quotes = [
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

export const getWritingQuote = () => {
   const quoteLength = quotes.length;
   const randomIndex = Math.floor(Math.random() * quoteLength);
   const randomQuote = quotes[randomIndex];
   return randomQuote;
};
