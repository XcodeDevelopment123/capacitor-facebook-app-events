import Foundation
import Capacitor
import FBSDKCoreKit

@objc(FacebookAppEventsPlugin)
public class FacebookAppEventsPlugin: CAPPlugin {
    private var initialized = false

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        print("iOS Echo:", value)
        call.resolve(["value": value])
    }

    @objc func init(_ call: CAPPluginCall) {
        guard let appId = call.getString("appId"),
              let clientToken = call.getString("clientToken") else {
            call.reject("Missing appId or clientToken")
            return
        }

        Settings.shared.appID = appId
        Settings.shared.clientToken = clientToken
        Settings.shared.isAdvertiserTrackingEnabled = true
        Settings.shared.isAutoLogAppEventsEnabled = true

        ApplicationDelegate.shared.initializeSDK()

        initialized = true
        call.resolve()
    }

    @objc func isInitialized(_ call: CAPPluginCall) {
        call.resolve(["initialized": initialized])
    }

    @objc func logEvent(_ call: CAPPluginCall) {
        guard initialized else {
            call.reject("Facebook SDK not initialized")
            return
        }

        guard let eventName = call.getString("eventName") else {
            call.reject("Missing 'eventName'")
            return
        }

        let value = call.getDouble("value")
        let parameters = call.getObject("parameters") ?? [:]
        var fbParams: [AppEvents.ParameterName: Any] = [:]

        for (key, val) in parameters {
            if let str = val as? String {
                fbParams[AppEvents.ParameterName(rawValue: key)] = str
            } else if let num = val as? NSNumber {
                fbParams[AppEvents.ParameterName(rawValue: key)] = num
            } else {
                fbParams[AppEvents.ParameterName(rawValue: key)] = "\(val)"
            }
        }

        if eventName == "Purchase" {
            guard let currencyCode = parameters["currency"] as? String else {
                call.reject("'currency' is required for 'Purchase' event.")
                return
            }

            let amount = NSDecimalNumber(value: value ?? 0.0)
            AppEvents.logPurchase(amount, currency: currencyCode, parameters: fbParams)
        } else {
            if let v = value {
                AppEvents.logEvent(AppEvents.Name(eventName), valueToSum: v, parameters: fbParams)
            } else {
                AppEvents.logEvent(AppEvents.Name(eventName), parameters: fbParams)
            }
        }

        AppEvents.flush()
        call.resolve()
    }
}
