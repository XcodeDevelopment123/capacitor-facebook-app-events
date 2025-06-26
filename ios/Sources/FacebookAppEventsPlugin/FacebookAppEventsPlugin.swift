import Foundation
import Capacitor
import FBSDKCoreKit
import AppTrackingTransparency
import AdSupport

@objc(FacebookAppEventsPlugin)
public class FacebookAppEventsPlugin: CAPPlugin , CAPBridgedPlugin {
    public let identifier = "FacebookAppEventsPlugin"
    public let jsName = "FacebookAppEvents"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isInitialized", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "logEvent", returnType: CAPPluginReturnPromise)

    ]

    private var initialized = false

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        print("iOS Echo:", value)
        call.resolve(["value": value])
    }

  @objc func initialize(_ call: CAPPluginCall) {
        guard let appId = call.getString("appId"),
              let clientToken = call.getString("clientToken") else {
            call.reject("Missing appId or clientToken")
            return
        }
    
    if #available(iOS 14, *) {
        ATTrackingManager.requestTrackingAuthorization { status in
            switch status {
            case .authorized:
                let idfa = ASIdentifierManager.shared().advertisingIdentifier
                print("IDFA: \(idfa)")
            case .denied, .restricted, .notDetermined:
                break
            @unknown default:
                break
            }
        }
    }

        Settings.shared.appID = appId
        Settings.shared.clientToken = clientToken
        Settings.shared.isAutoLogAppEventsEnabled = true

        ApplicationDelegate.shared.initializeSDK()

        initialized = true
        call.resolve()
    }

  @objc func isInitialized(_ call: CAPPluginCall) {
    call.resolve(["initialized": initialized])
  }
  
  @objc func logEvent(_ call: CAPPluginCall) {

     if #available(iOS 14, *) {
        let status = ATTrackingManager.trackingAuthorizationStatus
        if status != .authorized {
            call.reject("Tracking not authorized, logEvent skipped.")
            return
        }
    }
    
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
          AppEvents.shared.logPurchase(amount:Double(amount),currency: currencyCode,parameters: fbParams)
        } else {
            if let v = value {
              AppEvents.shared.logEvent(AppEvents.Name(eventName), valueToSum: v, parameters: fbParams)
            } else {
              AppEvents.shared.logEvent(AppEvents.Name(eventName), parameters: fbParams)
            }
        }

      AppEvents.shared.flush()
        call.resolve()
    }
}
