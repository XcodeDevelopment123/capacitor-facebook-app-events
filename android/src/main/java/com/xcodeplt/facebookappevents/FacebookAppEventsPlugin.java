package com.xcodeplt.facebookappevents;

import com.android.installreferrer.BuildConfig;
import com.facebook.FacebookSdk;
import com.facebook.LoggingBehavior;
import com.facebook.appevents.AppEventsConstants;
import com.facebook.appevents.AppEventsLogger;

import android.app.Application;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.Iterator;
import java.math.BigDecimal;
import java.util.Currency;

@CapacitorPlugin(name = "FacebookAppEvents")
public class FacebookAppEventsPlugin extends Plugin {
    private static final String TAG = "FacebookAppEvents";
    private AppEventsLogger logger;
    private boolean initialized = false;

    @PluginMethod
    public void initialize(PluginCall call) {
        String facebookAppId = call.getString("appId");
        String facebookClientToken = call.getString("clientToken");

        if (facebookAppId == null || facebookAppId.isEmpty()) {
            call.reject("Missing or empty appId");
            return;
        }

        if (facebookClientToken == null || facebookClientToken.isEmpty()) {
            call.reject("Missing or empty clientToken");
            return;
        }

        try {
            Context appContext = getContext().getApplicationContext();

            // Configure Facebook SDK
            FacebookSdk.setApplicationId(facebookAppId);
            FacebookSdk.setClientToken(facebookClientToken);
            FacebookSdk.setAutoInitEnabled(true);

            // Enable debug logging in debug builds
            if (BuildConfig.DEBUG) {
                FacebookSdk.setIsDebugEnabled(true);
                FacebookSdk.addLoggingBehavior(LoggingBehavior.APP_EVENTS);
            }

            // Initialize SDK
            FacebookSdk.sdkInitialize(appContext);
            // Create logger and activate app
            logger = AppEventsLogger.newLogger(appContext);
            AppEventsLogger.activateApp((Application) appContext);

            initialized = true;
            Log.i(TAG, "Facebook SDK initialized successfully");
            call.resolve();
        } catch (Exception e) {
            Log.e(TAG, "Failed to initialize Facebook SDK", e);
            call.reject("Failed to initialize Facebook SDK: " + e.getMessage());
        }
    }

    @PluginMethod
    public void isInitialized(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("initialized", initialized && FacebookSdk.isInitialized());
        call.resolve(ret);
    }

    @PluginMethod
    public void logEvent(PluginCall call) {
        if (!initialized) {
            call.reject("Facebook SDK not initialized. Call initialize() first.");
            return;
        }

        if (!ensureLoggerExists()) {
            call.reject("Logger not available");
            return;
        }

        String eventName = call.getString("eventName");
        Double valueToSum = call.getDouble("valueToSum");
        JSObject parameters = call.getObject("parameters");

        if (eventName == null || eventName.isEmpty()) {
            call.reject("Missing or empty 'eventName'");
            return;
        }

        try {
            Bundle bundle = createBundleFromParameters(parameters);

            // Handle standard Facebook events with special processing
            if (isPurchaseEvent(eventName)) {
                logPurchaseEvent(eventName, valueToSum, bundle, call);
            } else {
                logStandardEvent(eventName, valueToSum, bundle);
                call.resolve();
            }
        } catch (Exception e) {
            Log.e(TAG, "Error logging event: " + eventName, e);
            call.reject("Failed to log event: " + e.getMessage());
        }
    }

    private Bundle createBundleFromParameters(JSObject parameters) {
        Bundle bundle = new Bundle();

        if (parameters != null) {
            Iterator<String> keys = parameters.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                Object value = parameters.opt(key);

                if (value instanceof String) {
                    bundle.putString(key, (String) value);
                } else if (value instanceof Integer) {
                    bundle.putInt(key, (Integer) value);
                } else if (value instanceof Double) {
                    bundle.putDouble(key, (Double) value);
                } else if (value instanceof Boolean) {
                    bundle.putBoolean(key, (Boolean) value);
                } else if (value instanceof Float) {
                    bundle.putFloat(key, (Float) value);
                } else if (value instanceof Long) {
                    bundle.putLong(key, (Long) value);
                } else if (value != null) {
                    // Convert other types to string as fallback
                    bundle.putString(key, value.toString());
                }
            }
        }

        return bundle;
    }

    private boolean isPurchaseEvent(String eventName) {
        return "fb_mobile_purchase".equals(eventName) || "Purchase".equals(eventName);
    }

    private void logPurchaseEvent(String eventName, Double valueToSum, Bundle bundle, PluginCall call) {
        // For purchase events, we need currency information
        String currencyCode = bundle.getString("fb_currency");
        if (currencyCode == null) {
            currencyCode = bundle.getString("currency"); // fallback
        }

        if (currencyCode == null || currencyCode.isEmpty()) {
            call.reject("'fb_currency' or 'currency' is required for purchase events");
            return;
        }

        try {
            BigDecimal amount = valueToSum != null ? BigDecimal.valueOf(valueToSum) : BigDecimal.ZERO;
            Currency currency = Currency.getInstance(currencyCode.toUpperCase());

            logger.logPurchase(amount, currency, bundle);
            logger.flush();

            Log.i(TAG, "Purchase event logged: " + eventName + ", amount: " + amount + ", currency: " + currencyCode);
            call.resolve();
        } catch (IllegalArgumentException e) {
            Log.e(TAG, "Invalid currency code: " + currencyCode, e);
            call.reject("Invalid currency code: " + currencyCode);
        }
    }

    private void logStandardEvent(String eventName, Double valueToSum, Bundle bundle) {
        if (valueToSum != null) {
            logger.logEvent(eventName, valueToSum, bundle);
        } else {
            logger.logEvent(eventName, bundle);
        }

        logger.flush();
        Log.i(TAG, "Event logged: " + eventName + (valueToSum != null ? ", value: " + valueToSum : ""));
    }

    private boolean ensureLoggerExists() {
        if (!FacebookSdk.isInitialized()) {
            Log.w(TAG, "Facebook SDK is not initialized");
            return false;
        }

        if (logger == null) {
            try {
                logger = AppEventsLogger.newLogger(getContext());
                Log.i(TAG, "AppEventsLogger instance created");
            } catch (Exception e) {
                Log.e(TAG, "Failed to create AppEventsLogger", e);
                return false;
            }
        }

        return true;
    }
}
