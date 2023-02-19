import camera from "./Camera.jsx";

class Resize {
  constructor() {
    this.renderer = null;
  }
  //开始
  start(renderer) {
    this.renderer = renderer;
    window.addEventListener("resize", this.resize.bind(this));
  }

  //停止
  stop() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  // 调整大小
  resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
const resize = new Resize();
export default resize;
