export interface FacebookAppEventsPlugin {
    initialize(options: FacebookInitializeOptions): Promise<void>;
    isInitialized(): Promise<{
        initialized: boolean;
    }>;
    logEvent(options: LogEventOptions): Promise<void>;
}
export interface FacebookInitializeOptions {
    appId: string;
    clientToken: string;
}
export interface LogEventOptions {
    eventName: FacebookEventName;
    valueToSum?: number;
    parameters?: FacebookEventParams & Record<string, any>;
}
export declare enum FacebookStandardEvents {
    ACTIVATED_APP = "fb_mobile_activate_app",
    DEACTIVATED_APP = "fb_mobile_deactivate_app",
    SESSION_INTERRUPTIONS = "fb_mobile_app_interruptions",
    TIME_BETWEEN_SESSIONS = "fb_mobile_time_between_sessions",
    COMPLETED_REGISTRATION = "fb_mobile_complete_registration",
    VIEWED_CONTENT = "fb_mobile_content_view",
    SEARCHED = "fb_mobile_search",
    RATED = "fb_mobile_rate",
    COMPLETED_TUTORIAL = "fb_mobile_tutorial_completion",
    PUSH_TOKEN_OBTAINED = "fb_mobile_obtain_push_token",
    ADDED_TO_CART = "fb_mobile_add_to_cart",
    ADDED_TO_WISHLIST = "fb_mobile_add_to_wishlist",
    INITIATED_CHECKOUT = "fb_mobile_initiated_checkout",
    ADDED_PAYMENT_INFO = "fb_mobile_add_payment_info",
    PURCHASED = "fb_mobile_purchase",
    ACHIEVED_LEVEL = "fb_mobile_level_achieved",
    UNLOCKED_ACHIEVEMENT = "fb_mobile_achievement_unlocked",
    SPENT_CREDITS = "fb_mobile_spent_credits",
    CONTACT = "Contact",
    CUSTOMIZE_PRODUCT = "CustomizeProduct",
    DONATE = "Donate",
    FIND_LOCATION = "FindLocation",
    SCHEDULE = "Schedule",
    START_TRIAL = "StartTrial",
    SUBMIT_APPLICATION = "SubmitApplication",
    SUBSCRIBE = "Subscribe",
    AD_IMPRESSION = "AdImpression",
    AD_CLICK = "AdClick",
    LIVE_STREAMING_START = "fb_sdk_live_streaming_start",
    LIVE_STREAMING_STOP = "fb_sdk_live_streaming_stop",
    LIVE_STREAMING_PAUSE = "fb_sdk_live_streaming_pause",
    LIVE_STREAMING_RESUME = "fb_sdk_live_streaming_resume",
    LIVE_STREAMING_ERROR = "fb_sdk_live_streaming_error",
    LIVE_STREAMING_UPDATE_STATUS = "fb_sdk_live_streaming_update_status",
    PRODUCT_CATALOG_UPDATE = "fb_mobile_catalog_update"
}
export type FacebookEventName = FacebookStandardEvents | (string & {});
export interface FacebookEventParams {
    live_streaming_prev_status?: string;
    live_streaming_status?: string;
    live_streaming_error?: string;
    fb_currency?: string;
    fb_registration_method?: string;
    fb_content_type?: string;
    fb_content?: string;
    fb_content_id?: string;
    fb_search_string?: string;
    fb_success?: '1' | '0';
    fb_max_rating_value?: string;
    fb_payment_info_available?: '1' | '0';
    fb_num_items?: number;
    fb_level?: string;
    fb_description?: string;
    fb_mobile_launch_source?: string;
    fb_mobile_pckg_fp?: string;
    fb_mobile_app_cert_hash?: string;
    _valueToSum?: number;
    ad_type?: string;
    fb_order_id?: string;
    fb_product_custom_label_0?: string;
    fb_product_custom_label_1?: string;
    fb_product_custom_label_2?: string;
    fb_product_custom_label_3?: string;
    fb_product_custom_label_4?: string;
    fb_product_category?: string;
    fb_product_applink_ios_url?: string;
    fb_product_applink_ios_app_store_id?: string;
    fb_product_applink_ios_app_name?: string;
    fb_product_applink_iphone_url?: string;
    fb_product_applink_iphone_app_store_id?: string;
    fb_product_applink_iphone_app_name?: string;
    fb_product_applink_ipad_url?: string;
    fb_product_applink_ipad_app_store_id?: string;
    fb_product_applink_ipad_app_name?: string;
    fb_product_applink_android_url?: string;
    fb_product_applink_android_package?: string;
    fb_product_applink_android_app_name?: string;
    fb_product_applink_windows_phone_url?: string;
    fb_product_applink_windows_phone_app_id?: string;
    fb_product_applink_windows_phone_app_name?: string;
}
export declare class FacebookEventBuilder {
    static activateApp(): LogEventOptions;
    static completeRegistration(method: string): LogEventOptions;
    static viewContent(params: {
        valueToSum?: number;
        fb_content_type?: string;
        fb_content_id?: string;
        fb_content?: string;
        fb_currency?: string;
    }): LogEventOptions;
    static addToCart(params: {
        valueToSum: number;
        fb_content_type?: string;
        fb_content_id?: string;
        fb_content?: string;
        fb_currency?: string;
    }): LogEventOptions;
    static rate(params: {
        valueToSum: number;
        fb_content_type?: string;
        fb_content_id?: string;
        fb_content?: string;
        fb_max_rating_value?: string;
    }): LogEventOptions;
    static initiateCheckout(params: {
        valueToSum: number;
        fb_currency?: string;
        fb_num_items?: number;
        fb_content_type?: string;
        fb_content_id?: string;
        fb_content?: string;
        fb_payment_info_available?: '1' | '0';
    }): LogEventOptions;
    static purchase(params: {
        valueToSum: number;
        fb_currency?: string;
        fb_num_items?: number;
        fb_content_type?: string;
        fb_content_id?: string;
        fb_content?: string;
    }): LogEventOptions;
    static search(params: {
        fb_search_string: string;
        fb_content_type?: string;
        fb_success?: '1' | '0';
    }): LogEventOptions;
    static subscribe(params: {
        valueToSum: number;
        fb_order_id: string;
        fb_currency?: string;
    }): LogEventOptions;
    static startTrial(params: {
        valueToSum: number;
        fb_order_id: string;
        fb_currency?: string;
    }): LogEventOptions;
    static unlockAchievement(description: string): LogEventOptions;
    static achieveLevel(level: string): LogEventOptions;
    static adImpression(params?: {
        valueToSum?: number;
        ad_type?: string;
    }): LogEventOptions;
    static contact(): LogEventOptions;
    static custom(name: string, options?: {
        valueToSum?: number;
        parameters?: Record<string, any>;
    }): LogEventOptions;
}
