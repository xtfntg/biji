class Machine {
  constructor() {
    this.flag = false;
    this.callbacks = [];
  }
  addCallback(callback) {
    this.callbacks.push(callback);
  }

  removeCallback(callback) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }
  //运行
  run() {
    if (!this.flag) return;
    this.callbacks.forEach((cb) => cb());
    requestAnimationFrame(this.run.bind(this));
  }
  //开始
  start() {
    if (this.flag) return;
    this.flag = true;
    this.run();
  }
  //停止
  stop() {
    this.flag = false;
  }
}
const machine = new Machine();
export default machine;
