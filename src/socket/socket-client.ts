import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;

  constructor() {
    this.socketClient = io('http://localhost:3002');
  }

  onModuleInit() {
    this.registerConsumerEvents();
  }

  private registerConsumerEvents() {
    this.socketClient.emit('new-message', 'heyy new msg from client');
    this.socketClient.on('connect', () => {
      console.log('Connected to server');
    });

    this.socketClient.on('message', (payload: any) => {
      console.log(payload);
    });
  }
}
