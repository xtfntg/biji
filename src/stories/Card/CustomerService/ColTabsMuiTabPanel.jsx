import "./ColTabsMuiTabPanel.scss";

//人物选择 组(6个)
export const ColTabsMuiTabPanel = () => {
  return (
    <div class="ColTabsMuiTabPanel">
      <div class="tabsCustom">
        <audio
          class="DNone"
          src="https://cdn-static.alethea.ai/fuse/thumbnail-selected.mp3"
        ></audio>
        <div class="innerData">
          <ColTabsMuiTabPanelOne />
          <ColTabsMuiTabPanelOne />
          <ColTabsMuiTabPanelOne />
          <ColTabsMuiTabPanelOne />
          <ColTabsMuiTabPanelOne />
          <ColTabsMuiTabPanelOne />
        </div>
      </div>
    </div>
  );
};

//人物选择 人物单个
const ColTabsMuiTabPanelOne = () => {
  return (
    <div class="ColTabsMuiTabPanelOne">
      <div class="ReactReveol">
        <div class="VideoWrapper">
          <input
            type="checkbox"
            id="persona63c24c24-9eab-472b-8a83-8e709e02e44c"
            hidden=""
            name="flipTheCard"
          />
          <div class="FlipCard">
            <div class="FrontCardSide">
              <label for="persona63c24c24-9eab-472b-8a83-8e709e02e44c [object HTMLInputElement]">
                <img
                  src="https://cdn-static.alethea.ai/fuse/tabs-data/card-info.svg"
                  alt="卡信息"
                />
              </label>
              <div class="SelectionBtn"></div>
              <video
                preload="metadata"
                id="videoId-63c24c24-9eab-472b-8a83-8e709e02e44c"
                autoplay=""
                playsinline=""
                src="blob:https://noahsark.ai/c68b6e9b-fde8-42c2-bf6f-ada27dc3eeca"
              ></video>
            </div>
            <div class="BackCardSide">
              <label for="persona63c24c24-9eab-472b-8a83-8e709e02e44c [object HTMLInputElement]">
                <img
                  src="https://cdn-static.alethea.ai/fuse/tabs-data/card-back.svg"
                  alt="卡信息"
                />
              </label>
              <div class="BackCardTitle">
                <font>关于身体</font>
              </div>
              <div class="BackCardContent">
                <div class="BackCardScroll">
                  <font>q</font>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="name">
          <span>
            <font>名誉无聊猿</font>
          </span>
        </div>
      </div>
    </div>
  );
};
