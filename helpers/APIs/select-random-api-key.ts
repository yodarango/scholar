const availableAPIs = [
   process.env.NEXT_PUBLIC_BIBLE_API_KEY_1,
   process.env.NEXT_PUBLIC_BIBLE_API_KEY_2,
   process.env.NEXT_PUBLIC_BIBLE_API_KEY_3,
   process.env.NEXT_PUBLIC_BIBLE_API_KEY_4
];

export const chosenKey = availableAPIs[Math.floor(Math.random() * 3)];
