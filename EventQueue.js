exports.EventQueue = class {
  queue = [];
  messageListeners = [];
  running = false;

  FireMessage(message) {
    let request = new MessageEvent(message, this.messageListeners);
    this.queue.push(request);
  }

  async Start() {
    this.running = true;
    this.runLoop();
  }

  RegisterMessageListener(component) {
    this.messageListeners.push(component);
  }

  async runLoop() {
    while (this.running || this.queue.length > 0) {
      let curr = this.queue.shift();
      await curr.broadcast();
    }
  }
};

class MessageEvent {
  payload;
  listeners = [];

  constructor(p, l) {
    this.payload = p;
    this.listeners = l;
  }

  broadcast() {
    for (let lis in this.listeners) {
      let curr = this.listeners[lis];
      curr.HandleMessage(this.payload);
    }
  }
}
