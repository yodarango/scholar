//! #COMEBACK -------- does not work with storeis since it does not support next/router

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Pagination } from "../../../fragments/buttons/pagination";

export default {
   title: "fragments/buttons/Pagination",
   component: Pagination
} as ComponentMeta<typeof Pagination>;

export const TypeOne: ComponentStory<typeof Pagination> = () => (
   <Pagination goForth='/' goBack='/' type='1' forContent='1' />
);

export const TypeTwo: ComponentStory<typeof Pagination> = () => (
   <Pagination goForth='/' goBack='/' type='2' forContent='2' />
);
