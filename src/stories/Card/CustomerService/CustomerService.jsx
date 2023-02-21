import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./CustomerService.scss";
import { VolumeController } from "./VolumeController";
import { ColTabsMuiTabPanel } from "./ColTabsMuiTabPanel";

const Col = () => {
  return (
    <div class="Col">
      <div class="options">
        <ColHeader />
        <ColRoot />
        <ColTabs />
      </div>
    </div>
  );
};
//NFT
const ColHeader = () => {
  return (
    <div class="ColHeader">
      <font>
        <font>请调选要为你服务的客服</font>
      </font>
    </div>
  );
};
//身体 灵魂
const ColRoot = () => {
  return (
    <div class="ColRoot">
      <div class="muiTabs">
        <div class="flexContainer">
          <ColRootButton />
          <ColRootButton />
          <ColRootButton />
          <ColRootButton />
        </div>
        <span class="jss"></span>
      </div>
    </div>
  );
};
//身体 灵魂 细节
const ColRootButton = () => {
  return (
    <button class="ColRootButton">
      <span class="muiTab">
        <img src="https://cdn-static.alethea.ai/fuse/tab-icons/body-icon-active.svg" />
        <font> "BODY"</font>
      </span>
    </button>
  );
};
//人物选择
const ColTabs = () => {
  return (
    <div class="ColTabs">
      <ColTabsArrow />
      <ColTabsMuiTabPanel />
      <VolumeController />
    </div>
  );
};
//人物选择 箭头
const ColTabsArrow = () => {
  return (
    <button class="ColTabsArrow">
      <img src="https://cdn-static.alethea.ai/fuse/tabs-data/right-arrow.svg" />
    </button>
  );
};

const AI = () => {
  return (
    <div class="CustomerAI">
      <div class="SelectedCharacterWrapper">
        <div class="SelectedCharacter">
          <div class="CharacterVideo"></div>
          <h3>
            <font>名誉无聊猿</font>
          </h3>
          <video
            autoplay=""
            loop=""
            playsinline=""
            class="PortalVideo"
            preload="metadata"
            __idm_id__="8195"
          >
            <source
              src="https://cdn-develop.alethea.ai/video/flying_portal.webm"
              type="video/webm"
            />
          </video>
          <div class="CharacterDialogue ">
            <img
              class="ArrowUpText"
              src="https://cdn-static.alethea.ai/fuse/arrow-up-text.svg"
              alt="向上箭头"
            ></img>
            <p>
              <font>
                首先，您需要选择您的 iNFT
                的外观。我的身体会怎样？请选择一个选项。
              </font>
            </p>
            <div class="BackgroundSounds">
              <font>音乐</font>
              <button>在</button>
              <button class="active">退</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustomerService = () => {
  return (
    <div class="CustomerService">
      <Col />
      <AI />
    </div>
  );
};
