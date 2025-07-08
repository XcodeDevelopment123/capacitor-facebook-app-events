import { WebPlugin } from '@capacitor/core';

import type { FacebookAppEventsPlugin, LogEventOptions } from './definitions';

export class FacebookAppEventsWeb extends WebPlugin implements FacebookAppEventsPlugin {
  logEvent(options: LogEventOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }

  initialize(options: { appId: string; clientToken: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  isInitialized(): Promise<{ initialized: boolean }> {
    throw new Error('Method not implemented.');
  }
}
