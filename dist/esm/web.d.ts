import { WebPlugin } from '@capacitor/core';
import type { FacebookAppEventsPlugin, LogEventOptions } from './definitions';
export declare class FacebookAppEventsWeb extends WebPlugin implements FacebookAppEventsPlugin {
    logEvent(options: LogEventOptions): Promise<void>;
    initialize(options: {
        appId: string;
        clientToken: string;
    }): Promise<void>;
    isInitialized(): Promise<{
        initialized: boolean;
    }>;
}
