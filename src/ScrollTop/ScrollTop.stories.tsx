import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ScrollTop } from "./ScrollTop";

type T = typeof ScrollTop;

const description = ``;

export default {
  component: ScrollTop,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} as ComponentMeta<T>;

export const Default: ComponentStory<T> = () => (
  <div style={{ height: "3000px" }}>
    下へスクロールした後に上へスクロールするとScrollTopボタンが表示されます。
    <ScrollTop />
  </div>
);
