import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ColorPickerOptions } from "./color_picker_options";

export default {
   title: "fragments/Content Reviews",
   component: ColorPickerOptions
} as ComponentMeta<typeof ColorPickerOptions>;

export const Default: ComponentStory<typeof ColorPickerOptions> = () => (
   <ColorPickerOptions
      cta={{
         handleColorSelection: (color: string | { light: string; dark: string }) =>
            console.log(color)
      }}
   />
);
