package com.xcodeplt.facebookappevents;

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
    private AppEventsLogger logger;
    private boolean initialized = false;

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        Log.i("My Android Echo", value);
        call.resolve();
    }


    @PluginMethod
    public void initialize(PluginCall call) {
        String facebookAppId = call.getString("appId");
        String facebookClientToken = call.getString("clientToken");

        if (facebookAppId == null || facebookClientToken == null) {
            call.reject("Missing appId or clientToken");
            return;
        }

      Context appContext = getContext().getApplicationContext();

      FacebookSdk.setApplicationId(facebookAppId);
      FacebookSdk.setClientToken(facebookClientToken);
      FacebookSdk.setAutoInitEnabled(true);
      FacebookSdk.setIsDebugEnabled(true);
      FacebookSdk.addLoggingBehavior(LoggingBehavior.APP_EVENTS);

      FacebookSdk.sdkInitialize(appContext);

      logger = AppEventsLogger.newLogger(appContext);
      AppEventsLogger.activateApp((Application) appContext);


      initialized = true;
        call.resolve();
    }

    @PluginMethod
    public void isInitialized(PluginCall call) {
        JSObject ret = new JSObject();

        ret.put("initialized", FacebookSdk.isInitialized());
        call.resolve(ret);
    }

@PluginMethod
public void logEvent(PluginCall call) {
    if (!initialized) {
        call.reject("Facebook SDK not initialized");
        return;
    }

    if (!ensureLoggerExist()) {
        call.reject("Logger not available");
        return;
    }

    String eventName = call.getString("eventName");
    Double value = call.getDouble("value");
    JSObject parameters = call.getObject("parameters");

    if (eventName == null) {
        call.reject("Missing 'eventName'");
        return;
    }

    Bundle bundle = new Bundle();

    // 把 parameters 中的所有 key:value 填入 bundle
    if (parameters != null) {
        Iterator<String> keys = parameters.keys();
        while (keys.hasNext()) {
            String key = keys.next();
            Object val = parameters.opt(key);

            if (val instanceof String) {
                bundle.putString(key, (String) val);
            } else if (val instanceof Integer) {
                bundle.putInt(key, (Integer) val);
            } else if (val instanceof Double) {
                bundle.putDouble(key, (Double) val);
            } else if (val instanceof Boolean) {
                bundle.putBoolean(key, (Boolean) val);
            } else if (val != null) {
                bundle.putString(key, val.toString());
            }
        }
    }

    // 特别处理 'Purchase' 使用 logPurchase
    if ("Purchase".equals(eventName)) {
        String currencyCode = bundle.getString("currency");
        if (currencyCode == null) {
            call.reject("'currency' is required for 'Purchase' event.");
            return;
        }

        BigDecimal amount = value != null ? BigDecimal.valueOf(value) : BigDecimal.ZERO;
        Currency currency = Currency.getInstance(currencyCode);
        logger.logPurchase(amount, currency, bundle);
    } else {
        // 其它事件统一处理
        if (value != null) {
            logger.logEvent(eventName, value, bundle); // valueToSum
        } else {
            logger.logEvent(eventName, bundle);
        }
    }

    logger.flush();
    call.resolve();
}


  private boolean ensureLoggerExist() {
    boolean sdkReady = FacebookSdk.isInitialized();

    if (!sdkReady) {
      Log.w("FacebookAppEvents", "Facebook SDK is not initialized.");
      return false;
    }

    if (logger == null) {
      logger = AppEventsLogger.newLogger(getContext());
      Log.i("FacebookAppEvents", "AppEventsLogger instance created.");
    }

    return true;
  }

}
