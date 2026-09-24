import { registerPlugin } from '@capacitor/core';
const IncomingCallKit = registerPlugin('IncomingCallKit', {
    web: () => import('./web').then((m) => new m.IncomingCallKitWeb()),
});
export * from './definitions';
export { IncomingCallKit };
//# sourceMappingURL=index.js.map