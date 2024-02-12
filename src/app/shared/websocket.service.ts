import { Injectable } from '@angular/core';
import {WebSocketSubject} from 'rxjs/webSocket'
import { ChatMessage } from './chatMessagesDto';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;
  receivedMessages : any[]=[];
  sentMessages: any[]=[]
  private wsUri = 'wss://socketsbay.com/wss/v2/1/demo/';
  public websocket: WebSocketSubject<any>;

  constructor() {
    this.websocket = new WebSocketSubject(this.wsUri);
   }


  connect(): void {
    this.socket = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const chatMessage = JSON.stringify(event.data)
      this.receivedMessages.push(chatMessage)
      console.log('Received message:', chatMessage );
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
/**message will sent to websocket and store in sentMessage */
  sendMessage(message: any): void {
    this.socket.send(message);
    let senderMessage = JSON.stringify(message)
    this.sentMessages.push(senderMessage)
  }

  closeConnection(): void {
    this.socket.close();
  }
}
