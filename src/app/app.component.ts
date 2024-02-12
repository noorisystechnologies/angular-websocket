import { Component } from '@angular/core';
import { WebsocketService } from './shared/websocket.service';
import { NgForm } from '@angular/forms';
import { ChatMessage } from './shared/chatMessagesDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'websocket-demo';
  chatBoxVisible = false;
  newMessage: string = '';
  selectedFile: File | null = null;
  constructor(public webSocketService : WebsocketService) {    
    /**By uncomment the below code websocket server will initiate on page load */
    this.webSocketService.connect();
  }
 

  toggleChatBox() {
    this.chatBoxVisible = !this.chatBoxVisible;
  }
ngOnDestroy(){
  this.webSocketService.closeConnection();
}
/*the message will sent to the websocket in service initiated */
  sendMessage( ) {
    if (this.newMessage) {
      this.webSocketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
  attachFile(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
