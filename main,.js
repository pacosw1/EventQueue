let { EventQueue } = require("./EventQueue");

class ComponentA {
  HandleMessage(message) {
    console.log(message + " received by componentA");
  }
}

class ComponentB {
  HandleMessage(message) {
    console.log(message + " received by componentB");
  }
}

class ComponentC {
  eventQ;

  constructor(e) {
    this.eventQ = e;
  }

  sendMessage(m) {
    this.eventQ.FireMessage(m);
  }
}

///main code

let A = new ComponentA();
let B = new ComponentB();

let eventQ = new EventQueue();

let C = new ComponentC(eventQ);

eventQ.RegisterMessageListener(A);
eventQ.RegisterMessageListener(B);

C.sendMessage("hello world");
C.sendMessage("Are you there?");

eventQ.Start();
eventQ.running = false;
