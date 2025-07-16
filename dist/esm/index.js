import { registerPlugin } from '@capacitor/core';
const FacebookAppEvents = registerPlugin('FacebookAppEvents', {
    web: () => import('./web').then((m) => new m.FacebookAppEventsWeb()),
});
export * from './definitions';
export { FacebookAppEvents };
//# sourceMappingURL=index.js.map