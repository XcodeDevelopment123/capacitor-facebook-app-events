import { registerPlugin } from '@capacitor/core';

import type { FacebookAppEventsPlugin } from './definitions';

const FacebookAppEvents = registerPlugin<FacebookAppEventsPlugin>('FacebookAppEvents', {
  web: () => import('./web').then((m) => new m.FacebookAppEventsWeb()),
});

export * from './definitions';
export { FacebookAppEvents };
