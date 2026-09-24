import { WebPlugin } from '@capacitor/core';
import type { ActiveCallsResult, EndAllCallsOptions, EndCallOptions, IncomingCallKitPlugin, IncomingCallPermissionStatus, PluginVersionResult, ShowIncomingCallOptions, ShowIncomingCallResult } from './definitions';
export declare class IncomingCallKitWeb extends WebPlugin implements IncomingCallKitPlugin {
    private readonly calls;
    showIncomingCall(options: ShowIncomingCallOptions): Promise<ShowIncomingCallResult>;
    endCall(options: EndCallOptions): Promise<ActiveCallsResult>;
    endAllCalls(options?: EndAllCallsOptions): Promise<ActiveCallsResult>;
    getActiveCalls(): Promise<ActiveCallsResult>;
    checkPermissions(): Promise<IncomingCallPermissionStatus>;
    requestPermissions(): Promise<IncomingCallPermissionStatus>;
    requestFullScreenIntentPermission(): Promise<IncomingCallPermissionStatus>;
    getPluginVersion(): Promise<PluginVersionResult>;
    private emit;
}
