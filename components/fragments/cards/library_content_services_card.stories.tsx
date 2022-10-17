import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LibraryContentServicesCard } from "./library_content_services_card";

export default {
   title: "fragments/cards/Libary Content Service ",
   component: LibraryContentServicesCard
} as ComponentMeta<typeof LibraryContentServicesCard>;

export const Default: ComponentStory<typeof LibraryContentServicesCard> = () => (
   <LibraryContentServicesCard
      title='Library service long titles'
      img={{ src: "/images/icon.png", alt: "some image" }}
      link='#'
   />
);
