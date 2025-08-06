import { io, Socket } from 'socket.io-client';
import mitt, { Emitter } from 'mitt';

class WebSocketConnectionManager {
  instance: null | Socket = null;
  emitter: null | Emitter<any> = null;

  public getInstance(reconnect: boolean = false) {
    if (this.instance === null || reconnect) {
      this.emitter = mitt();
      this.instance = io('wss://localhost', {
        path: '/ws/',
        autoConnect: false,
        transports: ['websocket', 'polling'],
      });

      this.bindBasicEvents();
      this.instance.connect();
    }

    return this;
  }

  private bindBasicEvents() {
    this.instance?.on('connect', () => {
      console.log('connection established');
    });

    this.instance?.on('order-updated', (data) => {
      this.emitter?.emit('order-updated', data);
    });
  }
}
export default new WebSocketConnectionManager();
