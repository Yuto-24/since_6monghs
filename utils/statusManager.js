class StatusManager extends EventTarget {
  constructor() {
    super();
    this.status = false;
  }

  getStatus() {
    return this.status;
  }

  changeStatus() {
    this.status = !this.status;
  }
}

// シングルトンインスタンスを作成してエクスポート
const statusManager = new StatusManager();
export default statusManager;
