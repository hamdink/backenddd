import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LivraisonService } from './services/livraision.service';
import { Status } from 'src/modules/common/enums/status.enum';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.1.3:8081'],
    credentials: true,
  },
})
export class LivraisonGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly livraisonService: LivraisonService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }
  @SubscribeMessage('statusChange')
  handleStatusChange(@MessageBody() data: { id: string, status: Status }) {
    if (data && data.id) {
      this.server.emit('statusChange', data);
    } else {
      console.error('Invalid data received for statusChange event');
    }
  }

  @SubscribeMessage('addLivraison')
  async handleAddLivraison(@MessageBody() data: { id: string }) {
      console.log('Received addLivraison event with data:', data);
      if (data && data.id) {
          this.server.emit('addLivraison', data); 
          await this.updatePendingCount();  // Update and emit the pending count
      } else {
          console.error('Invalid data received for addLivraison event');
      }
  }
  
  async updatePendingCount() {
      try {
          const pendingCount = await this.livraisonService.countPendingDeliveries(); // Get the current pending count
          console.log('Updated pending count:', pendingCount);  // Ensure this logs the correct count
          this.server.emit('updatePendingCount', { count: pendingCount }); // Emit the updated count to all clients
      } catch (error) {
          console.error('Error fetching pending count:', error);
      }
  }
  
  async emitNotification() {
    this.server.emit('newLivraisonNotification', { message: 'New livraison added' });
  }

  @SubscribeMessage('addLivraisonWithDriver')
  async handleAddLivraisonWithDriver(@MessageBody() data: { id: string, driverId: string }) {
    console.log('Received addLivraisonWithDriver event with data:', data);
    if (data && data.id && data.driverId) {
      this.server.emit('addLivraisonWithDriver', data);
      await this.emitNotificationWithDriver(data.id, data.driverId);
    } else {
      console.error('Invalid data received for addLivraisonWithDriver event');
    }
  }

  async emitNotificationWithDriver(livraisonId: string, driverId: string) {
    this.server.emit('newLivraisonNotificationWithDriver', {
      message: 'New livraison assigned to driver',
      livraisonId,
      driverId,
    });
  }

  
}
