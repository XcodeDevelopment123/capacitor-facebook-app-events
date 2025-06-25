import { WebPlugin } from '@capacitor/core';

import type { FacebookAppEventsPlugin } from './definitions';

export class FacebookAppEventsWeb extends WebPlugin implements FacebookAppEventsPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
