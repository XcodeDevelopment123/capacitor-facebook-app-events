var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// ========================================
// Facebook标准事件定义
// ========================================
export var FacebookStandardEvents;
(function (FacebookStandardEvents) {
    FacebookStandardEvents["ACTIVATED_APP"] = "fb_mobile_activate_app";
    FacebookStandardEvents["DEACTIVATED_APP"] = "fb_mobile_deactivate_app";
    FacebookStandardEvents["SESSION_INTERRUPTIONS"] = "fb_mobile_app_interruptions";
    FacebookStandardEvents["TIME_BETWEEN_SESSIONS"] = "fb_mobile_time_between_sessions";
    FacebookStandardEvents["COMPLETED_REGISTRATION"] = "fb_mobile_complete_registration";
    FacebookStandardEvents["VIEWED_CONTENT"] = "fb_mobile_content_view";
    FacebookStandardEvents["SEARCHED"] = "fb_mobile_search";
    FacebookStandardEvents["RATED"] = "fb_mobile_rate";
    FacebookStandardEvents["COMPLETED_TUTORIAL"] = "fb_mobile_tutorial_completion";
    FacebookStandardEvents["PUSH_TOKEN_OBTAINED"] = "fb_mobile_obtain_push_token";
    // Ecommerce
    FacebookStandardEvents["ADDED_TO_CART"] = "fb_mobile_add_to_cart";
    FacebookStandardEvents["ADDED_TO_WISHLIST"] = "fb_mobile_add_to_wishlist";
    FacebookStandardEvents["INITIATED_CHECKOUT"] = "fb_mobile_initiated_checkout";
    FacebookStandardEvents["ADDED_PAYMENT_INFO"] = "fb_mobile_add_payment_info";
    FacebookStandardEvents["PURCHASED"] = "fb_mobile_purchase";
    // Gaming
    FacebookStandardEvents["ACHIEVED_LEVEL"] = "fb_mobile_level_achieved";
    FacebookStandardEvents["UNLOCKED_ACHIEVEMENT"] = "fb_mobile_achievement_unlocked";
    FacebookStandardEvents["SPENT_CREDITS"] = "fb_mobile_spent_credits";
    // Business
    FacebookStandardEvents["CONTACT"] = "Contact";
    FacebookStandardEvents["CUSTOMIZE_PRODUCT"] = "CustomizeProduct";
    FacebookStandardEvents["DONATE"] = "Donate";
    FacebookStandardEvents["FIND_LOCATION"] = "FindLocation";
    FacebookStandardEvents["SCHEDULE"] = "Schedule";
    FacebookStandardEvents["START_TRIAL"] = "StartTrial";
    FacebookStandardEvents["SUBMIT_APPLICATION"] = "SubmitApplication";
    FacebookStandardEvents["SUBSCRIBE"] = "Subscribe";
    // Ads
    FacebookStandardEvents["AD_IMPRESSION"] = "AdImpression";
    FacebookStandardEvents["AD_CLICK"] = "AdClick";
    // Live streaming
    FacebookStandardEvents["LIVE_STREAMING_START"] = "fb_sdk_live_streaming_start";
    FacebookStandardEvents["LIVE_STREAMING_STOP"] = "fb_sdk_live_streaming_stop";
    FacebookStandardEvents["LIVE_STREAMING_PAUSE"] = "fb_sdk_live_streaming_pause";
    FacebookStandardEvents["LIVE_STREAMING_RESUME"] = "fb_sdk_live_streaming_resume";
    FacebookStandardEvents["LIVE_STREAMING_ERROR"] = "fb_sdk_live_streaming_error";
    FacebookStandardEvents["LIVE_STREAMING_UPDATE_STATUS"] = "fb_sdk_live_streaming_update_status";
    // Product Catalog
    FacebookStandardEvents["PRODUCT_CATALOG_UPDATE"] = "fb_mobile_catalog_update";
})(FacebookStandardEvents || (FacebookStandardEvents = {}));
export class FacebookEventBuilder {
    static activateApp() {
        return {
            eventName: FacebookStandardEvents.ACTIVATED_APP,
        };
    }
    static completeRegistration(method) {
        return {
            eventName: FacebookStandardEvents.COMPLETED_REGISTRATION,
            parameters: {
                fb_registration_method: method,
            },
        };
    }
    static viewContent(params) {
        const { valueToSum } = params, parameters = __rest(params, ["valueToSum"]);
        return {
            eventName: FacebookStandardEvents.VIEWED_CONTENT,
            valueToSum,
            parameters,
        };
    }
    static addToCart(params) {
        const { valueToSum } = params, parameters = __rest(params, ["valueToSum"]);
        return {
            eventName: FacebookStandardEvents.ADDED_TO_CART,
            valueToSum,
            parameters,
        };
    }
    static rate(params) {
        const { valueToSum } = params, parameters = __rest(params, ["valueToSum"]);
        return {
            eventName: FacebookStandardEvents.RATED,
            valueToSum,
            parameters,
        };
    }
    static initiateCheckout(params) {
        const { valueToSum } = params, parameters = __rest(params, ["valueToSum"]);
        return {
            eventName: FacebookStandardEvents.INITIATED_CHECKOUT,
            valueToSum,
            parameters,
        };
    }
    static purchase(params) {
        const { valueToSum } = params, parameters = __rest(params, ["valueToSum"]);
        return {
            eventName: FacebookStandardEvents.PURCHASED,
            valueToSum,
            parameters,
        };
    }
    static search(params) {
        return {
            eventName: FacebookStandardEvents.SEARCHED,
            parameters: params,
        };
    }
    static subscribe(params) {
        const { valueToSum } = params, parameters = __rest(params, ["valueToSum"]);
        return {
            eventName: FacebookStandardEvents.SUBSCRIBE,
            valueToSum,
            parameters,
        };
    }
    static startTrial(params) {
        const { valueToSum } = params, parameters = __rest(params, ["valueToSum"]);
        return {
            eventName: FacebookStandardEvents.START_TRIAL,
            valueToSum,
            parameters,
        };
    }
    static unlockAchievement(description) {
        return {
            eventName: FacebookStandardEvents.UNLOCKED_ACHIEVEMENT,
            parameters: {
                fb_description: description,
            },
        };
    }
    static achieveLevel(level) {
        return {
            eventName: FacebookStandardEvents.ACHIEVED_LEVEL,
            parameters: {
                fb_level: level,
            },
        };
    }
    static adImpression(params) {
        const _a = params || {}, { valueToSum } = _a, parameters = __rest(_a, ["valueToSum"]);
        return {
            eventName: FacebookStandardEvents.AD_IMPRESSION,
            valueToSum,
            parameters,
        };
    }
    static contact() {
        return {
            eventName: FacebookStandardEvents.CONTACT,
        };
    }
    static custom(name, options) {
        return {
            eventName: name,
            valueToSum: options === null || options === void 0 ? void 0 : options.valueToSum,
            parameters: options === null || options === void 0 ? void 0 : options.parameters,
        };
    }
}
//# sourceMappingURL=definitions.js.map