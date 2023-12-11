import { Component, OnInit } from '@angular/core';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userName = '';
  message = '';
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: string[] = [];
  socket: any;
  constructor(){

  }
  ngOnInit(): void {
    console.log('Method not implemented.');
  }

  userNameUpdate(name: string): void {
    this.socket = io(`http://localhost:3000?userName=${name}`);
    console.log('this.socket',this.socket)
    this.userName = name;

    // this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: { message: string, userName: string }) => {
      console.log('Message received on client:', data);
      if (!this.messageList.some(msg => msg.message === data.message)) {
        this.messageList.push({ message: data.message, userName: data.userName, mine: false });
    }    
    });
  }





  sendMessage(): void {
    if (this.socket) {
      this.socket.emit('message', this.message);
      console.log('message',this.message)
      this.messageList.push({ message: this.message, userName: this.userName, mine: true });
      this.message = '';
    } else {
      console.error('Socket is not properly initialized.');
    }
  }
}



