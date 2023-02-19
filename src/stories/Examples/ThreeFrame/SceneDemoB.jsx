import MasterScene from "./MasterScene";
//场景演示A 主场景
class SceneDemoB extends MasterScene {
  //打开
  open() {
    console.log(`thScene ${this.instanceName} is oppening`);
    setTimeout(() => {
      this.sceneHandler.goTo(sceneList.sceneDemoA);
    }, 1000 * 5);
  }
  //关闭
  close() {
    console.log(`thScene ${this.instanceName} is clossing`);
  }
}
const sceneDemoB = new SceneDemoB();
export default SceneDemoB;
