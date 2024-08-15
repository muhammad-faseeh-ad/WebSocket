import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(client.id);

    client.broadcast.emit('user-joined', {
      message: `new user joined: ${client.id}`,
    });

    // this.server.emit('user-joined', {
    //   message: `new user joined: ${client.id}`,
    // });
  }

  handleDisconnect(client: Socket) {
    console.log(client.id, ' disconnected');

    this.server.emit('user-left', {
      message: `user left: ${client.id}`,
    });
  }
  @SubscribeMessage('new-message')
  handleNewMessage(client: Socket, msg: any) {
    //console.log(msg);

    //client.emit('reply', 'this is my reply');
    this.server.emit('message', msg);
  }
}
