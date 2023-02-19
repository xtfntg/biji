class Mouse {
  constructor() {
    this.canvas = null;
    this.click = this._click.bind(this);
    this.toggle = this._toggle.bind(this);
    this.move = this._move.bind(this);
    this.delta = { x: 0, y: 0 };
    this.acumulated = { x: 0, y: 0 };
  }
  //集合
  setCanvas(canvas) {
    this.canvas = canvas;
  }
  //启动
  start() {
    if (!this.canvas) alert("没有选择画布");
    this.canvas.requestPointerLock =
      this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;
    this.canvas.addEventListener("click", this.click);
    document.addEventListener("pointerlockchange", this.toggle);
    document.addEventListener("mozpointerlockchange", this.toggle);
  }
  //停止
  stop() {
    if (this.canvas) this.canvas.removeEventListener("click", this.click);
    document.removeEventListener("pointerlockchange", this.toggle);
    document.removeEventListener("mozpointerlockchange", this.toggle);
  }
  //单击
  _click() {
    this.canvas.requestPointerLock();
  }
  _toggle() {
    if (
      document.pointerLockElement === this.canvas ||
      document.mozPointerLockElement === this.canvas
    ) {
      document.addEventListener("mousemove", this.move);
    } else {
      document.removeEventListener("mousemove", this.move);
    }
  }
  _move(e) {
    this.delta.x = e.movementX;
    this.delta.y = e.movementY;
    this.acumulated.x += e.movementX;
    this.acumulated.y += e.movementY;
    console.log(this.acumulated);
  }
}
const mouse = new Mouse();
export default mouse;
