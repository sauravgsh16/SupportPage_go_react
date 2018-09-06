import { EventEmitter } from 'events';

class Socket {
  constructor(ws = new WebSocket(), ee = new EventEmitter()) {
    this.ws = ws;
    this.ee = ee;
    ws.onmessage = this.message.bind(this);
    ws.onopen = this.open.bind(this);
    ws.onclose = this.close.bind(this);
  }

  on(evtName, evtHandler) {
    this.ee.on(evtName, evtHandler);
  }

  off(evtName, evtHandler) {
    this.ee.removeListener(evtName, evtHandler);
  }

  emit(evtName, data) {
    const message = JSON.stringify({ evtName, data });
    this.ws.send(message);
  }

  message(evt) {
    try {
      const message = JSON.parse(evt.data);
      this.ee.emit(message.evtName, message.data);
    } catch (err) {
      this.ee.emit('error', err);
    }
  }

  open() {
    this.ee.emit('connect');
  }

  close() {
    this.ee.emit('disconnect');
  }
}

export default Socket;