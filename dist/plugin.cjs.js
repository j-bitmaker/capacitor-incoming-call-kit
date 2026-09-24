'use strict';

var core = require('@capacitor/core');

const IncomingCallKit = core.registerPlugin('IncomingCallKit', {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.IncomingCallKitWeb()),
});

class IncomingCallKitWeb extends core.WebPlugin {
    constructor() {
        super(...arguments);
        this.calls = new Map();
    }
    async showIncomingCall(options) {
        var _a, _b, _c;
        const call = {
            callId: options.callId,
            callerName: options.callerName,
            handle: options.handle,
            hasVideo: (_a = options.hasVideo) !== null && _a !== void 0 ? _a : false,
            state: 'ringing',
            platform: 'web',
            extra: options.extra,
        };
        this.calls.set(call.callId, call);
        await this.emit('incomingCallDisplayed', call, undefined, 'api');
        if (((_b = options.timeoutMs) !== null && _b !== void 0 ? _b : 60000) > 0) {
            window.setTimeout(() => {
                const currentCall = this.calls.get(call.callId);
                if ((currentCall === null || currentCall === void 0 ? void 0 : currentCall.state) === 'ringing') {
                    this.calls.delete(call.callId);
                    void this.emit('callTimedOut', Object.assign(Object.assign({}, currentCall), { state: 'ended' }), 'timeout', 'system');
                }
            }, (_c = options.timeoutMs) !== null && _c !== void 0 ? _c : 60000);
        }
        return { call };
    }
    async endCall(options) {
        var _a;
        const call = this.calls.get(options.callId);
        if (call) {
            this.calls.delete(options.callId);
            await this.emit('callEnded', Object.assign(Object.assign({}, call), { state: 'ended' }), (_a = options.reason) !== null && _a !== void 0 ? _a : 'ended', 'api');
        }
        return this.getActiveCalls();
    }
    async endAllCalls(options) {
        const calls = [...this.calls.values()];
        this.calls.clear();
        await Promise.all(calls.map((call) => { var _a; return this.emit('callEnded', Object.assign(Object.assign({}, call), { state: 'ended' }), (_a = options === null || options === void 0 ? void 0 : options.reason) !== null && _a !== void 0 ? _a : 'ended', 'api'); }));
        return this.getActiveCalls();
    }
    async getActiveCalls() {
        return {
            calls: [...this.calls.values()],
        };
    }
    async checkPermissions() {
        return {
            notifications: 'notApplicable',
            fullScreenIntent: 'notApplicable',
        };
    }
    async requestPermissions() {
        return this.checkPermissions();
    }
    async requestFullScreenIntentPermission() {
        return this.checkPermissions();
    }
    async getPluginVersion() {
        return {
            version: 'web',
        };
    }
    async emit(eventName, call, reason, source) {
        const payload = Object.assign({ call,
            source }, (reason ? { reason } : {}));
        await this.notifyListeners(eventName, payload);
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IncomingCallKitWeb: IncomingCallKitWeb
});

exports.IncomingCallKit = IncomingCallKit;
//# sourceMappingURL=plugin.cjs.js.map
