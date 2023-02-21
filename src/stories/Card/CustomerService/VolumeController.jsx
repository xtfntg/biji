import "./VolumeController.scss";
export const VolumeController = () => {
  return (
    <div class="VolumeController">
      <img
        class="MainBg"
        src="https://cdn-static.alethea.ai/fuse/volume/v-slider-bg.svg"
        alt="背景"
      />
      <div class="InnerVolume">
        <button class="VolumeBtnPlay">
          <img
            src="https://cdn-static.alethea.ai/fuse/volume/play.svg"
            alt="背景"
          />
        </button>
        <div class="VolumeControl">
          <img
            class="VcBg"
            src="https://cdn-static.alethea.ai/fuse/volume/v-volume-bg.svg"
            alt="背景"
          ></img>
          <div class="InsideVolumeBg">
            <botton class="ChangeBtn">
              <img
                class="VoiceBtn"
                src="https://cdn-static.alethea.ai/fuse/volume/increase-volume.svg"
                alt="背景"
              />
            </botton>
            <span class="MuiSliderRoot">
              <span class="MuiSliderRail"></span>
              <span class="MuiSliderTrack"></span>
              <input type="hidden" value="7"></input>
              <span class="MuiSliderThumb"></span>
            </span>
            <botton class="ChangeBtn">
              <img
                class="VoiceBtn"
                src="https://cdn-static.alethea.ai/fuse/volume/decrease-volume.svg"
                alt="背景"
              ></img>
            </botton>
          </div>
        </div>
        <button class="VolumeBtnMute">
          <img
            src="https://cdn-static.alethea.ai/fuse/volume/sound-on.svg"
            alt="背景"
          />
        </button>
      </div>
    </div>
  );
};
