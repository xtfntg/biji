//主要场景
class MasterScene {
  constructor() {
    //实例名称
    this.instanceName = null;
    //场景处理程序
    this.sceneHandler = null;
  }
  //字符串
  toString() {
    return this.instanceName;
  }
  //设置实例名称
  setInstanceName(instanceName) {
    //实例名称
    this.instanceName = instanceName;
  }
  //设置场景处理程序
  setSceneHandler(sceneHandler) {
    this.sceneHandler = sceneHandler;
  }
  //打开
  open() {}
  //关闭
  close() {}
}
export default MasterScene;
