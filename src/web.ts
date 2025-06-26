import { WebPlugin } from '@capacitor/core';

import type { FacebookAppEventsPlugin, LogAppEventOptions } from './definitions';

export class FacebookAppEventsWeb extends WebPlugin implements FacebookAppEventsPlugin {
  logEvent(options: LogAppEventOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }

  initialize(options: { appId: string; clientToken: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  isInitialized(): Promise<{ initialized: boolean }> {
    throw new Error('Method not implemented.');
  }
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
