export interface FacebookAppEventsPlugin {
  initialize(options: FacebookInitializeOptions): Promise<void>;
  isInitialized(): Promise<{ initialized: boolean }>;
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

// ========================================
// Facebook标准事件定义
// ========================================

export enum FacebookStandardEvents {
  ACTIVATED_APP = 'fb_mobile_activate_app',
  DEACTIVATED_APP = 'fb_mobile_deactivate_app',
  SESSION_INTERRUPTIONS = 'fb_mobile_app_interruptions',
  TIME_BETWEEN_SESSIONS = 'fb_mobile_time_between_sessions',
  COMPLETED_REGISTRATION = 'fb_mobile_complete_registration',
  VIEWED_CONTENT = 'fb_mobile_content_view',
  SEARCHED = 'fb_mobile_search',
  RATED = 'fb_mobile_rate',
  COMPLETED_TUTORIAL = 'fb_mobile_tutorial_completion',
  PUSH_TOKEN_OBTAINED = 'fb_mobile_obtain_push_token',

  // Ecommerce
  ADDED_TO_CART = 'fb_mobile_add_to_cart',
  ADDED_TO_WISHLIST = 'fb_mobile_add_to_wishlist',
  INITIATED_CHECKOUT = 'fb_mobile_initiated_checkout',
  ADDED_PAYMENT_INFO = 'fb_mobile_add_payment_info',
  PURCHASED = 'fb_mobile_purchase',

  // Gaming
  ACHIEVED_LEVEL = 'fb_mobile_level_achieved',
  UNLOCKED_ACHIEVEMENT = 'fb_mobile_achievement_unlocked',
  SPENT_CREDITS = 'fb_mobile_spent_credits',

  // Business
  CONTACT = 'Contact',
  CUSTOMIZE_PRODUCT = 'CustomizeProduct',
  DONATE = 'Donate',
  FIND_LOCATION = 'FindLocation',
  SCHEDULE = 'Schedule',
  START_TRIAL = 'StartTrial',
  SUBMIT_APPLICATION = 'SubmitApplication',
  SUBSCRIBE = 'Subscribe',

  // Ads
  AD_IMPRESSION = 'AdImpression',
  AD_CLICK = 'AdClick',

  // Live streaming
  LIVE_STREAMING_START = 'fb_sdk_live_streaming_start',
  LIVE_STREAMING_STOP = 'fb_sdk_live_streaming_stop',
  LIVE_STREAMING_PAUSE = 'fb_sdk_live_streaming_pause',
  LIVE_STREAMING_RESUME = 'fb_sdk_live_streaming_resume',
  LIVE_STREAMING_ERROR = 'fb_sdk_live_streaming_error',
  LIVE_STREAMING_UPDATE_STATUS = 'fb_sdk_live_streaming_update_status',

  // Product Catalog
  PRODUCT_CATALOG_UPDATE = 'fb_mobile_catalog_update',
}

export type FacebookEventName = FacebookStandardEvents | (string & {});

export interface FacebookEventParams {
  // Live streaming
  live_streaming_prev_status?: string;
  live_streaming_status?: string;
  live_streaming_error?: string;

  // Common
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

  // Ad
  ad_type?: string;

  // Subscription
  fb_order_id?: string;

  // Product catalog
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

export class FacebookEventBuilder {
  static activateApp(): LogEventOptions {
    return {
      eventName: FacebookStandardEvents.ACTIVATED_APP,
    };
  }

  static completeRegistration(method: string): LogEventOptions {
    return {
      eventName: FacebookStandardEvents.COMPLETED_REGISTRATION,
      parameters: {
        fb_registration_method: method,
      },
    };
  }

  static viewContent(params: {
    valueToSum?: number;
    fb_content_type?: string;
    fb_content_id?: string;
    fb_content?: string;
    fb_currency?: string;
  }): LogEventOptions {
    const { valueToSum, ...parameters } = params;
    return {
      eventName: FacebookStandardEvents.VIEWED_CONTENT,
      valueToSum,
      parameters,
    };
  }

  static addToCart(params: {
    valueToSum: number;
    fb_content_type?: string;
    fb_content_id?: string;
    fb_content?: string;
    fb_currency?: string;
  }): LogEventOptions {
    const { valueToSum, ...parameters } = params;
    return {
      eventName: FacebookStandardEvents.ADDED_TO_CART,
      valueToSum,
      parameters,
    };
  }

  static rate(params: {
    valueToSum: number;
    fb_content_type?: string;
    fb_content_id?: string;
    fb_content?: string;
    fb_max_rating_value?: string;
  }): LogEventOptions {
    const { valueToSum, ...parameters } = params;
    return {
      eventName: FacebookStandardEvents.RATED,
      valueToSum,
      parameters,
    };
  }

  static initiateCheckout(params: {
    valueToSum: number;
    fb_currency?: string;
    fb_num_items?: number;
    fb_content_type?: string;
    fb_content_id?: string;
    fb_content?: string;
    fb_payment_info_available?: '1' | '0';
  }): LogEventOptions {
    const { valueToSum, ...parameters } = params;
    return {
      eventName: FacebookStandardEvents.INITIATED_CHECKOUT,
      valueToSum,
      parameters,
    };
  }

  static purchase(params: {
    valueToSum: number;
    fb_currency?: string;
    fb_num_items?: number;
    fb_content_type?: string;
    fb_content_id?: string;
    fb_content?: string;
  }): LogEventOptions {
    const { valueToSum, ...parameters } = params;
    return {
      eventName: FacebookStandardEvents.PURCHASED,
      valueToSum,
      parameters,
    };
  }

  static search(params: {
    fb_search_string: string;
    fb_content_type?: string;
    fb_success?: '1' | '0';
  }): LogEventOptions {
    return {
      eventName: FacebookStandardEvents.SEARCHED,
      parameters: params,
    };
  }

  static subscribe(params: { valueToSum: number; fb_order_id: string; fb_currency?: string }): LogEventOptions {
    const { valueToSum, ...parameters } = params;
    return {
      eventName: FacebookStandardEvents.SUBSCRIBE,
      valueToSum,
      parameters,
    };
  }

  static startTrial(params: { valueToSum: number; fb_order_id: string; fb_currency?: string }): LogEventOptions {
    const { valueToSum, ...parameters } = params;
    return {
      eventName: FacebookStandardEvents.START_TRIAL,
      valueToSum,
      parameters,
    };
  }

  static unlockAchievement(description: string): LogEventOptions {
    return {
      eventName: FacebookStandardEvents.UNLOCKED_ACHIEVEMENT,
      parameters: {
        fb_description: description,
      },
    };
  }

  static achieveLevel(level: string): LogEventOptions {
    return {
      eventName: FacebookStandardEvents.ACHIEVED_LEVEL,
      parameters: {
        fb_level: level,
      },
    };
  }

  static adImpression(params?: { valueToSum?: number; ad_type?: string }): LogEventOptions {
    const { valueToSum, ...parameters } = params || {};
    return {
      eventName: FacebookStandardEvents.AD_IMPRESSION,
      valueToSum,
      parameters,
    };
  }

  static contact(): LogEventOptions {
    return {
      eventName: FacebookStandardEvents.CONTACT,
    };
  }

  static custom(
    name: string,
    options?: {
      valueToSum?: number;
      parameters?: Record<string, any>;
    },
  ): LogEventOptions {
    return {
      eventName: name,
      valueToSum: options?.valueToSum,
      parameters: options?.parameters,
    };
  }
}
