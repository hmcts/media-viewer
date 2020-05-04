import { Injectable } from '@angular/core';
import { Screen } from '../store/reducers';
import { StompServiceFactoryService } from './stomp-service-factory.service';

@Injectable()
export class IcpWebsocketService {

  private ICP_UPDATE_SCREEN = '/icp/screen-change';
  private ICP_SCREEN_UPDATED = '/topic/screen-change';

  constructor(private stompServiceFactory: StompServiceFactoryService) {}

  connectSession(sessionId: string) {
    this.stompServiceFactory.connect(sessionId);
  }

  updateScreen(update: {body: Screen, id: string}) {
    const sessionId = update.id;
    this.connectSession(sessionId);
    this.stompServiceFactory.publishUpdates(`${this.ICP_UPDATE_SCREEN}/${sessionId}`,
      `{"page":  ${update.body.page}, "document": "${update.body.document}"}`);
  }

  screenUpdated(sessionId: string) {
    this.connectSession(sessionId);
    return this.stompServiceFactory.subscribeToUpdates(`${this.ICP_SCREEN_UPDATED}/${sessionId}`);
  }
}
