import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LocationCard } from "../../../fragments/cards/location_card";

export default {
   title: "fragments/cards/location card",
   component: LocationCard
} as ComponentMeta<typeof LocationCard>;

export const WithoutCloseOption: ComponentStory<typeof LocationCard> = () => (
   <LocationCard
      cta={{
         handleShowLocationInfo() {
            console.log("...");
         }
      }}
      location={{
         name: "Santa Tomasa de la Asuncion",
         address: "123 Some st",
         city: "Los Angeles",
         id: "California",
         location: "123 some st los angeles ca",
         logo: "/images/logo.png",
         schedule: ["Sunday 10:00am", "Sunday 6:30pm"],
         state: "CA",
         zip: "12345",
         website: "www.danielrangel.net",
         iFrame: "none"
      }}
   />
);
