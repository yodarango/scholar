// core
import React from "react";

// components
import Podcast from "../fragments/library-items/podcast";

// styles
import libraryContentCarrouselStyles from "../styles/layouts/LibraryContentCarrousel.module.css";

// types
import { PodcastsProps } from "../fragments/library-items/podcast";
const LibraryContentCarrousel = () => {
   const allPodcast = [
      {
         thumbnail: "/images/temporary/vm.jpeg",
         podcastName: "Preaching Jesus Christ",
         host: "John Doe",
         reviews: ["23", "ef", "fww", "wefs"],
         stars: [0, 0, 0, 0],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         appleLink: "https://apple.com",
         spotifyLink: "https://android.com",
         googleLink: "https://google.com",
         overcastLink: "https://amazon.com"
      },
      {
         thumbnail: "/images/temporary/vm.jpeg",
         podcastName: "History in our Lord Christ Times",
         host: "Thomas Doe",
         reviews: ["23", "ef", "fww", "wefs", "23", "ef", "fww", "wefs"],
         stars: [1, 1, 3, 5, 1, 1, 3, 5],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         appleLink: "https://apple.com",
         spotifyLink: "https://android.com",
         googleLink: "https://google.com",
         overcastLink: "https://amazon.com"
      },
      {
         thumbnail: "/images/temporary/vm.jpeg",
         podcastName: "Love Him More",
         host: "Allan Doe",
         reviews: ["23", "ef", "fww", "wefs"],
         stars: [4, 2, 4, 3],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         appleLink: "https://apple.com",
         spotifyLink: "https://android.com",
         googleLink: "https://google.com",
         overcastLink: "https://amazon.com"
      },
      {
         thumbnail: "/images/temporary/vm.jpeg",
         podcastName: "Aplogetics 101",
         host: "Peter Doe",
         reviews: ["23", "ef", "fww", "wefs", "sdf"],
         stars: [5, 5, 5, 5, 5],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         appleLink: "https://apple.com",
         spotifyLink: "https://android.com",
         googleLink: "https://google.com",
         overcastLink: "https://amazon.com"
      },
      {
         thumbnail: "/images/temporary/vm.jpeg",
         podcastName: "Tehology 101",
         host: "Tonny Doe",
         reviews: ["23", "fww", "wefs"],
         stars: [1, 5, 2],
         description:
            "ustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
         appleLink: "https://apple.com",
         spotifyLink: "https://android.com",
         googleLink: "https://google.com",
         overcastLink: "https://amazon.com"
      }
   ];
   return (
      <div className={`${libraryContentCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryContentCarrouselStyles.title}>PODCASTS</h1>
         <div className={libraryContentCarrouselStyles.scrollSection}>
            {allPodcast.map((podcast: PodcastsProps) => (
               <Podcast
                  thumbnail={podcast.thumbnail}
                  podcastName={podcast.podcastName}
                  host={podcast.host}
                  reviews={podcast.reviews}
                  stars={podcast.stars}
                  description={podcast.description}
                  appleLink={podcast.appleLink}
                  spotifyLink={podcast.spotifyLink}
                  googleLink={podcast.googleLink}
                  overcastLink={podcast.overcastLink}
               />
            ))}
         </div>
      </div>
   );
};

export default LibraryContentCarrousel;
