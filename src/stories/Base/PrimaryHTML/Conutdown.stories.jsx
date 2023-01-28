import React from "react";
import { Conutdown, Mbb, TaoBao, Tab, Header } from "./Conutdown";
import { Enlightenment } from "./Enlightenment";
export default {
  title: "Basis/Conutdown",
  component: Conutdown,
};

const Conutdowns = (args) => <Conutdown {...args} />;
export const ConutdownLate = Conutdowns.bind({});

const Mbbs = (args) => <Mbb {...args} />;
export const MbbLate = Mbbs.bind({});

const TaoBaos = (args) => <TaoBao {...args} />;
export const TaoBaoLate = TaoBaos.bind({});

const Tabs = (args) => <Tab {...args} />;
export const TabLate = Tabs.bind({});

const Headers = (args) => <Header {...args} />;
export const HeaderLate = Headers.bind({});

const Enlightenments = (args) => <Enlightenment {...args} />;
export const EnlightenmentLate = Enlightenments.bind({});
